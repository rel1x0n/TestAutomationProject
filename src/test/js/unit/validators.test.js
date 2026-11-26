'use strict';
const { isValidEmail, validateRegistration } = require('../../../main/lib/validators');
const cases = require('../../resources/registration_cases.json');

describe('Валідація форми реєстрації', () => {
  test.each([
    ['ivan@example.com', true],
    ['olena.petrenko@tnpu.edu.ua', true],
    ['ivan.example.com', false],
    ['ivan@example', false],
    ['', false],
  ])('[critical] isValidEmail(%p) → %p', (email, expected) => {
    expect(isValidEmail(email)).toBe(expected);
  });

  test.each(cases)('[major] $id: $scenario', ({ name, email, password, expected }) => {
    const r = validateRegistration({ name, email, password });
    if (expected === 'success') {
      expect(r.valid).toBe(true);
    } else {
      expect(r.valid).toBe(false);
      expect(Object.keys(r.errors).sort()).toEqual(expected.split(',').sort());
    }
  });
});
