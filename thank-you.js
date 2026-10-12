/* Customer account access and truthful clipboard feedback. */
(() => {
  'use strict';
  const config = window.ARGONMAX || {};
  const safeUrl = (value) => {
    if (typeof value !== 'string' || !value.trim()) return null;
    try { const url = new URL(value, window.location.href); return /^https?:$/.test(url.protocol) ? url.href : null; }
    catch { return null; }
  };
  const loginUrl = safeUrl(config.accessUrl);
  if (loginUrl) {
    document.querySelectorAll('[data-access]').forEach(a => { a.href = loginUrl; });
    document.querySelector('#login-url').textContent = loginUrl;
  }
  const helpUrl = safeUrl(config.helpCenterUrl);
  if (helpUrl) document.querySelectorAll('[data-help-center]').forEach(a => { a.href = helpUrl; a.target = '_blank'; a.rel = 'noopener noreferrer'; });
  const email = typeof config.supportEmail === 'string' ? config.supportEmail.trim() : '';
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    const support = document.querySelector('[data-ty-support]');
    support.href = 'mailto:' + email + '?subject=' + encodeURIComponent('ArgonMax access help');
    support.hidden = false;
  }
  document.querySelector('[data-year]').textContent = new Date().getFullYear();
  const toast = document.querySelector('[data-copy-status]');
  let toastTimer;
  const notify = (message) => {
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add('is-visible');
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 4500);
  };
  const copy = async (text, message) => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(text);
      document.querySelector('[data-copy-fallback]').hidden = true;
      notify(message);
    } catch {
      const fallback = document.querySelector('[data-copy-fallback]');
      const field = fallback.querySelector('textarea');
      fallback.hidden = false;
      field.value = text;
      field.focus();
      field.select();
      notify('Details selected. Use your device’s Copy command.');
    }
  };
  const password = document.querySelector('#login-password').textContent;
  const copyPassword = document.querySelector('[data-copy-password]');
  copyPassword.hidden = false;
  copyPassword.addEventListener('click', () => copy(password, 'Password copied!'));
  const copyAll = document.querySelector('[data-copy-all]');
  copyAll.hidden = false;
  copyAll.addEventListener('click', () => {
    const details = ['ArgonMax Login Credentials', 'Login URL: ' + document.querySelector('#login-url').href, 'Email: Use your purchase email address', 'Password: ' + password].join('\n');
    copy(details, 'All login details copied!');
  });
})();
