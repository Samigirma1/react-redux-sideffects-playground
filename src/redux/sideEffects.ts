import { Middleware, MiddlewareAPI } from "redux";
import { createAction, ValidActions } from "./actions";

type MiddlewareWrapper = (innerMiddleware: Middleware, name: string) => Middleware 

const middlewareWrapper: MiddlewareWrapper = (innerMiddleware, name) => {
  return (store) => (next) => (action) => {
    console.log(`* ${name} called with - a: `, action, ` - h: ${getActionChain(store)}`)
    const nextVal = innerMiddleware(store)(next)(action)
    console.log(`* ${name} returned with `, nextVal)
    return nextVal
  }
}

const getActionChain = (store: MiddlewareAPI) => {
  let history_str = ""
  store.getState().history.forEach((item: ValidActions, index: number) => {
    if (index !== 0) history_str += item.type
  });
  return history_str
}

const sideEffectLogger = (...args: any[]) => console.log("**** ", ...args)

const sideEffectADispatching: Middleware<MiddlewareAPI, ValidActions> = store => next => (action: ValidActions) => {
  const nextVal = next(action)
  if (action.type === 'A') {
    sideEffectLogger('TRIPPED A')
    store.dispatch(createAction('C'))
    store.dispatch(createAction('B'))
  }
  return nextVal
}
const wrappedSideEffectADispatching = middlewareWrapper(sideEffectADispatching, 'DISPATCHING_TRIPS_ON_A')

const sideEffectB: Middleware<MiddlewareAPI, ValidActions> = _store => next => (action: ValidActions) => {
  if (action.type === 'B') {
    sideEffectLogger('TRIPPED B')
  }
  return next(action)
}
const wrappedSideEffectB = middlewareWrapper(sideEffectB, 'TRIPS_ON_B')

const sideEffectA: Middleware<MiddlewareAPI, ValidActions> = _store => next => (action: ValidActions) => {
  if (action.type === 'A') {
    sideEffectLogger('TRIPPED A')
  }
  return next(action)
}
const wrappedSideEffectA = middlewareWrapper(sideEffectA, 'TRIPS_ON_A')

export const middleware: Middleware[] = [ wrappedSideEffectADispatching, wrappedSideEffectB, wrappedSideEffectA ]