// Inline script that runs before paint to apply the saved theme class to <html>.
// Prevents the flash-of-light-theme on dark-mode users when the page first loads.

const SCRIPT = `
(function() {
  try {
    var stored = localStorage.getItem('tc-theme');
    var prefers = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored || (prefers ? 'dark' : 'light');
    if (theme === 'dark') document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`.trim();

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />;
}
