# Simple Calculator

A simple terminal-based calculator tool written in TypeScript with a test-driven development approach.

## Features

- **Basic arithmetic**: addition, subtraction, multiplication, division
- **Chained operations**: sum, product, and average of arrays of numbers
- **Advanced operations**: power, square root, absolute value, modulo
- **Expression parser**: evaluate arithmetic strings with operator precedence and parentheses
- **Operation history**: track and retrieve past calculations
- **Terminal CLI**: interactive command-line interface

## Project Structure

```
.
├── src/
│   ├── calculator.ts    # Calculator and ExpressionParser classes
│   └── cli.ts           # Terminal interface
├── tests/
│   ├── calculator.test.ts   # Unit tests for calculator & parser
│   └── cli.test.ts          # CLI tests (mocked readline)
├── package.json
├── tsconfig.json
├── jest.config.js
└── README.md
```

## Installation

```bash
npm install
```

## Usage

### Interactive CLI

```bash
npm start
```

Example session:

```
Simple Calculator
Type an expression (e.g., 2 + 3 * 4) or "quit" to exit.

calc> 2 + 3 * 4
= 14
calc> (2 + 3) * 4
= 20
calc> help
Supported operators: +, -, *, /, (, )
Type "quit" or "exit" to close.
calc> quit

Goodbye!
```

### Programmatic API

```typescript
import { Calculator, ExpressionParser } from './src/calculator';

const calc = new Calculator();
console.log(calc.add(2, 3));        // 5
console.log(calc.divide(10, 2));    // 5
console.log(calc.power(2, 8));      // 256
console.log(calc.sum([1, 2, 3, 4])); // 10

// Expression parser
const parser = new ExpressionParser();
console.log(parser.evaluate('2 + 3 * 4'));       // 14
console.log(parser.evaluate('(2 + 3) * 4'));     // 20
console.log(parser.evaluate('((1 + 2) * 3) - 4')); // 5
```

## Running Tests

```bash
npm test
```

The test suite covers:
- All basic arithmetic operations (including edge cases like division by zero)
- Chained array operations
- Advanced math operations
- Operation history tracking
- Expression parsing with operator precedence
- Parentheses handling
- Negative numbers and decimals
- Error handling for invalid input
- CLI behavior

## Building

```bash
npm run build
```

This compiles TypeScript into the `dist/` directory.

## Tech Stack

- **TypeScript** — typed JavaScript
- **Jest** — testing framework
- **ts-jest** — TypeScript support for Jest
- **ts-node** — run TypeScript directly in development
