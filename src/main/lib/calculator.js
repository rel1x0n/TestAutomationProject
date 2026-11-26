'use strict';
/** Простий калькулятор — об'єкт модульного тестування. */
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
  if (b === 0) throw new Error('Ділення на нуль неможливе');
  return a / b;
}
function square(x) { return x * x; }
module.exports = { add, subtract, multiply, divide, square };
