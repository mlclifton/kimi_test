export interface HistoryEntry {
  operation: string;
  operands: number[];
  result: number;
}

export class Calculator {
  private history: HistoryEntry[] = [];

  private record(operation: string, operands: number[], result: number): number {
    this.history.push({ operation, operands, result });
    return result;
  }

  add(a: number, b: number): number {
    return this.record('add', [a, b], a + b);
  }

  subtract(a: number, b: number): number {
    return this.record('subtract', [a, b], a - b);
  }

  multiply(a: number, b: number): number {
    return this.record('multiply', [a, b], a * b);
  }

  divide(a: number, b: number): number {
    if (b === 0) {
      throw new Error('Division by zero');
    }
    return this.record('divide', [a, b], a / b);
  }

  sum(numbers: number[]): number {
    const result = numbers.reduce((acc, n) => acc + n, 0);
    return this.record('sum', numbers, result);
  }

  product(numbers: number[]): number {
    const result = numbers.reduce((acc, n) => acc * n, 1);
    return this.record('product', numbers, result);
  }

  average(numbers: number[]): number {
    if (numbers.length === 0) {
      throw new Error('Cannot calculate average of empty array');
    }
    const result = numbers.reduce((acc, n) => acc + n, 0) / numbers.length;
    return this.record('average', numbers, result);
  }

  power(base: number, exponent: number): number {
    return this.record('power', [base, exponent], Math.pow(base, exponent));
  }

  sqrt(n: number): number {
    if (n < 0) {
      throw new Error('Cannot calculate square root of negative number');
    }
    return this.record('sqrt', [n], Math.sqrt(n));
  }

  abs(n: number): number {
    return this.record('abs', [n], Math.abs(n));
  }

  modulo(a: number, b: number): number {
    if (b === 0) {
      throw new Error('Modulo by zero');
    }
    return this.record('modulo', [a, b], a % b);
  }

  getHistory(): HistoryEntry[] {
    return [...this.history];
  }

  clearHistory(): void {
    this.history = [];
  }

  getLastResult(): number | undefined {
    if (this.history.length === 0) {
      return undefined;
    }
    return this.history[this.history.length - 1].result;
  }
}

type Token =
  | { type: 'NUMBER'; value: number }
  | { type: 'OPERATOR'; value: string }
  | { type: 'LPAREN' }
  | { type: 'RPAREN' };

export class ExpressionParser {
  private calculator = new Calculator();

  evaluate(expression: string): number {
    const trimmed = expression.trim();
    if (trimmed.length === 0) {
      throw new Error('Empty expression');
    }
    const tokens = this.tokenize(trimmed);
    const { result } = this.parseExpression(tokens, 0);
    return result;
  }

  private tokenize(expression: string): Token[] {
    const tokens: Token[] = [];
    let i = 0;

    while (i < expression.length) {
      const char = expression[i];

      if (char === ' ' || char === '\t') {
        i++;
        continue;
      }

      if (char === '(') {
        tokens.push({ type: 'LPAREN' });
        i++;
        continue;
      }

      if (char === ')') {
        tokens.push({ type: 'RPAREN' });
        i++;
        continue;
      }

      if (/[0-9.]/.test(char)) {
        let numStr = '';
        let dotCount = 0;
        while (i < expression.length && (/[0-9.]/.test(expression[i]))) {
          if (expression[i] === '.') {
            dotCount++;
            if (dotCount > 1) {
              throw new Error('Invalid number format');
            }
          }
          numStr += expression[i];
          i++;
        }
        tokens.push({ type: 'NUMBER', value: parseFloat(numStr) });
        continue;
      }

      if (char === '+' || char === '-' || char === '*' || char === '/') {
        // Handle unary minus/plus
        const isUnary =
          tokens.length === 0 ||
          tokens[tokens.length - 1].type === 'OPERATOR' ||
          tokens[tokens.length - 1].type === 'LPAREN';

        if (isUnary && char === '-') {
          // Unary minus: negate the next number
          let numStr = '';
          let dotCount = 0;
          i++;
          while (i < expression.length && expression[i] === ' ') i++;
          while (i < expression.length && (/[0-9.]/.test(expression[i]))) {
            if (expression[i] === '.') {
              dotCount++;
              if (dotCount > 1) throw new Error('Invalid number format');
            }
            numStr += expression[i];
            i++;
          }
          if (numStr === '') {
            throw new Error('Invalid syntax');
          }
          tokens.push({ type: 'NUMBER', value: -parseFloat(numStr) });
          continue;
        }

        if (isUnary && char === '+') {
          i++;
          continue; // Unary plus is a no-op
        }

        tokens.push({ type: 'OPERATOR', value: char });
        i++;
        continue;
      }

      throw new Error(`Invalid character: ${char}`);
    }

    return tokens;
  }

  private parseExpression(
    tokens: Token[],
    index: number
  ): { result: number; nextIndex: number } {
    let { result: left, nextIndex: i } = this.parseTerm(tokens, index);

    while (i < tokens.length && tokens[i].type === 'OPERATOR') {
      const token = tokens[i] as Extract<Token, { type: 'OPERATOR' }>;
      if (token.value !== '+' && token.value !== '-') break;
      const op = token.value;
      i++;
      const { result: right, nextIndex: nextI } = this.parseTerm(tokens, i);
      i = nextI;
      if (op === '+') {
        left = this.calculator.add(left, right);
      } else {
        left = this.calculator.subtract(left, right);
      }
    }

    return { result: left, nextIndex: i };
  }

  private parseTerm(
    tokens: Token[],
    index: number
  ): { result: number; nextIndex: number } {
    let { result: left, nextIndex: i } = this.parseFactor(tokens, index);

    while (i < tokens.length && tokens[i].type === 'OPERATOR') {
      const token = tokens[i] as Extract<Token, { type: 'OPERATOR' }>;
      if (token.value !== '*' && token.value !== '/') break;
      const op = token.value;
      i++;
      const { result: right, nextIndex: nextI } = this.parseFactor(tokens, i);
      i = nextI;
      if (op === '*') {
        left = this.calculator.multiply(left, right);
      } else {
        left = this.calculator.divide(left, right);
      }
    }

    return { result: left, nextIndex: i };
  }

  private parseFactor(
    tokens: Token[],
    index: number
  ): { result: number; nextIndex: number } {
    if (index >= tokens.length) {
      throw new Error('Invalid syntax');
    }

    const token = tokens[index];

    if (token.type === 'NUMBER') {
      return { result: token.value, nextIndex: index + 1 };
    }

    if (token.type === 'LPAREN') {
      const { result, nextIndex } = this.parseExpression(tokens, index + 1);
      if (nextIndex >= tokens.length || tokens[nextIndex].type !== 'RPAREN') {
        throw new Error('Mismatched parentheses');
      }
      return { result, nextIndex: nextIndex + 1 };
    }

    throw new Error('Invalid syntax');
  }
}
