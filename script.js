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

const form = document.getElementById("pro-form");
const status = document.getElementById("form-status");
const submitBtn = document.getElementById("submit-btn");

form.onsubmit = async (e) => {
  e.preventDefault();
  
  // 1. Loading State
  submitBtn.textContent = "TRANSMITTING...";
  gsap.to(submitBtn, { scale: 0.9, opacity: 0.5, duration: 0.3 });

  const data = new FormData(form);
  
  // 2. Send to Formspree Database
  fetch(form.action, {
    method: form.method,
    body: data,
    headers: { 'Accept': 'application/json' }
  }).then(response => {
    if (response.ok) {
      // 3. Success Animation
      status.innerHTML = "TRANSMISSION SUCCESSFUL. FREQUENCY ESTABLISHED.";
      status.style.color = "var(--accent)";
      gsap.to(status, { opacity: 1, y: -10, duration: 0.5 });
      form.reset();
      submitBtn.textContent = "SENT";
      
      // Dramatic Aura Pulse on Success
      gsap.to("#cursor-aura", { scale: 4, opacity: 0.5, duration: 1, ease: "expo.out" });
    } else {
      status.innerHTML = "TRANSMISSION FAILED. CHECK CONNECTION.";
      status.style.color = "red";
      gsap.to(status, { opacity: 1, duration: 0.5 });
    }
  }).catch(error => {
    status.innerHTML = "SYSTEM ERROR. TRY AGAIN LATER.";
    gsap.to(status, { opacity: 1, duration: 0.5 });
  });
};
/* =========================
   GLOBAL SYSTEM ENGINE
========================= */
gsap.registerPlugin(ScrollTrigger);

window.addEventListener('DOMContentLoaded', () => {
    // 1. THEME INITIALIZATION
    const html = document.documentElement;
    const savedTheme = localStorage.getItem('sbu-theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);

    const themeToggle = document.getElementById('theme-toggle');
    if(themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = html.getAttribute('data-theme') === 'dark';
            const newTheme = isDark ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('sbu-theme', newTheme);
        });
    }

    // 2. MAGNETIC CURSOR AURA
    const aura = document.getElementById('cursor-aura');
    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX; mouseY = e.clientY;
    });
    gsap.ticker.add(() => {
        gsap.to(aura, { x: mouseX, y: mouseY, duration: 0.6 });
    });

    // 3. MAGNETIC ELEMENTS
    const magnets = document.querySelectorAll('.magnetic');
    magnets.forEach(m => {
        m.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = m.getBoundingClientRect();
            const strength = m.dataset.strength || 15;
            const x = (e.clientX - left - width / 2) / strength;
            const y = (e.clientY - top - height / 2) / strength;
            gsap.to(m, { x: x, y: y, duration: 0.3 });
        });
        m.addEventListener('mouseleave', () => {
            gsap.to(m, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
        });
    });

    // 4. NEWS24 PULSE ENGINE (For Insights Page)
    const newsBtn = document.getElementById('fetch-news-btn');
    const newsGrid = document.getElementById('news-grid');

    if(newsBtn && newsGrid) {
        newsBtn.addEventListener('click', async () => {
            newsBtn.textContent = "SYNCHRONIZING...";
            const RSS_URL = `https://feeds.news24.com/articles/news24/SouthAfrica/rss`;
            const API_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`;

            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                
                newsGrid.innerHTML = ""; // Clear existing
                data.items.slice(0, 6).forEach((item, index) => {
                    const card = document.createElement('div');
                    card.className = 'news-card reveal';
                    card.innerHTML = `
                        <span class="news-date">${new Date(item.pubDate).toLocaleDateString()}</span>
                        <h3>${item.title}</h3>
                        <a href="${item.link}" target="_blank" class="news-link">Read Frequency</a>
                    `;
                    newsGrid.appendChild(card);
                    
                    // Entrance Animation for new cards
                    gsap.from(card, {
                        opacity: 0, y: 30, delay: index * 0.1, duration: 0.8
                    });
                });
                newsBtn.textContent = "PULSE UPDATED";
            } catch (err) {
                newsBtn.textContent = "LINK FAILED";
            }
        });
    }
});