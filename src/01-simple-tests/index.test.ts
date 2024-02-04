import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 2, b: 2, action: Action.Add });
    expect(result).toBe(4);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 2, b: 2, action: Action.Subtract });
    expect(result).toBe(0);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 2, b: 5, action: Action.Multiply });
    expect(result).toBe(10);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 6, b: 2, action: Action.Divide });
    expect(result).toBe(3);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 6,
      b: 2,
      action: Action.Exponentiate,
    });
    expect(result).toBe(36);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({
      a: 6,
      b: 2,
      action: 'invalid',
    });
    expect(result).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({
      a: 6,
      b: 'invalid',
      action: Action.Exponentiate,
    });
    expect(result).toBe(null);
  });
});
