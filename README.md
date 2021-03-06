# React Redux side-effects playground

The repo simply sets up a minimal redux store and side-effects that log messages in the console. I use this to observe how side-effects really behave

## Installation

Run `yarn install`

## Usage

Run `yarn build-and-run` from anywhere in the repo directory. This will dispatch the actions in `src/index.ts` and show the logs generated by the side effects in the console. Each action has a readable ID you can use to track actions between side-effects. 

To observe different side-effect setups, simply modify the actions dispatched in `src/index.ts` and/or the side-effects stack in `src/redux/sideEffects.ts`, and re-run `yarn build-and-run`.

### Suggested experiments

- changing which actions are dispatched
- changing when (start/middle/end) and if the `next` function in a side-effect is called
- adding a side-effect that dispatches an action
  - some actions would cause stack overflows
- dispatching multiple actions from the same side-effect
- calling an async function from a side-effect
  - calling an async function that dispatches an action on resolution/rejection
