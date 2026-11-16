/* =========================================================
   Лабораторна №4. Частина 1. script.js
   1. localStorage: інформація про ОС/браузер + показ у футері
   2. fetch: коментарі з JSONPlaceholder
   3. Модальне вікно з формою через 1 хвилину
   4. Нічна/денна тема (авто за часом + кнопка)
   ========================================================= */

/* ---------- Налаштування (змінюйте тільки тут) ---------- */
const VARIANT = 4;               // ваш номер у журналі групи
const MODAL_DELAY_MS = 60 * 1000; // 1 хвилина. Для перевірки поставте, напр., 5 * 1000
const DAY_START_HOUR = 7;         // денна тема з 07:00
const NIGHT_START_HOUR = 21;      // нічна тема з 21:00

/* =========================================================
   1. LOCALSTORAGE: ОС і браузер
   ========================================================= */

// Збираємо все, що браузер дозволяє дізнатися про систему
function collectSystemInfo() {
  const info = {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    vendor: navigator.vendor,
    language: navigator.language,
    languages: (navigator.languages || []).join(", "),
    cookieEnabled: String(navigator.cookieEnabled),
    onLine: String(navigator.onLine),
    hardwareConcurrency: String(navigator.hardwareConcurrency ?? "н/д"),
    deviceMemory: String(navigator.deviceMemory ?? "н/д"),
    screen: `${screen.width}x${screen.height}`,
    colorDepth: String(screen.colorDepth),
    pixelRatio: String(window.devicePixelRatio),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };

  // Сучасний спосіб (є не в усіх браузерах): navigator.userAgentData
  if (navigator.userAgentData) {
    info.uaPlatform = navigator.userAgentData.platform;
    info.uaMobile = String(navigator.userAgentData.mobile);
    info.uaBrands = navigator.userAgentData.brands
      .map((b) => `${b.brand} ${b.version}`)
      .join(", ");
  }
  return info;
}

// Кожне значення — окремий запис у localStorage з префіксом sys_
function saveSystemInfo() {
  const info = collectSystemInfo();
  for (const [key, value] of Object.entries(info)) {
    localStorage.setItem("sys_" + key, value); // localStorage зберігає лише рядки
  }
}

// Малюємо у футері ВСЕ, що зараз лежить у localStorage
function renderStorageInfo() {
  const list = document.getElementById("storage-info-list");
  list.innerHTML = ""; // очищаємо перед повторним малюванням

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const dt = document.createElement("dt");
    const dd = document.createElement("dd");
    dt.textContent = key;                    // textContent — безпечно, без HTML
    dd.textContent = localStorage.getItem(key);
    list.append(dt, dd);
  }
}

/* =========================================================
   2. FETCH: коментарі попередніх роботодавців
   ========================================================= */
async function loadReviews() {
  const container = document.getElementById("reviews-list");
  const url = `https://jsonplaceholder.typicode.com/posts/${VARIANT}/comments`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Сервер відповів зі статусом " + response.status);
    }
    const comments = await response.json(); // масив об'єктів

    container.innerHTML = "";
    // forEach іде по масиву в порядку отримання
    comments.forEach((comment) => {
      const card = document.createElement("article");
      card.className = "review";

      const name = document.createElement("h3");
      name.className = "review__name";
      name.textContent = comment.name;

      const email = document.createElement("p");
      email.className = "review__email";
      email.textContent = comment.email;

      const body = document.createElement("p");
      body.className = "review__body";
      body.textContent = comment.body;

      card.append(name, email, body);
      container.append(card);
    });
  } catch (error) {
    container.textContent = "Не вдалося завантажити відгуки: " + error.message;
  }
}

/* =========================================================
   3. МОДАЛЬНЕ ВІКНО через 1 хвилину
   ========================================================= */
function setupFeedbackModal() {
  const modal = document.getElementById("feedback-modal");
  const closeBtn = document.getElementById("feedback-close");
  const openBtn = document.getElementById("open-feedback");

  function closeModal() {
    modal.close();
    sessionStorage.setItem("feedbackClosed", "1"); // автоматично більше не відкриваємо
  }

  // Кнопка «Написати» відкриває вікно будь-коли
  openBtn.addEventListener("click", () => modal.showModal());
  closeBtn.addEventListener("click", closeModal);
  // клік по затемненому фону (поза формою) теж закриває
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });
  // Esc закриває вікно — теж запам'ятовуємо
  modal.addEventListener("cancel", () => {
    sessionStorage.setItem("feedbackClosed", "1");
  });

  // Автоматичне відкриття через 1 хвилину, якщо користувач ще не закривав вікно в цій сесії
  if (sessionStorage.getItem("feedbackClosed") === "1") return;
  setTimeout(() => {
    if (!modal.open) modal.showModal(); // showModal() затемнює фон і дає Esc
  }, MODAL_DELAY_MS);
}

/* =========================================================
   4. ТЕМА: авто за часом + ручне перемикання
   ========================================================= */

// 07:00–21:00 -> light, увесь інший час -> dark
function getThemeByTime() {
  const hours = new Date().getHours(); // 0–23
  return hours >= DAY_START_HOUR && hours < NIGHT_START_HOUR ? "light" : "dark";
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const button = document.getElementById("theme-toggle");
  // на кнопці — те, на що тема перемкнеться після натискання
  button.textContent = theme === "dark" ? "☀️ Денна тема" : "🌙 Нічна тема";
}

function setupTheme() {
  let period = getThemeByTime();
  applyTheme(period);

  // Ручне перемикання
  document.getElementById("theme-toggle").addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    applyTheme(current === "dark" ? "light" : "dark");
  });

  // Раз на хвилину перевіряємо час: коли настає 07:00 або 21:00,
  // тема міняється автоматично (ручний вибір діє до найближчої такої межі)
  setInterval(() => {
    const now = getThemeByTime();
    if (now !== period) {
      period = now;
      applyTheme(now);
    }
  }, 60 * 1000);
}

/* =========================================================
   ЗАПУСК
   ========================================================= */
setupTheme();
saveSystemInfo();
renderStorageInfo();
loadReviews();
setupFeedbackModal();
