import {FilterValuesType} from "../reducers/todolists-reducer";
import {v1} from "uuid";
import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {AppActionsType, AppThunkType} from "../store";


export enum ACTIONS_TODOLISTS {
   REMOVE_TODOLIST = 'REMOVE-TODOLIST',
   ADD_TODOLIST = 'ADD-TODOLIST',
   CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE',
   CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER',
   SET_TODOLISTS = 'SET_TODOLISTS',
}


export type TodolistsActionsType = RemoveTodoActionType
   | AddTodoActionType
   | ChangeTodoTitleActionType
   | ChangeFilterTodoActionType
   | SetTodolistsType;

type ChangeFilterTodoActionType = ReturnType<typeof changeFilterTodo>;
type ChangeTodoTitleActionType = ReturnType<typeof changeTodoTitle>;
export type AddTodoActionType = ReturnType<typeof addTodo>;
export type RemoveTodoActionType = ReturnType<typeof removeTodo>;
export type SetTodolistsType = ReturnType<typeof setTodolists>;

// ActionsCreator
export const removeTodo = (id: string) => {
   return {
      type: ACTIONS_TODOLISTS.REMOVE_TODOLIST,
      payload: id,
   } as const;
};
export const addTodo = (title: string) => {
   return {
      type: ACTIONS_TODOLISTS.ADD_TODOLIST,
      payload: {
         id: v1(),
         title
      }
   } as const;
};
export const changeTodoTitle = (id: string, newTodolistTitle: string) => {
   return {
      type: ACTIONS_TODOLISTS.CHANGE_TODOLIST_TITLE,
      payload: {
         id,
         newTodolistTitle,
      }
   } as const;
};
export const changeFilterTodo = (id: string, valueFilter: FilterValuesType) => {
   return {
      type: ACTIONS_TODOLISTS.CHANGE_TODOLIST_FILTER,
      payload: {
         id,
         valueFilter,
      }
   } as const;
};
export const setTodolists = (todolists: TodolistType[]) => {
   return {
      type: ACTIONS_TODOLISTS.SET_TODOLISTS,
      todolists,
   } as const;
};

// ThunksCreator
export const getTodolistsTC = (): AppThunkType => (dispatch: Dispatch<AppActionsType>) => {

   todolistsAPI.getTodolists()
      .then(res => {
         dispatch(setTodolists(res.data));
      });
}
