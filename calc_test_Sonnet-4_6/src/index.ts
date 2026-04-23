#!/usr/bin/env ts-node
/**
 * Simple Terminal Calculator
 *
 * Usage (interactive REPL):
 *   npx ts-node src/index.ts
 *
 * Usage (one-shot):
 *   npx ts-node src/index.ts "2 + 3 * 4"
 *
 * Supported operators:  +  -  *  /  ^  ( )
 * Special commands in REPL:  help | quit | exit
 */

import * as readline from 'readline';
import { Calculator } from './calculator';

const calc = new Calculator();

const HELP = `
Simple Calculator – supported syntax
  2 + 3        addition
  10 - 4       subtraction
  6 * 7        multiplication
  15 / 3       division
  2 ^ 10       exponentiation
  (2 + 3) * 4  parentheses
  -5 + 10      unary minus
  1.5 + 2.5    decimals

Commands: help | quit | exit
`.trim();

function evalAndPrint(expression: string): void {
  try {
    const result = calc.evaluate(expression.trim());
    console.log(`= ${result}`);
  } catch (err) {
    console.error(`Error: ${(err as Error).message}`);
  }
}

// ── One-shot mode (expression passed as CLI argument) ────────────────────────
const arg = process.argv[2];
if (arg !== undefined) {
  evalAndPrint(arg);
  process.exit(0);
}

// ── Interactive REPL mode ────────────────────────────────────────────────────
console.log('Simple Calculator  (type "help" for usage, "quit" to exit)\n');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> ',
});

rl.prompt();

rl.on('line', (line: string) => {
  const input = line.trim();

  if (!input) {
    rl.prompt();
    return;
  }

  if (input === 'quit' || input === 'exit') {
    console.log('Bye!');
    rl.close();
    return;
  }

  if (input === 'help') {
    console.log(HELP);
  } else {
    evalAndPrint(input);
  }

  rl.prompt();
});

rl.on('close', () => {
  process.exit(0);
});
