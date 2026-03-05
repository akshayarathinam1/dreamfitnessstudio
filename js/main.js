/* ====================================================
   DREAM FITNESS STUDIO — main.js
   ==================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---- 1. NAVBAR — sticky scroll + hamburger ----
  const navbar   = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    toggleScrollTop();
    triggerFadeIns();
  });

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
  }

  // Close nav on link click (mobile)
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  // ---- 2. ACTIVE NAV LINK ----
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // ---- 3. SCROLL-TO-TOP BUTTON ----
  const scrollTopBtn = document.getElementById('scrollTop');

  function toggleScrollTop() {
    if (!scrollTopBtn) return;
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---- 4. FADE-IN ON SCROLL ----
  const fadeEls = document.querySelectorAll('.fade-in');

  function triggerFadeIns() {
    fadeEls.forEach((el, i) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        setTimeout(() => el.classList.add('visible'), i * 80);
      }
    });
  }

  // Run once on load in case elements are already in view
  triggerFadeIns();
  toggleScrollTop();

  // ---- 5. ANIMATED STAT COUNTERS ----
  const statNums = document.querySelectorAll('.stat-num');
  let countersStarted = false;

  function startCounters() {
    if (countersStarted) return;
    const statsStrip = document.querySelector('.stats-strip');
    if (!statsStrip) return;
    const rect = statsStrip.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      countersStarted = true;
      statNums.forEach(el => {
        const target = parseInt(el.dataset.target, 10);
        const duration = 1800;
        const step = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = Math.floor(current).toLocaleString();
        }, 16);
      });
    }
  }

  window.addEventListener('scroll', startCounters);
  startCounters(); // in case stats are visible on load

  // ---- 6. SMOOTH ANCHOR SCROLLING ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    });
  });

  // ---- 7. PLAY BUTTON ANIMATION (pulse on hover) ----
  const playBtn = document.getElementById('playBtn');
  if (playBtn) {
    playBtn.addEventListener('click', () => {
      // Placeholder: would open a video modal
      playBtn.style.transform = 'translate(-50%, -50%) scale(0.9)';
      setTimeout(() => {
        playBtn.style.transform = 'translate(-50%, -50%) scale(1)';
      }, 150);
    });
  }

  // ---- 8. NAVBAR — hide/show on scroll direction ----
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    if (current > 120 && current > lastScroll) {
      // Scrolling down — shrink but keep navbar visible
      navbar.style.height = '56px';
    } else {
      navbar.style.height = 'var(--nav-h)';
    }
    lastScroll = current;
  });

});
