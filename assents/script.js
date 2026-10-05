'use strict';

const header = document.getElementById('main-header');
const menuButton = document.getElementById('mobile-menu-btn');
const menu = document.getElementById('nav-menu');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (menu && menuButton) {
  header.classList.add('has-menu-control');
  const setMenuOpen = (open) => {
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Fechar menu de navegação' : 'Abrir menu de navegação');
    header.classList.toggle('menu-open', open);
  };
  menuButton.addEventListener('click', () => setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true'));
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenuOpen(false)));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && header.classList.contains('menu-open')) {
      setMenuOpen(false);
      menuButton.focus();
    }
  });
  document.addEventListener('click', (event) => { if (!header.contains(event.target)) setMenuOpen(false); });
  window.matchMedia('(min-width: 901px)').addEventListener('change', (event) => { if (event.matches) setMenuOpen(false); });
}

if (header) {
  const updateHeader = () => header.classList.toggle('scrolled', window.scrollY > 24);
  window.addEventListener('scroll', updateHeader, {passive: true});
  updateHeader();
}

if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.08});
  document.querySelectorAll('[data-reveal]').forEach((element) => { element.classList.add('will-reveal'); observer.observe(element); });
}

const tabs = Array.from(document.querySelectorAll('.method-tab'));
const selectTab = (selected, focus = false) => {
  tabs.forEach((tab) => {
    const active = tab === selected;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
    document.getElementById(tab.getAttribute('aria-controls')).hidden = !active;
  });
  if (focus) selected.focus();
};
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectTab(tab));
  tab.addEventListener('keydown', (event) => {
    let next;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) { event.preventDefault(); selectTab(tabs[next], true); }
  });
});
document.querySelector('.method-layout')?.classList.add('has-tab-control');

const form = document.getElementById('contact-form');
if (form) {
  document.querySelectorAll('[data-service]').forEach((link) => {
    link.addEventListener('click', () => {
      const option = Array.from(form.querySelectorAll('[name="service"]')).find((input) => input.value === link.dataset.service);
      if (option) option.checked = true;
    });
  });
  ['name', 'message'].forEach((id) => {
    const input = document.getElementById(id);
    input.addEventListener('input', () => input.setCustomValidity(input.value.trim() ? '' : 'Preencha este campo.'));
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const lines = [
      'Olá! Vim pelo site da ES Assistec e gostaria de conversar sobre um projeto.', '',
      `Nome: ${String(data.get('name')).trim()}`,
      `Empresa: ${String(data.get('company') || '').trim() || 'Não informada'}`,
      `E-mail: ${String(data.get('email')).trim()}`,
      `Interesse: ${data.get('service')}`, '',
      `Projeto: ${String(data.get('message')).trim()}`
    ];
    const url = `https://wa.me/5531993182624?text=${encodeURIComponent(lines.join('\n'))}`;
    const fallback = document.getElementById('whatsapp-fallback');
    fallback.href = url;
    fallback.hidden = false;
    document.getElementById('form-status').textContent = 'Sua mensagem está preparada. Revise e envie no WhatsApp. Se ele não abrir, use o link abaixo.';
    // Direct navigation also works when the browser blocks pop-up windows.
    window.location.assign(url);
  });
}
const year = document.getElementById('current-year');
if (year) year.textContent = new Date().getFullYear();
