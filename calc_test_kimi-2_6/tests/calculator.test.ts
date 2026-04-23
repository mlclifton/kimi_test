import { Calculator, ExpressionParser } from '../src/calculator';

describe('Calculator', () => {
  let calculator: Calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  describe('basic arithmetic', () => {
    test('adds two positive numbers', () => {
      expect(calculator.add(2, 3)).toBe(5);
    });

    test('adds negative numbers', () => {
      expect(calculator.add(-2, -3)).toBe(-5);
    });

    test('adds mixed sign numbers', () => {
      expect(calculator.add(-2, 3)).toBe(1);
    });

    test('subtracts two numbers', () => {
      expect(calculator.subtract(5, 3)).toBe(2);
    });

    test('subtracts to get negative result', () => {
      expect(calculator.subtract(3, 5)).toBe(-2);
    });

    test('multiplies two numbers', () => {
      expect(calculator.multiply(4, 5)).toBe(20);
    });

    test('multiplies with negative numbers', () => {
      expect(calculator.multiply(-4, 5)).toBe(-20);
    });

    test('multiplies two negative numbers', () => {
      expect(calculator.multiply(-4, -5)).toBe(20);
    });

    test('multiplies by zero', () => {
      expect(calculator.multiply(10, 0)).toBe(0);
    });

    test('divides two numbers', () => {
      expect(calculator.divide(10, 2)).toBe(5);
    });

    test('divides to get decimal result', () => {
      expect(calculator.divide(5, 2)).toBe(2.5);
    });

    test('divides negative numbers', () => {
      expect(calculator.divide(-10, 2)).toBe(-5);
    });

    test('divides by negative number', () => {
      expect(calculator.divide(10, -2)).toBe(-5);
    });

    test('throws error on division by zero', () => {
      expect(() => calculator.divide(10, 0)).toThrow('Division by zero');
    });
  });

  describe('chained operations', () => {
    test('calculates sum of array', () => {
      expect(calculator.sum([1, 2, 3, 4, 5])).toBe(15);
    });

    test('sum of empty array is zero', () => {
      expect(calculator.sum([])).toBe(0);
    });

    test('calculates product of array', () => {
      expect(calculator.product([2, 3, 4])).toBe(24);
    });

    test('product of empty array is one', () => {
      expect(calculator.product([])).toBe(1);
    });

    test('calculates average of array', () => {
      expect(calculator.average([2, 4, 6])).toBe(4);
    });

    test('throws error on average of empty array', () => {
      expect(() => calculator.average([])).toThrow('Cannot calculate average of empty array');
    });
  });

  describe('advanced operations', () => {
    test('calculates power', () => {
      expect(calculator.power(2, 3)).toBe(8);
    });

    test('power with zero exponent', () => {
      expect(calculator.power(5, 0)).toBe(1);
    });

    test('calculates square root', () => {
      expect(calculator.sqrt(16)).toBe(4);
    });

    test('throws error on square root of negative number', () => {
      expect(() => calculator.sqrt(-1)).toThrow('Cannot calculate square root of negative number');
    });

    test('calculates absolute value', () => {
      expect(calculator.abs(-5)).toBe(5);
    });

    test('calculates absolute value of positive number', () => {
      expect(calculator.abs(5)).toBe(5);
    });

    test('calculates modulo', () => {
      expect(calculator.modulo(10, 3)).toBe(1);
    });

    test('throws error on modulo by zero', () => {
      expect(() => calculator.modulo(10, 0)).toThrow('Modulo by zero');
    });
  });

  describe('history', () => {
    test('records operation history', () => {
      calculator.add(1, 2);
      calculator.multiply(3, 4);
      const history = calculator.getHistory();
      expect(history).toHaveLength(2);
      expect(history[0]).toEqual({ operation: 'add', operands: [1, 2], result: 3 });
      expect(history[1]).toEqual({ operation: 'multiply', operands: [3, 4], result: 12 });
    });

    test('clears history', () => {
      calculator.add(1, 2);
      calculator.clearHistory();
      expect(calculator.getHistory()).toHaveLength(0);
    });

    test('returns last result', () => {
      calculator.add(5, 5);
      expect(calculator.getLastResult()).toBe(10);
    });

    test('returns undefined for last result when no operations', () => {
      expect(calculator.getLastResult()).toBeUndefined();
    });
  });
});

describe('ExpressionParser', () => {
  let parser: ExpressionParser;

  beforeEach(() => {
    parser = new ExpressionParser();
  });

  describe('simple expressions', () => {
    test('parses addition', () => {
      expect(parser.evaluate('2 + 3')).toBe(5);
    });

    test('parses subtraction', () => {
      expect(parser.evaluate('10 - 4')).toBe(6);
    });

    test('parses multiplication', () => {
      expect(parser.evaluate('3 * 4')).toBe(12);
    });

    test('parses division', () => {
      expect(parser.evaluate('12 / 3')).toBe(4);
    });

    test('handles whitespace variations', () => {
      expect(parser.evaluate('2+3')).toBe(5);
      expect(parser.evaluate('2 +3')).toBe(5);
      expect(parser.evaluate('2+ 3')).toBe(5);
      expect(parser.evaluate('  2  +  3  ')).toBe(5);
    });

    test('handles negative numbers', () => {
      expect(parser.evaluate('-5 + 3')).toBe(-2);
      expect(parser.evaluate('5 + -3')).toBe(2);
    });

    test('handles decimal numbers', () => {
      expect(parser.evaluate('2.5 + 1.5')).toBe(4);
      expect(parser.evaluate('5.5 * 2')).toBe(11);
    });
  });

  describe('operator precedence', () => {
    test('multiplication before addition', () => {
      expect(parser.evaluate('2 + 3 * 4')).toBe(14);
    });

    test('division before subtraction', () => {
      expect(parser.evaluate('10 - 6 / 2')).toBe(7);
    });

    test('mixed precedence', () => {
      expect(parser.evaluate('2 + 3 * 4 - 5')).toBe(9);
    });

    test('left-to-right for same precedence', () => {
      expect(parser.evaluate('10 - 3 + 2')).toBe(9);
      expect(parser.evaluate('12 / 3 * 2')).toBe(8);
    });
  });

  describe('parentheses', () => {
    test('overrides precedence with parentheses', () => {
      expect(parser.evaluate('(2 + 3) * 4')).toBe(20);
    });

    test('nested parentheses', () => {
      expect(parser.evaluate('((2 + 3) * 2) + 1')).toBe(11);
    });

    test('multiple parentheses groups', () => {
      expect(parser.evaluate('(1 + 2) * (3 + 4)')).toBe(21);
    });
  });

  describe('error handling', () => {
    test('throws on division by zero', () => {
      expect(() => parser.evaluate('10 / 0')).toThrow('Division by zero');
    });

    test('throws on empty expression', () => {
      expect(() => parser.evaluate('')).toThrow('Empty expression');
    });

    test('throws on invalid characters', () => {
      expect(() => parser.evaluate('2 + a')).toThrow('Invalid character');
    });

    test('throws on mismatched parentheses', () => {
      expect(() => parser.evaluate('(2 + 3')).toThrow('Mismatched parentheses');
    });

    test('throws on invalid syntax', () => {
      expect(() => parser.evaluate('2 + * 3')).toThrow('Invalid syntax');
    });
  });
});
