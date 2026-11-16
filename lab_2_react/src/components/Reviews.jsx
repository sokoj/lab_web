import { useEffect, useState } from 'react';
import { VARIANT } from '../config';

function Reviews() {
  // Стан: список коментарів, прапорець завантаження і текст помилки.
  // Звичайна змінна не підійде: React не знав би, що треба перемалювати компонент
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // [] — запит виконується один раз, коли компонент з'явився на сторінці
  useEffect(() => {
    let ignore = false; // захист: не оновлювати стан, якщо компонент уже зник

    async function loadComments() {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${VARIANT}/comments`
        );
        if (!response.ok) {
          throw new Error('Сервер відповів зі статусом ' + response.status);
        }
        const data = await response.json();
        if (!ignore) setComments(data);
      } catch (err) {
        if (!ignore) setError(err.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    loadComments();
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section className="md:col-span-2 bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border-t-4 border-rose-500">
      <h2 className="text-2xl font-bold text-rose-600 dark:text-rose-300 mb-3">
        Відгуки попередніх роботодавців
      </h2>

      {loading && <p>Завантаження відгуків…</p>}
      {error && <p className="text-red-600 dark:text-red-400">Не вдалося завантажити відгуки: {error}</p>}

      <div className="grid gap-4">
        {/* .map() створює картку для кожного коментаря у порядку отримання */}
        {comments.map((comment) => (
          <article
            key={comment.id}
            className="rounded-lg border border-slate-200 dark:border-slate-600 border-l-4 border-l-rose-500 p-4"
          >
            <h3 className="font-bold capitalize">{comment.name}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-2">{comment.email}</p>
            <p className="whitespace-pre-line">{comment.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Reviews;
