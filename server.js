import express from "express";
import fetch from "node-fetch";
import { WebSocketServer } from "ws";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const TELEGRAM_TOKEN = "8452171160:AAFfpHegP_hOgNfTpEtx28rMCneg30WoIhY"; // 🔹 Token từ BotFather
const ADMIN_CHAT_ID = "6216535779"; // 🔹 Chat ID của bạn

// ✅ Health check
app.get("/", (req, res) => {
  res.send("✅ KhoiDev LiveSupport backend is running.");
});

// ✅ Route: nhận tin nhắn từ web -> gửi đến Telegram
app.post("/send", async (req, res) => {
  try {
    const { msg } = req.body;
    if (!msg) return res.status(400).send("Missing message");

    const text = `💬 Web: ${msg}`;
    const apiUrl = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?chat_id=${ADMIN_CHAT_ID}&text=${encodeURIComponent(text)}`;

    await fetch(apiUrl);
    console.log("✅ Message sent to Telegram:", msg);

    res.status(200).send("Message sent");
  } catch (err) {
    console.error("❌ Error sending message:", err);
    res.status(500).send("Failed to send");
  }
});

// ✅ WebSocket: gửi tin nhắn từ Telegram ngược lại web
const server = app.listen(process.env.PORT || 10000, () =>
  console.log(`🚀 Server running on port ${process.env.PORT || 10000}`)
);

const wss = new WebSocketServer({ server });
let clients = [];

wss.on("connection", (ws) => {
  clients.push(ws);
  ws.on("close", () => {
    clients = clients.filter((c) => c !== ws);
  });
});

// ✅ Route: nhận tin từ Telegram -> đẩy về web
app.post(`/webhook/${TELEGRAM_TOKEN}`, async (req, res) => {
  try {
    const data = req.body;
    console.log("📩 Incoming Telegram message:", data);

    if (data.message && data.message.chat.id == ADMIN_CHAT_ID) {
      const text = data.message.text;
      clients.forEach((ws) =>
        ws.send(JSON.stringify({ from: "admin", text }))
      );
    }

    res.sendStatus(200);
  } catch (err) {
    console.error("❌ Webhook error:", err);
    res.sendStatus(500);
  }
});
