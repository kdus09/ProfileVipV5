import express from "express";
import fetch from "node-fetch";
import { WebSocketServer } from "ws";

const TELEGRAM_TOKEN = "8452171160:AAFfpHegP_hOgNfTpEtx28rMCneg30WoIhY";   // 🔹 Token từ BotFather
const ADMIN_CHAT_ID = "6216535779";      // 🔹 Chat ID Telegram của bạn

const app = express();
app.use(express.json());
app.get("/", (_, res) => res.send("✅ KhoiDev LiveSupport backend is running."));

let clients = [];

// ===== WebSocket (web <-> server realtime) =====
const wss = new WebSocketServer({ noServer: true });
wss.on("connection", (ws) => {
  clients.push(ws);
  ws.on("close", () => (clients = clients.filter(c => c !== ws)));
  ws.send(JSON.stringify({ from: "system", text: "🟢 Connected to KhoiDev Support" }));
});

// ===== Khi người dùng web gửi tin → Telegram =====
app.post("/send", async (req, res) => {
  const { msg } = req.body;
  if (!msg) return res.sendStatus(400);
  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?chat_id=${ADMIN_CHAT_ID}&text=${encodeURIComponent("💬 Web: " + msg)}`);
    res.sendStatus(200);
  } catch (err) {
    console.error("❌ Error sending to Telegram:", err);
    res.sendStatus(500);
  }
});

// ===== Khi bạn trả lời trên Telegram → gửi lại web =====
app.post(`/webhook/${TELEGRAM_TOKEN}`, (req, res) => {
  const msg = req.body?.message;
  if (msg && msg.chat?.id == ADMIN_CHAT_ID && msg.text) {
    const data = { from: "admin", text: msg.text };
    clients.forEach(ws => ws.send(JSON.stringify(data)));
  }
  res.sendStatus(200);
});

// ===== Server setup =====
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// Kích hoạt WebSocket upgrade
server.on("upgrade", (req, socket, head) => {
  if (req.url === "/ws") {
    wss.handleUpgrade(req, socket, head, (ws) => wss.emit("connection", ws, req));
  } else {
    socket.destroy();
  }
});