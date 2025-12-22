/* =========================
   SMOOTH CURSOR (LERP)
========================= */
const glow = document.getElementById("cursor-glow");
let mouseX = 0, mouseY = 0;
let ballX = 0, ballY = 0;
const speed = 0.08; // Adjust for "weight"

document.addEventListener("mousemove", e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  let distX = mouseX - ballX;
  let distY = mouseY - ballY;
  
  ballX += distX * speed;
  ballY += distY * speed;
  
  glow.style.left = ballX + "px";
  glow.style.top = ballY + "px";
  
  requestAnimationFrame(animateCursor);
}
animateCursor();

/* =========================
   SCROLL PSYCHOLOGY + PROGRESS
========================= */
let lastScroll = window.scrollY;
let slowMoments = 0;
let fastMoments = 0;
const progressBar = document.getElementById("scroll-progress");

window.addEventListener("scroll", () => {
  // Update Progress Bar
  const h = document.documentElement;
  const st = h.scrollTop || document.body.scrollTop;
  const sh = h.scrollHeight || document.body.scrollHeight;
  const percent = (st / (sh - h.clientHeight)) * 100;
  progressBar.style.width = percent + "%";

  // Behavior Logic
  const now = window.scrollY;
  const delta = Math.abs(now - lastScroll);
  if (delta > 0 && delta < 5) slowMoments++;
  if (delta > 40) fastMoments++;
  lastScroll = now;
});

/* =========================
   REVEAL ON SCROLL
========================= */
const observerOptions = { threshold: 0.3 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* =========================
   BEHAVIOR ANALYSIS
========================= */
const behaviorText = document.getElementById("behaviorText");
const guideText = document.getElementById("guideText");
const hiddenSection = document.getElementById("hidden");

setTimeout(() => {
  if (slowMoments > fastMoments) {
    behaviorText.textContent = "You move with intention.";
    guideText.textContent = "Your patience unlocked a hidden layer below.";
    hiddenSection.classList.add("show");
  } else {
    behaviorText.textContent = "You move with urgency.";
    guideText.textContent = "The deepest secrets are only visible to those who linger.";
  }
}, 5000);

/* =========================
   MEMORY
========================= */
const visits = Number(localStorage.getItem("visits") || 0) + 1;
localStorage.setItem("visits", visits);

const memoryText = document.getElementById("memoryText");
memoryText.textContent = visits > 1 
  ? `Welcome back. You've been here ${visits} times. The energy remains.`
  : "This is your first encounter. Tread lightly.";