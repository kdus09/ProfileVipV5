# 💬 ProfileVipV5

**ProfileVipV5** là một dự án web portfolio tích hợp **hệ thống chat realtime 2 chiều với Telegram** — giúp bạn vừa giới thiệu bản thân, vừa nhận tin nhắn từ khách truy cập trực tiếp qua Telegram, và phản hồi ngay trong app Telegram.

> 🌐 Web được deploy frontend trên **Vercel**, backend trên **Render** (hoàn toàn miễn phí và 24/7).

---

## 🚀 Tính năng chính

- ⚡ **Hiệu ứng profile hiện đại**: glitch sáng, nền particle, text typing animation.  
- 💻 **Chat 2 chiều realtime** giữa Website ↔ Telegram ↔ Web.  
- 💬 **Gửi và nhận tin nhắn trực tiếp** không cần refresh.  
- 💾 **Lưu bình luận cục bộ** bằng LocalStorage.  
- 🎨 **Tùy biến dễ dàng** (avatar, màu, icon kỹ năng, hiệu ứng nền).  

---


## ⚙️ Cài đặt & chạy thử (local)

1. Cài Node.js nếu chưa có.  
2. Mở terminal trong thư mục dự án và chạy:
   ```bash
   npm install
   node server.js


Mở index.html bằng trình duyệt (hoặc dùng Live Server trong VSCode).

☁️ Deploy hướng dẫn
🔹 Backend (Render)

Đăng nhập Render.com

Tạo New Web Service → chọn repo hoặc upload toàn bộ thư mục.

Cấu hình:

Build command: npm install

Start command: npm start

Port: process.env.PORT

Sau khi deploy xong, Render cấp domain, ví dụ:

https://profilevipv5.onrender.com

🔹 Thiết lập Webhook Telegram

Truy cập trình duyệt với đường dẫn:

https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook?url=https://profilevipv5.onrender.com/webhook/<YOUR_BOT_TOKEN>


Nếu thấy phản hồi "Webhook was set" → thành công ✅

🔹 Frontend (Vercel)

Đăng nhập Vercel

Chọn New Project → Import repo ProfileVipV5

Vercel tự nhận index.html làm entry point

Sau deploy, bạn sẽ có domain ví dụ:

https://profilevipv5.vercel.app

🔗 Cập nhật domain backend trong script.js

Tìm và thay các dòng sau bằng domain Render thật của bạn:
```
await fetch("https://profilevipv5.onrender.com/send", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ msg })
});

const socket = new WebSocket("wss://profilevipv5.onrender.com/ws");
```
🧠 Ghi chú & tuỳ chỉnh nhanh

Ảnh đại diện: assets/avatar.png

Hiệu ứng typing text: chỉnh ở đầu file script.js

Icon kỹ năng: chỉnh trong phần <div class="skills">...</div> của index.html

Bình luận lưu cục bộ bằng LocalStorage (không gửi ra server)

Khi bạn nhắn từ Telegram → web sẽ nhận realtime qua WebSocket

⚙️ Thông tin cấu hình trong server.js
const TELEGRAM_TOKEN = "YOUR_BOT_TOKEN";  // Token từ BotFather
const ADMIN_CHAT_ID = "YOUR_CHAT_ID";     // Chat ID Telegram của bạn


Thay hai giá trị này bằng token & chat_id của bạn (có thể lấy qua @userinfobot trên Telegram).

👨‍💻 Tác giả

Le The Khoi
📧 lethekhoi209@hotmail.com

🌐 khoidev.io.vn

💬 Telegram Bot: @KhoiDevBot

⚡ ProfileVipV5 — Modern portfolio with realtime Telegram chat.

© 2025 Le The Khoi. All rights reserved.
