#!/usr/bin/env node
import * as readline from 'readline';
import { ExpressionParser } from './calculator';

const parser = new ExpressionParser();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'calc> ',
});

console.log('Simple Calculator');
console.log('Type an expression (e.g., 2 + 3 * 4) or "quit" to exit.');
console.log();

rl.prompt();

rl.on('line', (line: string) => {
  const input = line.trim();

  if (input === 'quit' || input === 'exit') {
    rl.close();
    return;
  }

  if (input === 'help') {
    console.log('Supported operators: +, -, *, /, (, )');
    console.log('Type "quit" or "exit" to close.');
    rl.prompt();
    return;
  }

  try {
    const result = parser.evaluate(input);
    console.log(`= ${result}`);
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error: ${error.message}`);
    } else {
      console.log('Unknown error');
    }
  }

  rl.prompt();
});

rl.on('close', () => {
  console.log('\nGoodbye!');
  process.exit(0);
});
