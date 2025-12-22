/* =========================
   CINEMATIC ENTRANCE
========================= */
const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

tl.to(".kinetic-text", {
  y: 0,
  duration: 1.8,
  stagger: 0.1,
  delay: 0.5
})
.from(".fade-up", {
  opacity: 0,
  y: 20,
  duration: 1
}, "-=1");

/* =========================
   MAGNETIC INTERACTION
========================= */
const magneticEls = document.querySelectorAll('.magnetic');

magneticEls.forEach(el => {
  el.addEventListener('mousemove', (e) => {
    const { clientX: x, clientY: y } = e;
    const { left, top, width, height } = el.getBoundingClientRect();
    const strength = el.dataset.strength || 30;
    
    const xPos = (x - left - width / 2) / strength;
    const yPos = (y - top - height / 2) / strength;
    
    gsap.to(el, { x: xPos, y: yPos, duration: 0.6 });
  });
  
  el.addEventListener('mouseleave', () => {
    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
  });
});

/* =========================
   PRO COUNTER ENGINE
========================= */
function animateValue(id, start, end, duration) {
  const obj = { val: start };
  gsap.to(obj, {
    val: end,
    duration: duration,
    ease: "power3.inOut",
    onUpdate: () => {
      document.getElementById(id).textContent = Math.ceil(obj.val).toString().padStart(2, '0');
    }
  });
}

// Trigger count on scroll
ScrollTrigger.create({
  trigger: ".analytics",
  onEnter: () => {
    animateValue("live-pulse", 0, 88, 2); // Simulated pulse
    animateValue("live-visit", 0, localStorage.getItem("visits") || 1, 1.5); // From your original memory logic
  }
});

/* =========================
   AURA BREATHING
========================= */
gsap.to("#cursor-aura", {
  scale: 1.2,
  duration: 4,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut"
});