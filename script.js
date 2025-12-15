/* =========================
   CURSOR ENERGY FIELD
========================= */
document.addEventListener("mousemove", e => {
  const glow = document.getElementById("cursor-glow");
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

/* =========================
   SCROLL PSYCHOLOGY
========================= */
let lastScroll = window.scrollY;
let slowMoments = 0;
let fastMoments = 0;

window.addEventListener("scroll", () => {
  const now = window.scrollY;
  const delta = Math.abs(now - lastScroll);

  if (delta < 6) slowMoments++;
  if (delta > 35) fastMoments++;

  lastScroll = now;
});

/* =========================
   BEHAVIOR ANALYSIS
========================= */
const behaviorText = document.getElementById("behaviorText");
const guideText = document.getElementById("guideText");
const hidden = document.getElementById("hidden");

setTimeout(() => {
  if (slowMoments > fastMoments) {
    behaviorText.textContent = "You move with intention.";
    guideText.textContent = "Take your time. You see more this way.";
    setTimeout(() => hidden.classList.add("show"), 9000);
  } else {
    behaviorText.textContent = "You move quickly through moments.";
    guideText.textContent = "Slow down. Control reveals depth.";
  }
}, 4000);

/* =========================
   MEMORY (RETURN VISITORS)
========================= */
const visits = Number(localStorage.getItem("visits") || 0) + 1;
localStorage.setItem("visits", visits);

const memoryText = document.getElementById("memoryText");
memoryText.textContent =
  visits > 1
    ? "You returned. That matters."
    : "This is your first encounter.";
