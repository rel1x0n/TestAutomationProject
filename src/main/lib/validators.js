'use strict';
/** Правила валідації форми реєстрації (спільні для сервера і тестів). */
// Навмисно спрощений шаблон першої версії: не перевіряє наявність домену верхнього рівня.
// Помилку знайдено і виправлено в ЛР8 (див. EMAIL_RE_V2).
const EMAIL_RE_V1 = /^[^\s@]+@[^\s@]+$/;
const EMAIL_RE_V2 = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const EMAIL_RE = process.env.VALIDATOR_VERSION === '1' ? EMAIL_RE_V1 : EMAIL_RE_V2;

function isValidEmail(email) {
  return typeof email === 'string' && EMAIL_RE.test(email.trim());
}

function validateRegistration({ name, email, password } = {}) {
  const errors = {};
  if (!name || !String(name).trim()) errors.name = "Поле «Ім'я» є обов'язковим";
  if (!email || !String(email).trim()) errors.email = "Поле «Email» є обов'язковим";
  else if (!isValidEmail(email)) errors.email = 'Некоректний формат email';
  if (!password) errors.password = "Поле «Пароль» є обов'язковим";
  else if (String(password).length < 6) errors.password = 'Пароль має містити щонайменше 6 символів';
  return { valid: Object.keys(errors).length === 0, errors };
}

module.exports = { isValidEmail, validateRegistration };
