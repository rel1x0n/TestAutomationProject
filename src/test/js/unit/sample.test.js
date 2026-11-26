'use strict';
const data = require('../../resources/test_data.json');
const { square } = require('../../../main/lib/calculator');

describe('Базовий тест проєкту', () => {
  test('[critical] 2 + 3 має дорівнювати 5', () => {
    expect(2 + 3).toBe(5);
  });

  test.each(data)('[major] квадрат числа $input дорівнює $expected (дані з test_data.json)', ({ input, expected }) => {
    expect(square(input)).toBe(expected);
  });
});
