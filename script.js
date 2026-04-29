/* ═══════════════════════════════════════════════
   RAFAEL RODRIGUES — PORTFOLIO SCRIPT
   ═══════════════════════════════════════════════ */

/* ── HAMBURGER MENU ───────────────────────────── */
const hamburger   = document.getElementById('nav-hamburger');
const mobileMenu  = document.getElementById('nav-mobile-menu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

/* Close on link click */
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ── CUSTOM CURSOR ────────────────────────────── */
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

/* Smooth ring follow with lag */
function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

/* ── TYPING EFFECT ────────────────────────────── */
const phrases = [
  'En recherche d\'alternance MIAGE 2026',
  "Major de promotion · Paris Nanterre",
  "Profil Hybrique Gestion x Informatique",
  'Intéressé par l’intelligence artificielle',
  'Data · Automatisation · Systèmes & Réseaux',
];

let phraseIndex  = 0;
let charIndex    = 0;
let isDeleting   = false;
const typedEl    = document.getElementById('typed');

function typeLoop() {
  const current = phrases[phraseIndex];

  if (!isDeleting) {
    typedEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeLoop, 2000);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  setTimeout(typeLoop, isDeleting ? 42 : 78);
}

setTimeout(typeLoop, 1500);

/* ── SCROLL REVEAL ────────────────────────────── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

/* ── SKILL BARS ANIMATION ─────────────────────── */
const skillsSection = document.getElementById('skills');

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-fill').forEach((fill, i) => {
          setTimeout(() => {
            fill.style.width = fill.dataset.width + '%';
          }, i * 80);
        });
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

if (skillsSection) skillObserver.observe(skillsSection);

/* ── ACTIVE NAV HIGHLIGHT ─────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach((link) => {
          const isActive = link.getAttribute('href') === '#' + id;
          link.classList.toggle('active', isActive);
        });
      }
    });
  },
  { rootMargin: '-45% 0px -50% 0px' }
);

sections.forEach((s) => navObserver.observe(s));

/* ── NAVBAR BACKGROUND ON SCROLL ──────────────── */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(7, 11, 20, 0.97)';
  } else {
    navbar.style.background = 'rgba(7, 11, 20, 0.85)';
  }
}, { passive: true });

/* ── SMOOTH SECTION ENTRANCE WITH STAGGER ────── */
/* Cards inside sections get staggered reveals */
document.querySelectorAll('.projects-grid, .exp-grid').forEach((grid) => {
  const cards = grid.querySelectorAll('.project-card, .exp-card');
  const gridObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          cards.forEach((card, i) => {
            setTimeout(() => card.classList.add('visible'), i * 130);
          });
          gridObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  gridObserver.observe(grid);
});