// main.js — small behaviors used across pages
document.addEventListener('DOMContentLoaded', function () {
  // set year
  var yEl = document.getElementById('year');
  if (yEl) yEl.textContent = new Date().getFullYear();

  // Simple hamburger toggle to show basic mobile nav
  var hamburger = document.getElementById('hamburgerBtn') || document.getElementById('hamburgerBtn2');
  if (hamburger) {
    hamburger.addEventListener('click', function () {
      var nav = document.querySelector('.main-nav');
      if (!nav) return;
      if (nav.style.display === 'flex' || getComputedStyle(nav).display === 'flex') {
        nav.style.display = 'none';
      } else {
        nav.style.display = 'flex';
        nav.style.flexDirection = 'column';
        nav.style.position = 'absolute';
        nav.style.right = '1rem';
        nav.style.top = '64px';
        nav.style.background = '#fff';
        nav.style.padding = '0.8rem';
        nav.style.boxShadow = '0 6px 20px rgba(0,0,0,0.06)';
      }
    });
  }

  // close nav on click outside (mobile)
  document.addEventListener('click', function (e) {
    var nav = document.querySelector('.main-nav'), hb = document.getElementById('hamburgerBtn');
    if (!nav || !hb) return;
    if (getComputedStyle(nav).display === 'flex' && !nav.contains(e.target) && !hb.contains(e.target) && window.innerWidth < 980) {
      nav.style.display = 'none';
    }
  });
});
