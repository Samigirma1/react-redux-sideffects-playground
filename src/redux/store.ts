import { applyMiddleware, legacy_createStore, Reducer } from 'redux'
import { ValidActions } from './actions'
import { middleware } from './sideEffects'

interface IState {
  history: Array< ValidActions & { time: Date }>
}

const initialState: IState = { history: [] }
const reducer: Reducer<IState, ValidActions> = (currentState: IState | undefined, action: ValidActions): IState => {
  if (currentState === undefined) {
    return initialState
  }
  return {
    ...currentState,
    history: [ ...currentState.history, { ...action, time: new Date()}]
  }
}

export const store = legacy_createStore(reducer, initialState, applyMiddleware(...middleware))