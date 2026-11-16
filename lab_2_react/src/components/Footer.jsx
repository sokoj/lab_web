import { useEffect, useState } from 'react';
import { readStorage, saveSystemInfo } from '../utils/systemInfo';

function Footer() {
  // Стан: пари [ключ, значення], прочитані з localStorage
  const [items, setItems] = useState([]);

  // Один раз після появи компонента: зберегти дані системи й прочитати їх назад
  useEffect(() => {
    saveSystemInfo();        // navigator.userAgent, navigator.platform та інше -> localStorage
    setItems(readStorage()); // localStorage -> стан -> JSX
  }, []);

  return (
    <footer className="bg-slate-800 dark:bg-slate-950 text-slate-300 py-4 px-4 text-sm">
      <p className="text-center">
        Пошта:{' '}
        <a href="mailto:denys@example.com" className="text-sky-300 hover:text-white hover:underline">
          denys@example.com
        </a>
      </p>

      <section className="max-w-4xl mx-auto mt-4 text-left text-xs">
        <h3 className="font-bold mb-2">Інформація про систему та браузер (localStorage)</h3>
        <dl className="grid grid-cols-[max-content_1fr] gap-x-4 gap-y-0.5">
          {items.map(([key, value]) => (
            <div key={key} className="contents">
              <dt className="font-semibold">{key}</dt>
              <dd className="break-all">{value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </footer>
  );
}

export default Footer;
