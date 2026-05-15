/* ============================================================
   CHITRANSHI PANDEY — PORTFOLIO SCRIPTS
   ============================================================ */

/* ── EMAILJS — replace with your actual values ── */
const EMAILJS_PUBLIC_KEY  = 'nTqxqy-cJTm4WwDQo';
const EMAILJS_SERVICE_ID  = 'service_5v7c1wi';
const EMAILJS_TEMPLATE_ID = 'template_2xpvshj';
emailjs.init(EMAILJS_PUBLIC_KEY);

/* ── 1. CUSTOM CURSOR ── */
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
  ringX = e.clientX; ringY = e.clientY;
});

let currentRingX = 0, currentRingY = 0;
function animateRing() {
  currentRingX += (ringX - currentRingX) * 0.12;
  currentRingY += (ringY - currentRingY) * 0.12;
  cursorRing.style.left = currentRingX + 'px';
  cursorRing.style.top  = currentRingY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .achieve-card, .skill-card').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.style.width='20px'; cursor.style.height='20px'; cursorRing.style.width='56px'; cursorRing.style.height='56px'; });
  el.addEventListener('mouseleave', () => { cursor.style.width='12px'; cursor.style.height='12px'; cursorRing.style.width='36px'; cursorRing.style.height='36px'; });
});

/* ── 2. PARTICLES ── */
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const particles = [];
for (let i = 0; i < 80; i++) {
  particles.push({ x: Math.random()*window.innerWidth, y: Math.random()*window.innerHeight, vx:(Math.random()-.5)*.4, vy:(Math.random()-.5)*.4, r:Math.random()*1.5+.5, a:Math.random()*.6+.2 });
}
function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.x+=p.vx; p.y+=p.vy;
    if(p.x<0)p.x=canvas.width; if(p.x>canvas.width)p.x=0;
    if(p.y<0)p.y=canvas.height; if(p.y>canvas.height)p.y=0;
    ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle=`rgba(59,130,246,${p.a*.5})`; ctx.fill();
  });
  for(let i=0;i<particles.length;i++){
    for(let j=i+1;j<particles.length;j++){
      const d=Math.hypot(particles[i].x-particles[j].x,particles[i].y-particles[j].y);
      if(d<120){ ctx.beginPath(); ctx.moveTo(particles[i].x,particles[i].y); ctx.lineTo(particles[j].x,particles[j].y); ctx.strokeStyle=`rgba(59,130,246,${.12*(1-d/120)})`; ctx.lineWidth=.5; ctx.stroke(); }
    }
  }
  requestAnimationFrame(drawParticles);
}
drawParticles();

/* ── 3. NAVBAR SCROLL ── */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
});

/* ── 4. SCROLL REVEAL ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = (i % 4) * 0.08 + 's';
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── 5. PROFILE PHOTO ── */
const myPhoto = document.getElementById('myPhoto');
const placeholder = document.getElementById('photoPlaceholder');
if (myPhoto) {
  myPhoto.addEventListener('load', () => { placeholder.style.display='none'; myPhoto.style.display='block'; });
  myPhoto.addEventListener('error', () => { myPhoto.style.display='none'; placeholder.style.display='flex'; });
  if (myPhoto.complete && myPhoto.naturalWidth > 0) { placeholder.style.display='none'; myPhoto.style.display='block'; }
  else { myPhoto.style.display='none'; }
}

/* ── 6. FIGMA IMAGES — show placeholder if not found ── */
document.querySelectorAll('.figma-screenshot').forEach(img => {
  const ph = img.nextElementSibling; // the placeholder div right after img
  img.addEventListener('load', () => {
    img.classList.remove('hide');
    if (ph) ph.classList.remove('show');
  });
  img.addEventListener('error', () => {
    img.classList.add('hide');
    if (ph) ph.classList.add('show');
  });
  // Check if already loaded (cached)
  if (img.complete && img.naturalWidth > 0) {
    img.classList.remove('hide');
    if (ph) ph.classList.remove('show');
  } else if (img.complete && img.naturalWidth === 0) {
    img.classList.add('hide');
    if (ph) ph.classList.add('show');
  }
});

/* ── 7. CONTACT FORM ── */
function sendMessage() {
  const name    = document.getElementById('senderName').value.trim();
  const email   = document.getElementById('senderEmail').value.trim();
  const message = document.getElementById('senderMessage').value.trim();
  const btn     = document.getElementById('sendBtn');
  const status  = document.getElementById('formStatus');

  if (!name || !email || !message) {
    status.textContent = '⚠ Please fill in all fields.';
    status.className = 'form-status error';
    status.style.display = 'block';
    return;
  }
  btn.textContent = 'Sending... ✈'; btn.disabled = true; btn.style.opacity = '0.7';
  status.style.display = 'none';

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, { from_name:name, from_email:email, message:message })
  .then(() => {
    btn.textContent = 'Sent! ✓'; btn.style.opacity = '1';
    btn.style.background = 'linear-gradient(135deg,#059669,#06b6d4)';
    status.textContent = "✅ Message received! I'll get back to you soon.";
    status.className = 'form-status success'; status.style.display = 'block';
    document.getElementById('senderName').value = '';
    document.getElementById('senderEmail').value = '';
    document.getElementById('senderMessage').value = '';
  })
  .catch((err) => {
    console.error('EmailJS error:', err);
    btn.textContent = 'Send Message ✈'; btn.disabled = false; btn.style.opacity = '1';
    status.textContent = '❌ Something went wrong. Email me at chitranshipandey84@gmail.com';
    status.className = 'form-status error'; status.style.display = 'block';
  });
}

/* ── 8. ACTIVE NAV ON SCROLL ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.getAttribute('id'); });
  navLinks.forEach(l => { l.style.color=''; if(l.getAttribute('href')==='#'+current) l.style.color='var(--cyan2)'; });
});