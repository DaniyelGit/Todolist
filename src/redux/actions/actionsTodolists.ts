import {FilterValuesType} from "../reducers/todolists-reducer";
import {v1} from "uuid";


export enum ACTIONS_TODOLISTS {
   REMOVE_TODOLIST = 'REMOVE-TODOLIST',
   ADD_TODOLIST = 'ADD-TODOLIST',
   CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE',
   CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER',
}


export type ActionsType = removeTodoActionType
   | addTodoActionType
   | changeTodoTitleActionType
   | changeFilterTodoActionType;

type changeFilterTodoActionType = ReturnType<typeof changeFilterTodoAC>;
type changeTodoTitleActionType = ReturnType<typeof changeTodoTitleAC>;
export type addTodoActionType = ReturnType<typeof addTodoAC>;
export type removeTodoActionType = ReturnType<typeof removeTodoAC>;

export const removeTodoAC = (id: string) => {
   return {
      type: ACTIONS_TODOLISTS.REMOVE_TODOLIST,
      payload: id,
   } as const
};
export const addTodoAC = (title: string) => {
   return {
      type: ACTIONS_TODOLISTS.ADD_TODOLIST,
      payload: {
         id: v1(),
         title
      },
   } as const
};
export const changeTodoTitleAC = (id: string, newTodolistTitle: string) => {
   return {
      type: ACTIONS_TODOLISTS.CHANGE_TODOLIST_TITLE,
      payload: {
         id,
         newTodolistTitle,
      }
   } as const
};
export const changeFilterTodoAC = (id: string, valueFilter: FilterValuesType) => {
   return {
      type: ACTIONS_TODOLISTS.CHANGE_TODOLIST_FILTER,
      payload: {
         id,
         valueFilter,
      }
   } as const
}
