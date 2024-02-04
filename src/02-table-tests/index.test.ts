import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 2, b: 2, action: Action.Subtract, expected: 0 },
  { a: 13, b: 2, action: Action.Subtract, expected: 11 },
  { a: 12, b: 2, action: Action.Divide, expected: 6 },
  { a: 10, b: 5, action: Action.Divide, expected: 2 },
  { a: 100, b: 2, action: Action.Divide, expected: 50 },
  { a: 100, b: 2, action: Action.Multiply, expected: 200 },
  { a: 70, b: 2, action: Action.Multiply, expected: 140 },
  { a: 1, b: 2, action: Action.Multiply, expected: 2 },
  { a: 6, b: 2, action: Action.Exponentiate, expected: 36 },
  { a: 1, b: 2, action: Action.Exponentiate, expected: 1 },
  { a: 5, b: 3, action: Action.Exponentiate, expected: 125 },
  { a: 5, b: 3, action: 'invalid', expected: null },
  { a: 'invalid', b: 3, action: Action.Multiply, expected: null },
  { a: 5, b: 'invalid', action: Action.Multiply, expected: null },
];

describe.each(testCases)('simpleCalculator', ({ a, b, action, expected }) => {
  test(`${a} ${action} ${b} should ${expected}`, () => {
    const result = simpleCalculator({ a, b, action });
    expect(result).toBe(expected);
  });
});
