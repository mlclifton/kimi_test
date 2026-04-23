import { Calculator } from './calculator';

describe('Calculator', () => {
  let calc: Calculator;

  beforeEach(() => {
    calc = new Calculator();
  });

  // ── Addition ──────────────────────────────────────────────────────────────
  describe('add', () => {
    it('adds two positive numbers', () => {
      expect(calc.add(2, 3)).toBe(5);
    });

    it('adds a positive and a negative number', () => {
      expect(calc.add(10, -4)).toBe(6);
    });

    it('adds two negative numbers', () => {
      expect(calc.add(-3, -7)).toBe(-10);
    });

    it('adds floating-point numbers', () => {
      expect(calc.add(0.1, 0.2)).toBeCloseTo(0.3);
    });

    it('adds zero', () => {
      expect(calc.add(5, 0)).toBe(5);
    });
  });

  // ── Subtraction ──────────────────────────────────────────────────────────
  describe('subtract', () => {
    it('subtracts two positive numbers', () => {
      expect(calc.subtract(10, 4)).toBe(6);
    });

    it('subtracts resulting in a negative', () => {
      expect(calc.subtract(3, 8)).toBe(-5);
    });

    it('subtracts negative from positive', () => {
      expect(calc.subtract(5, -3)).toBe(8);
    });

    it('subtracts floating-point numbers', () => {
      expect(calc.subtract(1.5, 0.5)).toBeCloseTo(1.0);
    });

    it('subtracts zero', () => {
      expect(calc.subtract(7, 0)).toBe(7);
    });
  });

  // ── Multiplication ────────────────────────────────────────────────────────
  describe('multiply', () => {
    it('multiplies two positive numbers', () => {
      expect(calc.multiply(3, 4)).toBe(12);
    });

    it('multiplies by zero', () => {
      expect(calc.multiply(100, 0)).toBe(0);
    });

    it('multiplies by one', () => {
      expect(calc.multiply(7, 1)).toBe(7);
    });

    it('multiplies two negative numbers', () => {
      expect(calc.multiply(-3, -4)).toBe(12);
    });

    it('multiplies a positive and a negative number', () => {
      expect(calc.multiply(5, -2)).toBe(-10);
    });

    it('multiplies floating-point numbers', () => {
      expect(calc.multiply(0.5, 0.4)).toBeCloseTo(0.2);
    });
  });

  // ── Division ──────────────────────────────────────────────────────────────
  describe('divide', () => {
    it('divides two positive numbers', () => {
      expect(calc.divide(10, 2)).toBe(5);
    });

    it('divides resulting in a decimal', () => {
      expect(calc.divide(1, 3)).toBeCloseTo(0.3333, 4);
    });

    it('divides a negative by a positive', () => {
      expect(calc.divide(-9, 3)).toBe(-3);
    });

    it('divides two negative numbers', () => {
      expect(calc.divide(-8, -2)).toBe(4);
    });

    it('divides zero by a number', () => {
      expect(calc.divide(0, 5)).toBe(0);
    });

    it('throws an error when dividing by zero', () => {
      expect(() => calc.divide(5, 0)).toThrow('Division by zero');
    });
  });

  // ── Modulo ────────────────────────────────────────────────────────────────
  describe('modulo', () => {
    it('returns remainder for two positive numbers', () => {
      expect(calc.modulo(10, 3)).toBe(1);
    });

    it('returns 0 when evenly divisible', () => {
      expect(calc.modulo(9, 3)).toBe(0);
    });

    it('handles negative dividend', () => {
      expect(calc.modulo(-7, 3)).toBe(-1);
    });

    it('throws an error when divisor is zero', () => {
      expect(() => calc.modulo(5, 0)).toThrow('Division by zero');
    });
  });

  // ── Power ─────────────────────────────────────────────────────────────────
  describe('power', () => {
    it('raises a number to a positive exponent', () => {
      expect(calc.power(2, 10)).toBe(1024);
    });

    it('raises a number to the power of 0', () => {
      expect(calc.power(999, 0)).toBe(1);
    });

    it('raises a number to the power of 1', () => {
      expect(calc.power(7, 1)).toBe(7);
    });

    it('raises a number to a negative exponent', () => {
      expect(calc.power(2, -2)).toBeCloseTo(0.25);
    });

    it('handles base 0', () => {
      expect(calc.power(0, 5)).toBe(0);
    });

    it('handles fractional exponent (square root)', () => {
      expect(calc.power(9, 0.5)).toBeCloseTo(3);
    });
  });

  // ── Square Root ───────────────────────────────────────────────────────────
  describe('sqrt', () => {
    it('returns the square root of a positive number', () => {
      expect(calc.sqrt(25)).toBe(5);
    });

    it('returns the square root of zero', () => {
      expect(calc.sqrt(0)).toBe(0);
    });

    it('returns a decimal square root', () => {
      expect(calc.sqrt(2)).toBeCloseTo(1.4142, 4);
    });

    it('throws an error for negative input', () => {
      expect(() => calc.sqrt(-1)).toThrow('Cannot take square root of a negative number');
    });
  });

  // ── Expression Parser ─────────────────────────────────────────────────────
  describe('evaluate', () => {
    it('evaluates a simple addition expression', () => {
      expect(calc.evaluate('3 + 4')).toBe(7);
    });

    it('evaluates a subtraction expression', () => {
      expect(calc.evaluate('10 - 3')).toBe(7);
    });

    it('evaluates a multiplication expression', () => {
      expect(calc.evaluate('6 * 7')).toBe(42);
    });

    it('evaluates a division expression', () => {
      expect(calc.evaluate('15 / 3')).toBe(5);
    });

    it('respects operator precedence (* before +)', () => {
      expect(calc.evaluate('2 + 3 * 4')).toBe(14);
    });

    it('respects operator precedence (/ before -)', () => {
      expect(calc.evaluate('10 - 8 / 2')).toBe(6);
    });

    it('handles parentheses', () => {
      expect(calc.evaluate('(2 + 3) * 4')).toBe(20);
    });

    it('handles nested parentheses', () => {
      expect(calc.evaluate('((1 + 2) * (3 + 4))')).toBe(21);
    });

    it('handles unary minus', () => {
      expect(calc.evaluate('-5 + 10')).toBe(5);
    });

    it('handles decimal numbers', () => {
      expect(calc.evaluate('1.5 + 2.5')).toBeCloseTo(4);
    });

    it('evaluates exponentiation with ^', () => {
      expect(calc.evaluate('2 ^ 8')).toBe(256);
    });

    it('throws on invalid expression', () => {
      expect(() => calc.evaluate('2 +')).toThrow();
    });

    it('throws on unknown characters', () => {
      expect(() => calc.evaluate('2 @ 3')).toThrow();
    });
  });
});
