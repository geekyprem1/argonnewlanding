/* Purchase is handled by your checkout provider; this page provides next steps. */
(() => {
  'use strict';
  const config = window.ARGONMAX || {};
  const access = document.querySelector('[data-access]');
  const safeUrl = (value) => {
    if (!value || typeof value !== 'string') return null;
    try {
      const url = new URL(value, window.location.href);
      return /^https?:$/.test(url.protocol) ? url.href : null;
    } catch { return null; }
  };
  const accessUrl = safeUrl(config.accessUrl);
  if (accessUrl) {
    access.href = accessUrl;
    document.querySelector('[data-access-note]').textContent = 'Sign in using the account details from your purchase confirmation.';
  }
  const email = typeof config.supportEmail === 'string' ? config.supportEmail.trim() : '';
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    const support = document.querySelector('[data-ty-support]');
    support.href = 'mailto:' + email + '?subject=' + encodeURIComponent('ArgonMax access help');
    support.hidden = false;
    support.previousElementSibling.textContent = 'Contact our support team with your order ID and purchase email so we can help you get started.';
  }
  document.querySelector('[data-year]').textContent = new Date().getFullYear();
  const status = document.querySelector('[data-copy-status]');
  document.querySelectorAll('[data-copy]').forEach((button) => {
    button.hidden = false;
    button.addEventListener('click', async () => {
      const prompt = button.closest('article').querySelector('[data-prompt]');
      try {
        if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
        await navigator.clipboard.writeText(prompt.textContent.trim());
        status.textContent = 'Prompt copied. Paste it into ArgonMax and replace the brackets with your details.';
      } catch {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(prompt);
        selection.removeAllRanges();
        selection.addRange(range);
        status.textContent = 'Prompt selected. Use your device’s Copy command, then paste it into ArgonMax.';
      }
    });
  });
})();
