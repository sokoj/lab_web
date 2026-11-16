// Кнопка ручного перемикання теми.
// Отримує поточну тему (theme) і функцію перемикання (onToggle) від App.jsx
function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="absolute top-4 right-4 rounded-full border border-white/40 bg-white/15 px-4 py-1 text-sm hover:bg-white/30 transition-colors cursor-pointer"
    >
      {theme === 'dark' ? '☀️ Денна тема' : '🌙 Нічна тема'}
    </button>
  );
}

export default ThemeToggle;
