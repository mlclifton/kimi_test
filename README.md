# kimi_test

An experiment comparing **Kimi 2.6** (Moonshot AI via OpenRouter) and **Claude Sonnet 4.6** (Anthropic via OpenRouter), using the [Pi Coding Agent](https://github.com/mariozechner/pi) to build the same project from scratch with each model.

## The Task

Both models were given the same spec ([calcspec.md](./calcspec.md)): build a simple TypeScript terminal calculator following a TDD approach (tests first, then implementation).

## Structure

| Folder | Model |
|---|---|
| `calc_test_kimi-2_6/` | Kimi 2.6 |
| `calc_test_Sonnet-4_6/` | Claude Sonnet 4.6 |

Each folder is a self-contained Node/TypeScript project with Jest tests. Run `npm install && npm test` inside either folder to verify.

## Conclusions

Both models produced working solutions. Key differences:

- **Test quality:** Kimi 2.6 wrote a more comprehensive test suite and kept tests in a dedicated `tests/` folder. Sonnet placed fewer tests alongside the source.
- **Cost:** Kimi was significantly cheaper — ~$0.21 vs ~$0.91 (Kimi is roughly 23% of the cost of Sonnet 4.6).

## Caveats

- A calculator is a well-worn problem, so both models were likely drawing heavily from training data.
- No thinking-budget tuning was applied to either model.

## License

[MIT](./LICENSE)
