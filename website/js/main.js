function showMessage(targetEl, msg, type = "info") {
  if (!targetEl) return;
  targetEl.style.display = "block";
  targetEl.style.padding = "0.75rem";
  targetEl.style.marginTop = "0.6rem";
  targetEl.style.borderRadius = "8px";
  targetEl.style.fontWeight = "600";

  if (type === "error") {
    targetEl.style.background = "#f8d7da";
    targetEl.style.color = "#842029";
  } else if (type === "success") {
    targetEl.style.background = "#d1e7dd";
    targetEl.style.color = "#0f5132";
  } else {
    targetEl.style.background = "#e7eaf0";
    targetEl.style.color = "#333";
  }

  targetEl.textContent = msg;
}

function clearMessage(targetEl) {
  if (!targetEl) return;
  targetEl.style.display = "none";
  targetEl.textContent = "";
}

function validateEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

function validatePhone(phone) {
  return /^\+?[0-9\-\s]{7,15}$/.test(phone);
}

function getNavbarPath() {
  const path = window.location.pathname;
  const inHtmlFolder = path.split('/').includes('html');
  return inHtmlFolder ? '../components/navbar.html' : './components/navbar.html';
}

window.addEventListener('DOMContentLoaded', () => {
  const navbarContainer = document.getElementById('navbar');
  const navbarPath = getNavbarPath();

  if (navbarContainer) {
    fetch(navbarPath)
      .then(res => {
        if (!res.ok) throw new Error(`Navbar not found at ${navbarPath}`);
        return res.text();
      })
      .then(html => {
        navbarContainer.innerHTML = html;
        initNavbarFunctions();
        normalizeNavbarLinks();
      })
      .catch(err => {
        // If navbar fails, still log but page can continue
        console.error('Navbar failed to load:', err);
      });
  }

  // Footer year: set if present
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
});


function initNavbarFunctions() {
  const hamburger = document.getElementById('hamburgerBtn');
  const navMenu = document.querySelector('.main-nav');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const expanded = navMenu.classList.contains('open');
      hamburger.setAttribute('aria-expanded', String(expanded));
    });
  }

  // close mobile nav when clicking outside (optional UX nicety)
  document.addEventListener('click', (e) => {
    const nav = document.querySelector('.main-nav');
    const ham = document.getElementById('hamburgerBtn');
    if (!nav || !ham) return;
    if (!nav.contains(e.target) && !ham.contains(e.target)) {
      nav.classList.remove('open');
      ham.setAttribute('aria-expanded', 'false');
    }
  });
}


function normalizeNavbarLinks() {
  const anchors = document.querySelectorAll('#navbar a');
  if (!anchors.length) return;

  const inHtmlFolder = window.location.pathname.split('/').includes('html');

  // Known html pages (files located in website/html/)
  const htmlPages = new Set([
    'login.html','signup.html','menu.html','profile.html','restaurants.html',
    'contact.html','forget.html','dashboard.html'
  ]);

  anchors.forEach(a => {
    const raw = a.getAttribute('href') || '';
    // leave external or hash links untouched
    if (/^https?:\/\//i.test(raw) || raw.startsWith('#')) return;

    // Remove leading ./ or /
    let name = raw.replace(/^\.?\//, '').replace(/^\/+/, '');

    // If target is index or empty
    if (name === '' || name === 'index.html') {
      a.setAttribute('href', inHtmlFolder ? '../index.html' : './index.html');
      return;
    }

    // If target is one of the html pages, route into ./html/ from root, or use ./ from within html/
    if (htmlPages.has(name)) {
      a.setAttribute('href', inHtmlFolder ? `./${name}` : `./html/${name}`);
      return;
    }

    // Otherwise, treat as a resource path:
    // if in html folder, go up one level; otherwise keep at root-level path
    a.setAttribute('href', inHtmlFolder ? `../${name}` : `./${name}`);
  });
}

/* =========================
   Expose helpers globally if needed elsewhere
   (keeps compatibility with app-pages.js which expects these helpers)
   ========================= */
window.sfHelpers = {
  showMessage,
  clearMessage,
  validateEmail,
  validatePhone
};
