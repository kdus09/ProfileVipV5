const textEl = document.getElementById('typing-text');
const texts = [
  "💻 Full-Stack Developer",
  "🧠 Cyber Security Enthusiast",
  "🎨 UI/UX Designer",
  "☁️ Cloud Learner",
  "🌍 Based in Vietnam"
];
let i = 0, j = 0, deleting = false;
function typing() {
  const cur = texts[i];
  textEl.textContent = deleting ? cur.slice(0, --j) : cur.slice(0, ++j);
  if (!deleting && j === cur.length) {
    deleting = true; setTimeout(typing, 1200);
    return;
  } else if (deleting && j === 0) {
    deleting = false; i = (i + 1) % texts.length;
  }
  setTimeout(typing, deleting ? 40 : 80);
}
typing();

// Particle background
const c = document.getElementById("bg");
const ctx = c.getContext("2d");
c.width = innerWidth; c.height = innerHeight;
let particles = Array.from({ length: 90 }, () => ({
  x: Math.random() * c.width,
  y: Math.random() * c.height,
  r: Math.random() * 2 + 0.8,
  dx: (Math.random() - 0.5) * 0.6,
  dy: (Math.random() - 0.5) * 0.6,
  color: `hsl(${Math.random() * 360}, 100%, 60%)`
}));
function animate() {
  ctx.fillStyle = "rgba(255,255,255,0.15)";
  ctx.fillRect(0, 0, c.width, c.height);
  particles.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
    p.x += p.dx; p.y += p.dy;
    if (p.x < 0 || p.x > c.width) p.dx *= -1;
    if (p.y < 0 || p.y > c.height) p.dy *= -1;
  });
  requestAnimationFrame(animate);
}
animate();

// Comment box
const input = document.getElementById("commentInput");
const postBtn = document.getElementById("postComment");
const commentList = document.getElementById("commentList");

let comments = JSON.parse(localStorage.getItem("comments") || "[]");
function renderComments() {
  commentList.innerHTML = comments
    .map(c => `<div class="comment">${c}</div>`)
    .join("");
}
renderComments();

postBtn.onclick = () => {
  if (input.value.trim() !== "") {
    comments.push(input.value.trim());
    localStorage.setItem("comments", JSON.stringify(comments));
    input.value = "";
    renderComments();
  }
};

// Chat system
const chatToggle = document.getElementById('chatToggle');
const chatWidget = document.getElementById('chatWidget');
const sendMsgBtn = document.getElementById('sendMsg');
const chatBody = document.getElementById('chatBody');
const userMsgInput = document.getElementById('userMsg');

chatToggle.onclick = () => {
  chatWidget.style.display = chatWidget.style.display === 'flex' ? 'none' : 'flex';
};

// Gửi tin từ web → server Render → Telegram
sendMsgBtn.onclick = async () => {
  const msg = userMsgInput.value.trim();
  if (!msg) return;
  chatBody.innerHTML += `<div class="user-msg">${msg}</div>`;
  userMsgInput.value = '';
  chatBody.scrollTop = chatBody.scrollHeight;

  await fetch("https:////profilevipv5.onrender.com/send", { // domain Render
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ msg })
  });
};

// Nhận tin từ Telegram → WebSocket
const socket = new WebSocket("wss://profilevipv5.onrender.com/ws"); // domain Render
socket.onmessage = e => {
  const data = JSON.parse(e.data);
  if (data.from === "admin") {
    chatBody.innerHTML += `<div class="bot-msg">${data.text}</div>`;
    chatBody.scrollTop = chatBody.scrollHeight;
  }
};
