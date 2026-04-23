/**
 * Calculator – core arithmetic class with an expression evaluator.
 *
 * Supported operations:
 *   add, subtract, multiply, divide, modulo, power, sqrt
 *
 * The evaluate() method parses infix expressions that include:
 *   +  −  *  /  ^  ( )  unary minus  decimal numbers
 *
 * Parsing is done with a hand-written recursive-descent parser so there are
 * no dependencies on eval() or external libraries.
 */
export class Calculator {
  // ── Basic arithmetic ──────────────────────────────────────────────────────

  add(a: number, b: number): number {
    return a + b;
  }

  subtract(a: number, b: number): number {
    return a - b;
  }

  multiply(a: number, b: number): number {
    return a * b;
  }

  divide(a: number, b: number): number {
    if (b === 0) throw new Error('Division by zero');
    return a / b;
  }

  modulo(a: number, b: number): number {
    if (b === 0) throw new Error('Division by zero');
    return a % b;
  }

  power(base: number, exponent: number): number {
    return Math.pow(base, exponent);
  }

  sqrt(n: number): number {
    if (n < 0) throw new Error('Cannot take square root of a negative number');
    return Math.sqrt(n);
  }

  // ── Expression evaluator (recursive-descent parser) ───────────────────────

  /**
   * Evaluate an infix arithmetic expression and return the numeric result.
   *
   * Grammar (EBNF, precedence lowest → highest):
   *   expr   → term   ( ( '+' | '-' ) term   )*
   *   term   → factor ( ( '*' | '/' ) factor )*
   *   factor → base   ( '^' factor )*          (right-associative)
   *   base   → '-' base | '(' expr ')' | NUMBER
   */
  evaluate(expression: string): number {
    const tokens = this.tokenize(expression);
    const parser = new ExpressionParser(tokens);
    const result = parser.parseExpr();
    if (parser.pos < tokens.length) {
      throw new Error(`Unexpected token: "${tokens[parser.pos].value}"`);
    }
    return result;
  }

  private tokenize(input: string): Token[] {
    const tokens: Token[] = [];
    let i = 0;
    while (i < input.length) {
      const ch = input[i];

      // Skip whitespace
      if (/\s/.test(ch)) { i++; continue; }

      // Number (integer or decimal)
      if (/[0-9.]/.test(ch)) {
        let numStr = '';
        while (i < input.length && /[0-9.]/.test(input[i])) {
          numStr += input[i++];
        }
        const value = parseFloat(numStr);
        if (isNaN(value)) throw new Error(`Invalid number: "${numStr}"`);
        tokens.push({ type: 'NUMBER', value: numStr, numValue: value });
        continue;
      }

      // Operators and parentheses
      if ('+-*/^()'.includes(ch)) {
        tokens.push({ type: ch as TokenType, value: ch });
        i++;
        continue;
      }

      throw new Error(`Unknown character: "${ch}"`);
    }
    return tokens;
  }
}

// ── Token types ───────────────────────────────────────────────────────────────

type TokenType = 'NUMBER' | '+' | '-' | '*' | '/' | '^' | '(' | ')';

interface Token {
  type: TokenType;
  value: string;
  numValue?: number;
}

// ── Recursive-descent parser ──────────────────────────────────────────────────

class ExpressionParser {
  tokens: Token[];
  pos: number;

  constructor(tokens: Token[]) {
    this.tokens = tokens;
    this.pos = 0;
  }

  private peek(): Token | undefined {
    return this.tokens[this.pos];
  }

  private consume(type?: TokenType): Token {
    const tok = this.tokens[this.pos];
    if (!tok) throw new Error('Unexpected end of expression');
    if (type && tok.type !== type) {
      throw new Error(`Expected "${type}" but got "${tok.value}"`);
    }
    this.pos++;
    return tok;
  }

  /** expr → term ( ( '+' | '-' ) term )* */
  parseExpr(): number {
    let left = this.parseTerm();
    while (this.peek()?.type === '+' || this.peek()?.type === '-') {
      const op = this.consume().type;
      const right = this.parseTerm();
      left = op === '+' ? left + right : left - right;
    }
    return left;
  }

  /** term → factor ( ( '*' | '/' ) factor )* */
  private parseTerm(): number {
    let left = this.parseFactor();
    while (this.peek()?.type === '*' || this.peek()?.type === '/') {
      const op = this.consume().type;
      const right = this.parseFactor();
      if (op === '/') {
        if (right === 0) throw new Error('Division by zero');
        left = left / right;
      } else {
        left = left * right;
      }
    }
    return left;
  }

  /** factor → base ( '^' factor )*  (right-associative) */
  private parseFactor(): number {
    const base = this.parseBase();
    if (this.peek()?.type === '^') {
      this.consume('^');
      const exp = this.parseFactor(); // right-associative recursion
      return Math.pow(base, exp);
    }
    return base;
  }

  /** base → '-' base | '(' expr ')' | NUMBER */
  private parseBase(): number {
    const tok = this.peek();
    if (!tok) throw new Error('Unexpected end of expression');

    // Unary minus
    if (tok.type === '-') {
      this.consume('-');
      return -this.parseBase();
    }

    // Parenthesised sub-expression
    if (tok.type === '(') {
      this.consume('(');
      const val = this.parseExpr();
      this.consume(')');
      return val;
    }

    // Number literal
    if (tok.type === 'NUMBER') {
      this.consume('NUMBER');
      return tok.numValue!;
    }

    throw new Error(`Unexpected token: "${tok.value}"`);
  }
}
