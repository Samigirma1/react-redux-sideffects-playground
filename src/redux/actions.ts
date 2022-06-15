import randomWords from 'random-words'

interface IAction {
  type: string,
  id: string,
}

export interface IActionA extends IAction {
  type: 'A'
}
export interface IActionB extends IAction {
  type: 'B'
}
export interface IActionC extends IAction {
  type: 'C'
}
export interface IActionD extends IAction {
  type: 'D'
}
export interface IActionE extends IAction {
  type: 'E'
}

export type ValidActions =
  | IActionA
  | IActionB
  | IActionC
  | IActionD
  | IActionE

export type ValidActionTypes = ValidActions['type']
export const createAction = (type: ValidActionTypes): ValidActions => ({ type, id: `${randomWords()}__${Math.random().toString(16)}` })