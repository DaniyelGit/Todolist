import {FilterValuesType} from "../reducers/todolists-reducer";
import {v1} from "uuid";
import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {Dispatch} from "redux";


export enum ACTIONS_TODOLISTS {
   REMOVE_TODOLIST = 'REMOVE-TODOLIST',
   ADD_TODOLIST = 'ADD-TODOLIST',
   CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE',
   CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER',
   SET_TODOLISTS = 'SET_TODOLISTS',
}


export type ActionsType = RemoveTodoActionType
   | AddTodoActionType
   | ChangeTodoTitleActionType
   | ChangeFilterTodoActionType
   | SetTodolistsType;

type ChangeFilterTodoActionType = ReturnType<typeof changeFilterTodoAC>;
type ChangeTodoTitleActionType = ReturnType<typeof changeTodoTitleAC>;
export type AddTodoActionType = ReturnType<typeof addTodoAC>;
export type RemoveTodoActionType = ReturnType<typeof removeTodoAC>;
export type SetTodolistsType = ReturnType<typeof setTodolists>;

export const removeTodoAC = (id: string) => {
   return {
      type: ACTIONS_TODOLISTS.REMOVE_TODOLIST,
      payload: id,
   } as const;
};
export const addTodoAC = (title: string) => {
   return {
      type: ACTIONS_TODOLISTS.ADD_TODOLIST,
      payload: {
         id: v1(),
         title
      }
   } as const;
};
export const changeTodoTitleAC = (id: string, newTodolistTitle: string) => {
   return {
      type: ACTIONS_TODOLISTS.CHANGE_TODOLIST_TITLE,
      payload: {
         id,
         newTodolistTitle,
      }
   } as const;
};
export const changeFilterTodoAC = (id: string, valueFilter: FilterValuesType) => {
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

export const getTodolistsTC = () => (dispatch: Dispatch) => {
   todolistsAPI.getTodolists()
      .then(res => {
         dispatch(setTodolists(res.data));
      });
}
