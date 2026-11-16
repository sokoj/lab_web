import { useEffect, useState } from 'react';
import { FORMSPREE_ENDPOINT, MODAL_DELAY_MS } from '../config';

function ContactForm() {
  // Вікно спочатку закрите. Якщо користувач уже закривав його в цій сесії — не відкриваємо знову
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('feedbackClosed') === '1') return;

    // Через 1 хвилину відкриваємо вікно
    const timerId = setTimeout(() => setIsOpen(true), MODAL_DELAY_MS);

    // Очищення: якщо компонент зникне раніше, таймер скасовується
    return () => clearTimeout(timerId);
  }, []);

  function closeModal() {
    setIsOpen(false);
    sessionStorage.setItem('feedbackClosed', '1'); // запам'ятовуємо до кінця сесії
  }

  const fieldClass =
    'mt-1 block w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 px-3 py-2';

  return (
    <section className="md:col-span-2 bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border-t-4 border-violet-500">
      <h2 className="text-2xl font-bold text-violet-600 dark:text-violet-300 mb-3">Зворотний зв'язок</h2>
      <p className="mb-4">
        Є питання чи пропозиція? Напишіть мені. Форма також відкривається автоматично через 1 хвилину.
      </p>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-lg bg-brand px-4 py-2 text-white hover:bg-indigo-700 cursor-pointer"
      >
        Написати
      </button>

      {/* Умовний рендеринг: поки isOpen === false, вікно не малюється */}
      {isOpen && (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="feedback-title"
    >
      <div className="w-full max-w-md rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 p-6 shadow-2xl">
        <h2 id="feedback-title" className="text-2xl font-bold mb-4">
          Зворотний зв'язок
        </h2>

        <form action={FORMSPREE_ENDPOINT} method="POST" className="space-y-3">
          <label className="block text-sm font-semibold">
            Ім'я
            <input type="text" name="name" required className={fieldClass} />
          </label>
          <label className="block text-sm font-semibold">
            Email
            <input type="email" name="email" required className={fieldClass} />
          </label>
          <label className="block text-sm font-semibold">
            Номер телефону
            <input type="tel" name="phone" className={fieldClass} />
          </label>
          <label className="block text-sm font-semibold">
            Повідомлення
            <textarea name="message" rows="4" required className={fieldClass} />
          </label>

          {/* службове поле Formspree: тема листа */}
          <input type="hidden" name="_subject" value="Відгук із сайту-резюме (Лаб. 4, React)" />

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={closeModal}
              className="rounded-lg border border-brand px-4 py-2 text-brand dark:text-indigo-300 dark:border-indigo-300 cursor-pointer"
            >
              Закрити
            </button>
            <button
              type="submit"
              className="rounded-lg bg-brand px-4 py-2 text-white hover:bg-indigo-700 cursor-pointer"
            >
              Надіслати
            </button>
          </div>
        </form>
      </div>
    </div>
      )}
    </section>
  );
}

export default ContactForm;
