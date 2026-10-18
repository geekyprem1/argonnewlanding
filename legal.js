(() => {
  'use strict';
  const config = window.ARGONMAX || {};
  document.querySelectorAll('[data-help-center]').forEach((link) => {
    link.href = config.helpCenterUrl || 'https://teamkalki.tawk.help/';
  });
  const page = window.location.pathname.split('/').pop();
  document.querySelectorAll('.legal-footer a').forEach((link) => {
    if (link.getAttribute('href') === page) link.setAttribute('aria-current', 'page');
  });
  if (config.supportEmail) {
    const section = document.createElement('section');
    const heading = document.createElement('h2');
    heading.textContent = 'Email support';
    const paragraph = document.createElement('p');
    const link = document.createElement('a');
    link.href = 'mailto:' + config.supportEmail;
    link.textContent = config.supportEmail;
    paragraph.appendChild(link);
    section.append(heading, paragraph);
    document.querySelector('.legal-main').appendChild(section);
  }
})();
