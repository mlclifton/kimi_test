# Simple Terminal Calculator

A terminal-based calculator written in TypeScript. Supports both a **interactive REPL** and **one-shot** expression evaluation from the command line.

---

## Features

| Operation       | Method / Symbol       | Example              |
|-----------------|-----------------------|----------------------|
| Addition        | `add()` / `+`         | `3 + 4` → `7`        |
| Subtraction     | `subtract()` / `-`    | `10 - 4` → `6`       |
| Multiplication  | `multiply()` / `*`    | `6 * 7` → `42`       |
| Division        | `divide()` / `/`      | `15 / 3` → `5`       |
| Modulo          | `modulo()` / `%`      | `10 % 3` → `1`       |
| Exponentiation  | `power()` / `^`       | `2 ^ 10` → `1024`    |
| Square root     | `sqrt()`              | `sqrt(25)` → `5`     |
| Parentheses     | `( )`                 | `(2 + 3) * 4` → `20` |
| Unary minus     | `-`                   | `-5 + 10` → `5`      |
| Decimal numbers | `.`                   | `1.5 + 2.5` → `4`    |

The expression evaluator respects standard **operator precedence** (`^` > `*`/`/` > `+`/`-`) and supports **nested parentheses**.

---

## Project Structure

```
calc_test_2/
├── src/
│   ├── calculator.ts       # Calculator class + expression parser
│   ├── calculator.test.ts  # Jest test suite (49 tests)
│   └── index.ts            # Terminal REPL / CLI entry point
├── jest.config.js
├── tsconfig.json
└── package.json
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm

### Install dependencies

```bash
npm install
```

---

## Running the Calculator

### Interactive REPL

Launch a prompt where you can type expressions one at a time:

```bash
npm start
```

```
Simple Calculator  (type "help" for usage, "quit" to exit)

> 2 + 3 * 4
= 14
> (2 + 3) * 4
= 20
> 2 ^ 10
= 1024
> -5 + 10
= 5
> help
...
> quit
Bye!
```

**REPL commands:**

| Command       | Action                    |
|---------------|---------------------------|
| `help`        | Show usage information    |
| `quit`/`exit` | Exit the calculator       |

### One-shot mode

Pass an expression directly as a command-line argument:

```bash
npx ts-node src/index.ts "2 + 3 * 4"
# = 14

npx ts-node src/index.ts "(2 + 3) * 4"
# = 20
```

---

## Running the Tests

```bash
npm test
```

Expected output:

```
PASS src/calculator.test.ts
  Calculator
    add        ✓ 5 tests
    subtract   ✓ 5 tests
    multiply   ✓ 6 tests
    divide     ✓ 6 tests
    modulo     ✓ 4 tests
    power      ✓ 6 tests
    sqrt       ✓ 4 tests
    evaluate   ✓ 13 tests

Tests: 49 passed, 49 total
```

### With coverage report

```bash
npm run test:coverage
```

---

## Building

Compile TypeScript to JavaScript in `dist/`:

```bash
npm run build
```

---

## Using the Calculator Class Programmatically

```typescript
import { Calculator } from './src/calculator';

const calc = new Calculator();

// Basic arithmetic
calc.add(2, 3);          // 5
calc.subtract(10, 4);    // 6
calc.multiply(3, 4);     // 12
calc.divide(15, 3);      // 5
calc.modulo(10, 3);      // 1
calc.power(2, 10);       // 1024
calc.sqrt(25);           // 5

// Expression evaluator
calc.evaluate('2 + 3 * 4');          // 14  (precedence respected)
calc.evaluate('(2 + 3) * 4');        // 20  (parentheses)
calc.evaluate('2 ^ 8');              // 256 (exponentiation)
calc.evaluate('-5 + 10');            // 5   (unary minus)
calc.evaluate('((1 + 2) * (3 + 4))'); // 21 (nested parens)
```

### Error handling

```typescript
calc.divide(5, 0);   // throws Error('Division by zero')
calc.sqrt(-1);       // throws Error('Cannot take square root of a negative number')
calc.evaluate('2 @'); // throws Error('Unknown character: "@"')
calc.evaluate('2 +'); // throws Error('Unexpected end of expression')
```

---

## Design Notes

- The expression parser is a hand-written **recursive-descent parser** — no `eval()` or external parsing libraries are used.
- The project follows a **TDD approach**: tests were written before the implementation.
- All arithmetic is performed with JavaScript's native `number` type (IEEE 754 double precision).
