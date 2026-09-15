// Light/dark theme toggle — shared across all pages.
// Pairs with the small inline anti-flash script in each page's <head>,
// which sets data-theme on <html> before first paint.

(function () {
  var root = document.documentElement;
  var btn = document.getElementById('theme-toggle');
  if (!btn) return;

  function current() {
    return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
  }

  // Sync aria-pressed with whatever the anti-flash script already set.
  btn.setAttribute('aria-pressed', current() === 'dark' ? 'true' : 'false');

  btn.addEventListener('click', function () {
    setTheme(current() === 'dark' ? 'light' : 'dark');
  });

  // If the user hasn't picked a theme on this device yet, follow the OS setting live.
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
})();
