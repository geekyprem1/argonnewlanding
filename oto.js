/* ==========================================================================
   ARGONMAX OTO PAGES — BEHAVIOR SCRIPT
   Handles:
   - Dynamic OTO routing & pricing
   - Downsell data & modal popup toggles
   - Smooth scroll to checkout offer for "Yes" decision
   - Scroll reveals, FAQ accordions & sticky checkout bar
   ========================================================================== */
(() => {
  'use strict';

  const cfg = window.ARGONMAX || {};
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const hasIO = 'IntersectionObserver' in window;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Keep the horizontally scrollable comparison reachable by keyboard as well.
  $$('.comp-matrix').forEach((region) => {
    region.tabIndex = 0;
    region.setAttribute('role', 'region');
    region.setAttribute('aria-label', 'Feature comparison. Scroll horizontally on small screens.');
  });

  // Determine current OTO step (1 through 10)
  const otoNum = Number(document.body.dataset.oto || '1');
  const otoData = (cfg.oto && cfg.oto[otoNum]) ? cfg.oto[otoNum] : null;

  // Set OTO Prices, Downsell details and URLs
  const price = (otoData && otoData.price) ? otoData.price : '47';
  const checkoutUrl = (otoData && otoData.checkoutUrl) ? otoData.checkoutUrl : '';
  const dsName = (otoData && otoData.dsName) ? otoData.dsName : 'Lite Edition';
  const dsPrice = (otoData && otoData.dsPrice) ? otoData.dsPrice : '27';
  const dsCheckoutUrl = (otoData && otoData.dsCheckoutUrl) ? otoData.dsCheckoutUrl : '';
  const nextUrl = (otoData && otoData.nextUrl) ? otoData.nextUrl : (otoNum < 10 ? `oto${otoNum + 1}.html` : 'thank-you.html');

  // Dynamic elements
  $$('[data-oto-price]').forEach((el) => {
    el.textContent = '$' + price;
  });

  $$('[data-ds-name]').forEach((el) => {
    el.textContent = dsName;
  });

  $$('[data-ds-price]').forEach((el) => {
    el.textContent = '$' + dsPrice;
  });

  $$('[data-oto-buy]').forEach((a) => {
    if (checkoutUrl) {
      a.href = checkoutUrl;
      a.rel = 'noopener';
    } else {
      a.href = '#offer';
    }
  });

  $$('[data-ds-buy]').forEach((a) => {
    if (dsCheckoutUrl) {
      a.href = dsCheckoutUrl;
      a.rel = 'noopener';
    } else if (checkoutUrl) {
      a.href = checkoutUrl;
      a.rel = 'noopener';
    } else {
      a.href = '#offer';
    }
  });

  $$('[data-oto-skip], [data-ds-skip]').forEach((a) => {
    a.href = nextUrl;
  });

  $$('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  // Decorative icons hidden from screen readers
  $$('svg.ico').forEach((s) => {
    s.setAttribute('aria-hidden', 'true');
    s.setAttribute('focusable', 'false');
  });

  // Smooth scroll to #offer when "Yes" decision is clicked
  const scrollToOffer = (e) => {
    const offer = $('#offer');
    if (offer) {
      if (e) e.preventDefault();
      offer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  $$('[data-decision-yes], .js-scroll-offer').forEach((btn) => {
    btn.addEventListener('click', scrollToOffer);
  });

  // Downsell Modal Popup Logic
  const modal = $('#dsModal');
  const openModal = (e) => {
    if (e) e.preventDefault();
    if (modal) {
      modal.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = (e) => {
    if (e) e.preventDefault();
    if (modal) {
      modal.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  };

  // Trigger modal when clicking "No Thanks" buttons
  $$('[data-decision-no], [data-open-downsell], .js-open-downsell, .oto-decline').forEach((btn) => {
    btn.addEventListener('click', openModal);
  });

  // Close modal handlers
  $$('[data-close-downsell], .ds-modal__close').forEach((btn) => {
    btn.addEventListener('click', closeModal);
  });

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('is-open')) {
      closeModal();
    }
  });

  // Scroll reveal animation
  if (hasIO) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });
    $$('.reveal').forEach((el) => io.observe(el));
  } else {
    $$('.reveal').forEach((el) => el.classList.add('is-in'));
  }

  // Scroll progress bar
  const bar = $('.progress i');
  let ticking = false;
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (bar && max > 0) {
      bar.style.setProperty('--p', Math.min(1, window.scrollY / max).toFixed(4));
    }
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(onScroll);
    }
  }, { passive: true });
  onScroll();


  // Sticky buy bar
  const sticky = $('#otoSticky');
  if (sticky) {
    const heroBtn = $('#heroBuy');
    const offerSec = $('#offer');
    const updateSticky = () => {
      const scrolledPast = heroBtn ? heroBtn.getBoundingClientRect().bottom < 0 : window.scrollY > 600;
      const reachedOffer = offerSec ? offerSec.getBoundingClientRect().top < window.innerHeight * 0.8 : false;
      const show = scrolledPast && !reachedOffer;
      sticky.classList.toggle('is-on', show);
    };
    window.addEventListener('scroll', updateSticky, { passive: true });
    updateSticky();
  }
})();
