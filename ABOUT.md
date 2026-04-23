# Exploring OpenRouter, Kimi 2.6 and Pi Agent

## What's this about

Exploring the Kimi 2.6 LLM (provided by Moonshot AI via OpenRouter) specifically as it compares with Claude Sonnet 4.6 (again, via OpenRouter).

## Goals

Ultimately, I want to get a quick feel for whether I can use a cheaper Open LLM rather than Claude.

I plan to do this by exploring:

- see how effective Kimi 2.6 is when building
- see how cost compares with the frontier LLMs
- get a feel for how to use OpenRouter
- get a feel for costs of per API via OpenRouter vs. CC Pro subscription

## Pi Agent

I was also using Pi Agent (for the first time) because I didn't want the CC connection with Anthropic to have undocumented advantages.

## Approach

I create a simple spec in calcspec.md and gave this to the workflow extension in Pi Agent and let the agent do it's thing.
After they finished, I checked both worked and then reviewed what they produced.

## Conclusions

Both models produced working solutions with very similar feature sets.

The Kimi 2.6 solution had created a best test suite and had seprarated the tests into their own folder, whereas the Claude solution had less comprehensive tests which it placed in the same folder as the main solution.

Kimi did very marginally better in this sense - I prefer more structure and keeping the tests separate.

As expect, cost wise, Kimi is significantly cheaper - c. $0.21 vs c. $0.91 ie. Kimi is 23% of the cost of Sonnet

Worth noting that Sonnet is cheaper than Opus!

## Caveats

- The calculator use-case isn't novel so we're probably not looking outside the training material.
- I didn't do anything to set thinking budget.
