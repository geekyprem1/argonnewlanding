/* ==========================================================================
   ARGONMAX LANDING PAGE — behaviour
   Plain JavaScript, no dependencies. The page works without it (content stays
   visible); this only adds motion, counters, the sticky bar and your config.
   ========================================================================== */
(() => {
  'use strict';

  const C = Object.assign({
    checkoutUrl: '', price: '17', founderName: '[Your Name]', supportEmail: '',
    demoVideoUrl: '', launchEndsAt: '', termsUrl: '#', privacyUrl: '#', refundUrl: '#'
  }, window.ARGONMAX || {});

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasIO = 'IntersectionObserver' in window;

  const marqueePause = $('[data-marquee-pause]');
  if (marqueePause) {
    marqueePause.addEventListener('click', () => {
      const paused = marqueePause.closest('.hero-feature-marquee').classList.toggle('is-paused');
      marqueePause.setAttribute('aria-pressed', String(paused));
      marqueePause.setAttribute('aria-label', paused ? 'Resume feature scrolling' : 'Pause feature scrolling');
      marqueePause.textContent = paused ? 'Resume' : 'Pause';
    });
  }

  /* ---------- Final checkout: use the supplied purchase URL and remove declines ---------- */
  const finalCheckout = $('#offer-checkout .forgeContainer');
  if (finalCheckout) {
    const updateFinalCheckout = () => {
      const buy = $('.btn-forge:not(.btn-forge-continue)', finalCheckout);
      if (buy) {
        buy.href = 'https://launchpadjv.com/product/checkout/5707?page=4807&offer=574&offerProduct=6618';
        buy.rel = 'noopener';
      }
      $$('.btn-forge-continue', finalCheckout).forEach((link) => link.remove());
    };
    new MutationObserver(updateFinalCheckout).observe(finalCheckout, { childList: true, subtree: true });
    updateFinalCheckout();
  }

  /* ---------- Creative examples: reveal the complete gallery on demand ---------- */
  const galleryToggle = $('[data-gallery-toggle]');
  const extraCreations = $$('[data-gallery-extra]');
  if (galleryToggle && extraCreations.length) {
    extraCreations.forEach((card) => { card.hidden = true; });
    galleryToggle.hidden = false;
    galleryToggle.addEventListener('click', () => {
      const expanded = galleryToggle.getAttribute('aria-expanded') !== 'true';
      extraCreations.forEach((card) => { card.hidden = !expanded; });
      galleryToggle.setAttribute('aria-expanded', String(expanded));
      galleryToggle.textContent = expanded ? 'Show fewer examples' : 'Show all 29 examples';
      if (!expanded) $('#creations').scrollIntoView({ behavior: reduce ? 'instant' : 'smooth' });
    });
  }

  /* ---------- Decorative icons are hidden from screen readers ---------- */
  $$('svg.ico').forEach((s) => { s.setAttribute('aria-hidden', 'true'); s.setAttribute('focusable', 'false'); });

  /* ---------- Your details from config.js ---------- */
  // Every sales CTA leads to the checkout at the bottom of the long offer card.
  // Delegation also covers the primary Launchpad button inserted asynchronously.
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;
    const isSalesCTA = link.matches('a[href="#offer-checkout"], a[href="#s42"]') ||
      link.matches('.vsl-offer__purchase .btn-forge:not(.btn-forge-continue), .repeat-buy .btn-forge:not(.btn-forge-continue)');
    const target = $('#offer-checkout');
    if (isSalesCTA && target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: reduce ? 'instant' : 'smooth', block: 'center' });
    }
  });
  $$('[data-price]').forEach((el) => { el.textContent = '$' + String(C.price).replace(/^\$/, ''); });
  $$('[data-founder]').forEach((el) => { el.textContent = C.founderName; });
  $$('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });
  $$('[data-support]').forEach((a) => {
    if (C.supportEmail) { a.href = 'mailto:' + C.supportEmail; a.textContent = C.supportEmail; }
  });
  [['terms', C.termsUrl], ['privacy', C.privacyUrl], ['refund', C.refundUrl]].forEach(([k, url]) => {
    $$('[data-link="' + k + '"]').forEach((a) => { a.href = url || '#'; });
  });

  /* ---------- Headline word-by-word reveal ---------- */
  const splitWords = (root) => {
    let n = 0;
    const walk = (node) => {
      Array.from(node.childNodes).forEach((child) => {
        if (child.nodeType === 3) {
          const frag = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
            const w = document.createElement('span'); w.className = 'w';
            const i = document.createElement('span'); i.className = 'wi';
            i.style.setProperty('--wi', n++); i.textContent = part;
            w.appendChild(i); frag.appendChild(w);
          });
          node.replaceChild(frag, child);
        } else if (child.nodeType === 1 && child.tagName !== 'MARK') {
          walk(child);
        }
      });
    };
    root.setAttribute('aria-label', root.textContent.replace(/\s+/g, ' ').trim());
    walk(root);
  };
  if (!reduce) $$('[data-split]').forEach(splitWords);

  /* ---------- Scroll reveal ---------- */
  if (hasIO) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    $$('.reveal').forEach((el) => io.observe(el));
  } else {
    $$('.reveal').forEach((el) => el.classList.add('is-in'));
  }

  /* ---------- Scale fixed-size mockups to their container ---------- */
  const fitEls = $$('[data-fit]');
  const fit = (el) => el.style.setProperty('--s', (el.clientWidth / Number(el.dataset.fit)).toFixed(4));
  if ('ResizeObserver' in window) {
    const ro = new ResizeObserver((list) => list.forEach((e) => fit(e.target)));
    fitEls.forEach((el) => { fit(el); ro.observe(el); });
  } else {
    const all = () => fitEls.forEach(fit); all(); window.addEventListener('resize', all);
  }

  /* ---------- Scroll progress + hero tilt ---------- */
  const bar = $('.progress i');
  const tilt = $('.stage__frame');
  let ticking = false;
  const onScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (bar) bar.style.setProperty('--p', max > 0 ? Math.min(1, window.scrollY / max).toFixed(4) : 0);
    if (tilt && !reduce) {
      const r = tilt.getBoundingClientRect();
      const t = Math.min(1, Math.max(0, (r.top - window.innerHeight * 0.12) / (window.innerHeight * 0.8)));
      tilt.style.setProperty('--tilt', (t * 9).toFixed(2) + 'deg');
    }
    ticking = false;
  };
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  /* ---------- Section badges: add ?sections to the URL or press "S" ---------- */
  let badgesBuilt = false;
  const toggleSections = (force) => {
    const on = typeof force === 'boolean' ? force : !document.body.classList.contains('show-sections');
    document.body.classList.toggle('show-sections', on);
    if (on && !badgesBuilt) {
      badgesBuilt = true;
      $$('[data-section]').forEach((el) => {
        const b = document.createElement('span');
        b.className = 'sec-badge';
        b.textContent = '§' + String(el.dataset.section).padStart(2, '0') + ' · ' + (el.dataset.name || '');
        el.insertBefore(b, el.firstChild);
      });
    }
  };
  if (/[?&]sections\b/.test(location.search)) toggleSections(true);
  window.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() !== 's' || e.metaKey || e.ctrlKey || e.altKey) return;
    if (/^(input|textarea|select)$/i.test((e.target.tagName || ''))) return;
    toggleSections();
  });

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  /* ---------- Count-up numbers ---------- */
  const fmt = (n, dec) => n.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec });
  const countUp = (el) => {
    const to = parseFloat(el.dataset.count);
    const dec = Number(el.dataset.dec || 0);
    const pre = el.dataset.prefix || '';
    const suf = el.dataset.suffix || '';
    const dur = Number(el.dataset.dur || 1700);
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      el.textContent = pre + fmt(to * (1 - Math.pow(1 - p, 3)), dec) + suf;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if (!reduce && hasIO) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { countUp(e.target); cio.unobserve(e.target); } });
    }, { threshold: 0.6 });
    $$('[data-count]').forEach((el) => {
      el.textContent = (el.dataset.prefix || '') + '0' + (el.dataset.suffix || '');
      cio.observe(el);
    });
  }

  /* ---------- Typewriter demos (loop while on screen) ---------- */
  $$('[data-type]').forEach((el) => {
    const full = el.dataset.type;
    if (reduce || !hasIO) { el.textContent = full; return; }
    el.textContent = '';
    let token = 0;
    const loop = async (my) => {
      while (my === token) {
        for (let i = 1; i <= full.length && my === token; i++) { el.textContent = full.slice(0, i); await sleep(36 + Math.random() * 42); }
        await sleep(2800);
        if (my === token) el.textContent = '';
        await sleep(500);
      }
    };
    new IntersectionObserver((entries) => {
      entries.forEach((e) => { token++; if (e.isIntersecting) loop(token); });
    }, { threshold: 0.4 }).observe(el);
  });

  /* ---------- Scripted product demos (data-at = ms from loop start) ---------- */
  $$('[data-seq]').forEach((box) => {
    const [start, step] = box.dataset.seq.split(',').map(Number);
    Array.from(box.children).forEach((c, i) => { c.dataset.at = String(start + i * step); });
  });
  $$('.scene').forEach((scene) => {
    const items = $$('[data-at]', scene).map((el) => ({
      el, on: Number(el.dataset.at), off: el.dataset.off ? Number(el.dataset.off) : null
    }));
    const total = Number(scene.dataset.loop || 10000);
    if (reduce || !hasIO) { items.forEach((i) => { if (i.off === null) i.el.classList.add('on'); }); return; }
    let timers = [];
    let live = false;
    const clear = () => { timers.forEach(clearTimeout); timers = []; };
    const play = () => {
      clear();
      items.forEach((i) => i.el.classList.remove('on'));
      items.forEach((i) => {
        timers.push(setTimeout(() => i.el.classList.add('on'), i.on));
        if (i.off !== null) timers.push(setTimeout(() => i.el.classList.remove('on'), i.off));
      });
      timers.push(setTimeout(() => { if (live) play(); }, total));
    };
    new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !live) { live = true; play(); }
        else if (!e.isIntersecting && live) { live = false; clear(); }
      });
    }, { threshold: 0.35 }).observe(scene);
  });

  /* ---------- Demo video (section 30): plays demoVideoUrl from config.js on click ---------- */
  const toEmbed = (raw) => {
    try {
      const u = new URL(raw, location.href);
      if (!/^https?:$/.test(u.protocol)) return null;
      const host = u.hostname.replace(/^www\./, '');
      let id = '';
      if (host === 'youtu.be') id = u.pathname.slice(1);
      else if (/(^|\.)youtube(-nocookie)?\.com$/.test(host)) id = u.pathname === '/watch' ? u.searchParams.get('v') || '' : '';
      if (id) return { type: 'iframe', src: 'https://www.youtube.com/embed/' + encodeURIComponent(id) + '?autoplay=1&rel=0' };
      if (/^(www\.)?vimeo\.com$/.test(host) && /^\/\d+/.test(u.pathname)) return { type: 'iframe', src: 'https://player.vimeo.com/video/' + u.pathname.split('/')[1] + '?autoplay=1' };
      if (/\.(mp4|webm|ogg)$/i.test(u.pathname)) return { type: 'video', src: u.href };
      return { type: 'iframe', src: u.href };
    } catch (e) { return null; }
  };
  $$('[data-demo]').forEach((box) => {
    const play = $('.player__play', box);
    const badge = $('.player__badge', box);
    const stage = $('.player__stage', box);
    const embed = C.demoVideoUrl ? toEmbed(C.demoVideoUrl) : null;
    if (!play || !stage || !embed) return;
    play.hidden = false;
    if (badge) badge.hidden = true;
    play.addEventListener('click', () => {
      let el;
      if (embed.type === 'video') {
        el = document.createElement('video');
        el.src = embed.src; el.controls = true; el.autoplay = true; el.playsInline = true;
      } else {
        el = document.createElement('iframe');
        el.src = embed.src; el.title = 'ArgonMax demo walkthrough';
        el.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
        el.allowFullscreen = true; el.referrerPolicy = 'strict-origin-when-cross-origin';
      }
      el.className = 'player__media';
      stage.appendChild(el);
      box.classList.add('is-playing');
      play.hidden = true;
    });
  });

  /* ---------- Primary checkout countdown: preserve its deadline across reloads ---------- */
  const offerCountdown = $('[data-offer-countdown]');
  if (offerCountdown) {
    let offerEnd = C.launchEndsAt ? Date.parse(C.launchEndsAt) : NaN;
    const duration = Number(C.offerCountdownMinutes);
    if (!C.launchEndsAt && Number.isFinite(duration) && duration > 0) {
      const storageKey = 'argonmax-offer-574-deadline';
      try { offerEnd = Number(localStorage.getItem(storageKey)) || NaN; } catch (_) { /* Storage may be disabled. */ }
      if (!Number.isFinite(offerEnd)) {
        offerEnd = Date.now() + duration * 60000;
        try { localStorage.setItem(storageKey, String(offerEnd)); } catch (_) { /* Use the current page deadline. */ }
      }
    }
    if (Number.isFinite(offerEnd)) {
      offerCountdown.hidden = false;
      let offerInterval;
      const updateOfferCountdown = () => {
        const left = Math.max(0, Math.ceil((offerEnd - Date.now()) / 1000));
        const values = { d: Math.floor(left / 86400), h: Math.floor(left % 86400 / 3600), m: Math.floor(left % 3600 / 60), s: left % 60 };
        Object.entries(values).forEach(([key, value]) => {
          $('[data-offer-cd="' + key + '"]', offerCountdown).textContent = key === 's' || key === 'm' ? String(value).padStart(2, '0') : String(value);
        });
        if (left === 0) {
          $('.offer-countdown__banner', offerCountdown).hidden = true;
          $('.offer-countdown__expired', offerCountdown).hidden = false;
          clearInterval(offerInterval);
        }
        return left;
      };
      if (updateOfferCountdown() > 0) offerInterval = setInterval(updateOfferCountdown, 1000);
    }
  }

  /* ---------- Launch countdowns: show only for a configured future deadline ---------- */
  const countdowns = $$('[data-countdown]');
  const endAt = C.launchEndsAt ? Date.parse(C.launchEndsAt) : NaN;
  if (countdowns.length && Number.isFinite(endAt) && endAt > Date.now()) {
    const pad = (n) => String(n).padStart(2, '0');
    let timer = 0;
    const tick = () => {
      const left = Math.max(0, Math.floor((endAt - Date.now()) / 1000));
      const values = { d: Math.floor(left / 86400), h: Math.floor((left % 86400) / 3600), m: Math.floor((left % 3600) / 60), s: left % 60 };
      countdowns.forEach((cd) => {
        Object.entries(values).forEach(([k, value]) => {
          const cell = $('[data-cd="' + k + '"]', cd);
          if (cell) cell.textContent = pad(value);
        });
        cd.hidden = left === 0;
      });
      if (left === 0) clearInterval(timer);
    };
    tick();
    timer = setInterval(tick, 1000);
  }

  /* ---------- Exit offer: show once per tab session on a top-edge desktop exit ---------- */
  const exitOffer = $('#exit-offer');
  if (exitOffer && typeof exitOffer.showModal === 'function') {
    let shown = false;
    const sessionKey = 'argonmax-exit-new4-shown';
    try { shown = sessionStorage.getItem(sessionKey) === '1'; } catch (_) { /* Use the page state. */ }
    const showExitOffer = (event) => {
      if (shown || event.relatedTarget || event.clientY > 0 || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
      if (document.querySelector('dialog[open]')) return;
      exitOffer.showModal();
      shown = true;
      document.documentElement.classList.add('exit-offer-open');
      try { sessionStorage.setItem(sessionKey, '1'); } catch (_) { /* Use the page state. */ }
    };
    document.addEventListener('mouseout', showExitOffer);
    $$('[data-exit-close]', exitOffer).forEach((button) => {
      button.addEventListener('click', () => exitOffer.close());
    });
    exitOffer.addEventListener('close', () => {
      document.documentElement.classList.remove('exit-offer-open');
    });
    exitOffer.addEventListener('click', (event) => {
      if (event.target !== exitOffer) return;
      const rect = exitOffer.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) exitOffer.close();
    });
    $('[data-copy-exit-coupon]', exitOffer).addEventListener('click', async (event) => {
      const copyButton = event.currentTarget;
      const status = $('[data-exit-status]', exitOffer);
      try {
        await navigator.clipboard.writeText('new4');
        copyButton.textContent = 'Copied!';
        status.textContent = 'Coupon copied. Paste it at checkout.';
      } catch (_) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents($('#exit-coupon-code'));
        selection.removeAllRanges();
        selection.addRange(range);
        status.textContent = 'Select and copy new4, then enter it at checkout.';
      }
    });
  }

  /* ---------- Sticky buy bar: shows once the first button is gone, hides at the offer + final CTA ---------- */
  const sticky = $('#sticky');
  if (sticky) {
    const first = $('#s06');
    const offer = $('#s42');
    const last = $('#s48');
    const onScreen = (el) => {
      if (!el) return false;
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight * 0.85 && r.bottom > 0;
    };
    let queued = false;
    const update = () => {
      queued = false;
      const passed = first ? first.getBoundingClientRect().bottom < 0 : window.scrollY > 600;
      const reachedEnd = last ? last.getBoundingClientRect().top < window.innerHeight * 0.85 : false;
      const on = passed && !onScreen(offer) && !reachedEnd;
      sticky.classList.toggle('is-on', on);
      sticky.inert = !on;
    };
    window.addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener('resize', update);
    update();
  }
})();
