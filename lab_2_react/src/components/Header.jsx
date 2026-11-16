import ThemeToggle from './ThemeToggle';

function Header({ theme, onToggleTheme }) {
  return (
    <header className="relative flex flex-col items-center bg-gradient-to-r from-brand to-blue-500 dark:from-slate-950 dark:to-indigo-900 text-white p-8 shadow-lg">
      <ThemeToggle theme={theme} onToggle={onToggleTheme} />

      <h1 className="font-display text-4xl md:text-5xl font-bold tracking-wide mb-2 mt-6 md:mt-0">
        Денис Дубковецький
      </h1>
      <p className="text-xl opacity-90">Студент ІКТА, група КБ-209</p>
    </header>
  );
}

export default Header;
