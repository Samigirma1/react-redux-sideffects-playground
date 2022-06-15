import { createAction } from './redux/actions'
import { store } from './redux/store'

console.log('starting test')

store.dispatch(createAction('A'))

console.log('ending test -  final state: \n', store.getState())