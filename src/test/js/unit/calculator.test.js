'use strict';
const calc = require('../../../main/lib/calculator');
const cases = require('../../resources/calc_data.json');

describe('Calculator (Jest)', () => {
  let started;
  beforeAll(() => { started = Date.now(); });            // підготовка середовища
  afterAll(() => { console.log(`Calculator suite: ${Date.now() - started} ms`); });

  test('[critical] додавання: 2 + 3 = 5', () => {
    expect(calc.add(2, 3)).toBe(5);
  });

  test('[critical] множення: 3 * 4 = 12', () => {
    expect(calc.multiply(3, 4)).toBe(12);
  });

  test('[major] ділення на нуль викидає помилку', () => {
    expect(() => calc.divide(10, 0)).toThrow('Ділення на нуль неможливе');
  });

  test('[minor] віднімання і ділення', () => {
    expect(calc.subtract(10, 4)).toBe(6);
    expect(calc.divide(9, 3)).toBe(3);
  });

  describe('data-driven: набори з calc_data.json', () => {
    test.each(cases)('[major] add($a, $b) = $sum', ({ a, b, sum }) => {
      expect(calc.add(a, b)).toBeCloseTo(sum);
    });
    test.each(cases)('[major] multiply($a, $b) = $product', ({ a, b, product }) => {
      expect(calc.multiply(a, b)).toBeCloseTo(product);
    });
  });
});
