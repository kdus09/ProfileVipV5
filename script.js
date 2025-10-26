const textEl = document.getElementById('typing-text');
const texts = [
  "💻 Full-Stack Developer",
  "🧠 Cyber Security Enthusiast",
  "⚡ Creative Coder & UI Designer",
  "🌍 From Vietnam",
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
  setTimeout(typing, deleting ? 40 : 90);
}
typing();

// glowing particle background
const c = document.getElementById("bg");
const ctx = c.getContext("2d");
c.width = innerWidth; c.height = innerHeight;
let particles = Array.from({ length: 80 }, () => ({
  x: Math.random() * c.width,
  y: Math.random() * c.height,
  r: Math.random() * 2 + 0.5,
  dx: (Math.random() - 0.5) * 0.8,
  dy: (Math.random() - 0.5) * 0.8,
  color: `hsl(${Math.random() * 360}, 100%, 70%)`
}));
function animate() {
  ctx.fillStyle = "rgba(0,0,0,0.15)";
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