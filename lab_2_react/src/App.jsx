import { useEffect, useState } from 'react';
import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Education from './components/Education';
import Reviews from './components/Reviews';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import { DAY_START_HOUR, NIGHT_START_HOUR } from './config';

// 07:00–21:00 -> 'light', увесь інший час -> 'dark'
function getThemeByTime() {
  const hours = new Date().getHours(); // 0–23
  return hours >= DAY_START_HOUR && hours < NIGHT_START_HOUR ? 'light' : 'dark';
}

function App() {
  // Стан теми. Початкове значення одразу змінить useEffect нижче
  const [theme, setTheme] = useState('light');

  // Автоматичний вибір теми за часом доби
  useEffect(() => {
    let period = getThemeByTime();
    setTheme(period); // при завантаженні перевіряємо поточний час

    // Раз на хвилину: коли настає 07:00 або 21:00, тема міняється сама
    const id = setInterval(() => {
      const now = getThemeByTime();
      if (now !== period) {
        period = now;
        setTheme(now);
      }
    }, 60 * 1000);

    return () => clearInterval(id); // прибираємо таймер при розмонтуванні
  }, []);

  // Ручне перемикання (кнопка у Header)
  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    // Клас "dark" на головній обгортці вмикає всі dark:… стилі всередині
    <div
      className={`${theme === 'dark' ? 'dark' : ''} min-h-screen flex flex-col bg-slate-100 text-slate-800 dark:bg-slate-900 dark:text-slate-200 transition-colors`}
    >
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main className="flex-1 w-full max-w-4xl mx-auto p-4 md:p-8 grid gap-6 md:grid-cols-2">
        <About />
        <Skills />
        <Experience />
        <Education />
        <Reviews />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
