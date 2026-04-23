import { EventEmitter } from 'events';

const sharedMockRl = new EventEmitter();
const mockPrompt = jest.fn();
const mockClose = jest.fn();
(sharedMockRl as any).prompt = mockPrompt;
(sharedMockRl as any).close = mockClose;

jest.mock('readline', () => ({
  createInterface: jest.fn(() => sharedMockRl),
}));

describe('CLI', () => {
  let consoleLogSpy: jest.SpyInstance;
  let processExitSpy: jest.SpyInstance;

  beforeAll(() => {
    jest.isolateModules(() => {
      require('../src/cli');
    });
  });

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    processExitSpy = jest.spyOn(process, 'exit').mockImplementation(() => undefined as never);
    mockPrompt.mockClear();
    mockClose.mockClear();
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    processExitSpy.mockRestore();
  });

  test('evaluates expression and prints result', () => {
    sharedMockRl.emit('line', '2 + 3');
    expect(consoleLogSpy).toHaveBeenCalledWith('= 5');
  });

  test('handles division by zero error', () => {
    sharedMockRl.emit('line', '10 / 0');
    expect(consoleLogSpy).toHaveBeenCalledWith('Error: Division by zero');
  });

  test('handles invalid characters error', () => {
    sharedMockRl.emit('line', '2 + a');
    expect(consoleLogSpy).toHaveBeenCalledWith('Error: Invalid character: a');
  });

  test('handles help command', () => {
    sharedMockRl.emit('line', 'help');
    expect(consoleLogSpy).toHaveBeenCalledWith('Supported operators: +, -, *, /, (, )');
    expect(consoleLogSpy).toHaveBeenCalledWith('Type "quit" or "exit" to close.');
  });

  test('closes on quit', () => {
    sharedMockRl.emit('line', 'quit');
    expect(mockClose).toHaveBeenCalled();
  });

  test('closes on exit', () => {
    sharedMockRl.emit('line', 'exit');
    expect(mockClose).toHaveBeenCalled();
  });

  test('exits on close event', () => {
    sharedMockRl.emit('close');
    expect(consoleLogSpy).toHaveBeenCalledWith('\nGoodbye!');
    expect(processExitSpy).toHaveBeenCalledWith(0);
  });
});
