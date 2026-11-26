'use strict';
// Застарілий набір першої версії: дублює перевірки з unit/validators.test.js.
// Під час оптимізації (ЛР8) виключений із запуску, залишений для порівняння.
const { isValidEmail, validateRegistration } = require('../../../main/lib/validators');

describe('Legacy: валідація email', () => {
  test('коректний email', () => { expect(isValidEmail('ivan@example.com')).toBe(true); });
  test('email без @', () => { expect(isValidEmail('ivan.example.com')).toBe(false); });
  test('порожній email', () => { expect(isValidEmail('')).toBe(false); });
  test('коректна форма', () => { expect(validateRegistration({ name: 'Ivan', email: 'ivan@example.com', password: '123456' }).valid).toBe(true); });
  test('порожнє ім\'я', () => { expect(validateRegistration({ name: '', email: 'ivan@example.com', password: '123456' }).errors.name).toBeDefined(); });
  test('короткий пароль', () => { expect(validateRegistration({ name: 'Ivan', email: 'ivan@example.com', password: '123' }).errors.password).toBeDefined(); });
});
