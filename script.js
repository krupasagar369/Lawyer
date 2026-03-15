/**
 * Advocate Dasari Sai Sreenivasulu – script.js
 * Income Tax Advocate, Nellore, Andhra Pradesh
 */

'use strict';

/* ===== UTILITIES ===== */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ===== DOM READY ===== */
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initScrollSpy();
  initReveal();
  initCounters();
  initFAQ();
  initScrollTop();
  initHeaderShadow();
  initLazyImages();
  initBootstrapComponents();
});

/* ===================================================
   1. NAVIGATION – mobile toggle + close on link click
   =================================================== */
function initNav() {
  const toggle  = $('#navToggle');
  const menu    = $('#navMenu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
    toggle.innerHTML = isOpen ? '<i class="bi bi-x-lg"></i>' : '<i class="bi bi-list"></i>';
  });

  // Close menu when a link is clicked
  $$('.nav-link', menu).forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', false);
      toggle.innerHTML = '<i class="bi bi-list"></i>';
    });
  });

  // Close menu on outside click
  document.addEventListener('click', e => {
    if (!menu.contains(e.target) && !toggle.contains(e.target)) {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', false);
      toggle.innerHTML = '<i class="bi bi-list"></i>';
    }
  });

  // Smooth scroll for all anchor links
  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = $(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const headerH = $('#main-header')?.offsetHeight ?? 0;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH - 8;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ===================================================
   2. SCROLL SPY – highlight active nav link
   =================================================== */
function initScrollSpy() {
  const navLinks = $$('.nav-link[href^="#"]');
  const sections = $$('section[id]');
  if (!navLinks.length || !sections.length) return;

  const onScroll = () => {
    const scrollY   = window.scrollY;
    const headerH   = $('#main-header')?.offsetHeight ?? 70;
    let activeId    = '';

    sections.forEach(sec => {
      const top = sec.offsetTop - headerH - 60;
      if (scrollY >= top) activeId = sec.id;
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${activeId}`);
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ===================================================
   3. REVEAL ON SCROLL – Intersection Observer
   =================================================== */
function initReveal() {
  const elements = $$('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger sibling reveals for nicer card effects
        const delay = entry.target.dataset.delay ?? 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, Number(delay));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  // Add stagger delay to grid siblings
  const grids = $$('.row');
  grids.forEach(row => {
    const reveals = $$('.reveal', row);
    reveals.forEach((el, idx) => {
      el.dataset.delay = idx * 80;
    });
  });

  elements.forEach(el => observer.observe(el));
}

/* ===================================================
   4. COUNTER ANIMATION – stats ribbon
   =================================================== */
function initCounters() {
  const counters = $$('[data-count]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el      = entry.target;
      const target  = parseInt(el.dataset.count, 10);
      const suffix  = target >= 100 ? '+' : (target >= 10 ? '+' : '');
      const dur     = 1800;
      const step    = dur / target;
      let current   = 0;

      const tick = () => {
        current += Math.ceil(target / (dur / 16));
        if (current >= target) {
          el.textContent = target + suffix;
          return;
        }
        el.textContent = current + suffix;
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

/* ===================================================
   5. FAQ ACCORDION
   =================================================== */
function initFAQ() {
  const questions = $$('.faq-question');
  if (!questions.length) return;

  questions.forEach(btn => {
    btn.addEventListener('click', () => {
      const answer    = btn.nextElementSibling;
      const isOpen    = btn.getAttribute('aria-expanded') === 'true';
      const faqItem   = btn.closest('.faq-item');

      // Close all others
      questions.forEach(q => {
        if (q !== btn) {
          q.setAttribute('aria-expanded', 'false');
          q.nextElementSibling?.classList.remove('open');
        }
      });

      // Toggle current
      btn.setAttribute('aria-expanded', !isOpen);
      answer?.classList.toggle('open', !isOpen);
    });
  });
}

/* ===================================================
   6. SCROLL TO TOP BUTTON
   =================================================== */
function initScrollTop() {
  const btn = $('#scrollTopBtn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ===================================================
   7. HEADER SHADOW ON SCROLL
   =================================================== */
function initHeaderShadow() {
  const header = $('#main-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 10
      ? '0 4px 30px rgba(0,0,0,.35)'
      : '0 2px 20px rgba(0,0,0,.25)';
  }, { passive: true });
}

/* ===================================================
   8. LAZY IMAGE LOADING
   =================================================== */
function initLazyImages() {
  if (!('IntersectionObserver' in window)) return;

  const lazyImgs = $$('img[data-src]');
  if (!lazyImgs.length) return;

  const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const img = entry.target;
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      imgObserver.unobserve(img);
    });
  });

  lazyImgs.forEach(img => imgObserver.observe(img));
}

/* ===================================================
   9. BOOTSTRAP TOOLTIPS & POPOVERS
   =================================================== */
function initBootstrapComponents() {
  // Tooltips
  $$('[data-bs-toggle="tooltip"]').forEach(el => {
    new window.bootstrap?.Tooltip(el);
  });
  // Popovers
  $$('[data-bs-toggle="popover"]').forEach(el => {
    new window.bootstrap?.Popover(el);
  });
}

/* ===================================================
   10. WHATSAPP LINK – pre-filled message
   =================================================== */
$$('a[href*="wa.me"]').forEach(link => {
  link.addEventListener('click', () => {
    const phone   = '919441287609';
    const message = 'Hello Advocate Dasari! I would like to consult with you regarding an Income Tax / legal matter. Please let me know your availability.';
    link.href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  });
});

/* ===================================================
   11. ACTIVE STATE ON PAGE LOAD (hash support)
   =================================================== */
window.addEventListener('load', () => {
  if (window.location.hash) {
    const target = $(window.location.hash);
    if (target) {
      setTimeout(() => {
        const headerH = $('#main-header')?.offsetHeight ?? 70;
        const top = target.getBoundingClientRect().top + window.scrollY - headerH - 8;
        window.scrollTo({ top, behavior: 'smooth' });
      }, 200);
    }
  }
});

console.log('✅ Advocate Dasari – script loaded | Income Tax Advocate in Nellore, Andhra Pradesh');
