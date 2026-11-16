// Лаб. 4: збираємо інформацію про ОС і браузер та зберігаємо в localStorage

export function collectSystemInfo() {
  const info = {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    vendor: navigator.vendor,
    language: navigator.language,
    languages: (navigator.languages || []).join(', '),
    cookieEnabled: String(navigator.cookieEnabled),
    onLine: String(navigator.onLine),
    hardwareConcurrency: String(navigator.hardwareConcurrency ?? 'н/д'),
    deviceMemory: String(navigator.deviceMemory ?? 'н/д'),
    screen: `${screen.width}x${screen.height}`,
    colorDepth: String(screen.colorDepth),
    pixelRatio: String(window.devicePixelRatio),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };

  // Сучасний спосіб (є не в усіх браузерах)
  if (navigator.userAgentData) {
    info.uaPlatform = navigator.userAgentData.platform;
    info.uaMobile = String(navigator.userAgentData.mobile);
    info.uaBrands = navigator.userAgentData.brands
      .map((b) => `${b.brand} ${b.version}`)
      .join(', ');
  }
  return info;
}

// Кожне значення — окремий запис localStorage з префіксом sys_
export function saveSystemInfo() {
  for (const [key, value] of Object.entries(collectSystemInfo())) {
    localStorage.setItem('sys_' + key, value);
  }
}

// Повертає ВСЕ, що зараз лежить у localStorage, як масив пар [ключ, значення]
export function readStorage() {
  const entries = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    entries.push([key, localStorage.getItem(key)]);
  }
  return entries;
}
