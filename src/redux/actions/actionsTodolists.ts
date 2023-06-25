import {FilterValuesType} from "../reducers/todolists-reducer";
import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {AppActionsType, AppThunkType} from "../store";
import {
   RequestStatusType,
   ResultCode,
   setErrorAC,
   setRequestStatusAC,
   SetRequestStatusACType
} from "../reducers/app-reducer";

import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {isAxiosError} from "axios";

// ********************** ActionsCreator ***********************
export const removeTodoAC = (id: string) => {
   return {
      type: ACTIONS_TODOLISTS.REMOVE_TODOLIST,
      payload: id,
   } as const;
};
export const addTodoAC = (todolist: TodolistType) => {
   return {
      type: ACTIONS_TODOLISTS.ADD_TODOLIST,
      todolist,
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
export const setTodolistsAC = (todolists: TodolistType[]) => {
   return {
      type: ACTIONS_TODOLISTS.SET_TODOLISTS,
      todolists,
   } as const;
};
export const setEntityStatusAC = (todoId: string, entityStatus: RequestStatusType) => {
   return {
      type: ACTIONS_TODOLISTS.SET_ENTITY_STATUS,
      todoId,
      entityStatus,
   } as const;
};

// ********************** ThunksCreator ****************************
export const getTodolistsTC = (): AppThunkType => async (dispatch: Dispatch<AppActionsType>) => {
   dispatch(setRequestStatusAC('loading'));
   try {
      const res = await todolistsAPI.getTodolists();
      dispatch(setTodolistsAC(res.data));
   } catch (e) {
      if (isAxiosError(e)) {
         handleServerNetworkError(dispatch, e.message)
      }
   } finally {
      dispatch(setRequestStatusAC('succeeded'))
   }
};

export const createTodolistTC = (title: string): AppThunkType => async (dispatch: Dispatch<AppActionsType>) => {
   dispatch(setRequestStatusAC('loading'));
   try {
      const res = await todolistsAPI.createTodolist(title);
      if (res.data.resultCode === ResultCode.OK) {
         dispatch(addTodoAC(res.data.data.item));
      } else {
         handleServerAppError<{ item: TodolistType }>(dispatch, res.data);
      }
   } catch (e) {
      if (isAxiosError(e)) {
         handleServerNetworkError(dispatch, e.message);
      }
   } finally {
      dispatch(setRequestStatusAC('succeeded'));
   }
};

export const removeTodolistTC = (todoId: string): AppThunkType => async (dispatch: Dispatch<AppActionsType>) => {
   dispatch(setRequestStatusAC('loading'));
   dispatch(setEntityStatusAC(todoId, 'loading'));
   try {
      const res = await todolistsAPI.deleteTodolist(todoId);
      if (res.data.resultCode === ResultCode.OK) {
         dispatch(removeTodoAC(todoId));
      } else {
         handleServerAppError(dispatch, res.data);
      }
   } catch (e) {
      if (isAxiosError(e)) {
         handleServerNetworkError(dispatch, e.message);
         dispatch(setEntityStatusAC(todoId, 'failed'));
      }
   } finally {
      dispatch(setRequestStatusAC('succeeded'));
   }
}

export const changeTitleTodolistTC = (todoId: string, title: string): AppThunkType => async (dispatch: Dispatch<AppActionsType>) => {
   dispatch(setRequestStatusAC('loading'));
   try {
      const res = await todolistsAPI.updateTodolistTitle(todoId, title);
      if (res.data.resultCode === ResultCode.OK) {
         dispatch(changeTodoTitleAC(todoId, title));
      } else {
         handleServerAppError(dispatch, res.data);
      }
   } catch (e) {
      if (isAxiosError(e)) {
         handleServerNetworkError(dispatch, e.message);
      }
   } finally {
      dispatch(setRequestStatusAC('succeeded'));
   }
};


export enum ACTIONS_TODOLISTS {
   REMOVE_TODOLIST = 'REMOVE-TODOLIST',
   ADD_TODOLIST = 'ADD-TODOLIST',
   CHANGE_TODOLIST_TITLE = 'CHANGE-TODOLIST-TITLE',
   CHANGE_TODOLIST_FILTER = 'CHANGE-TODOLIST-FILTER',
   SET_TODOLISTS = 'SET_TODOLISTS',
   SET_ENTITY_STATUS = 'SET_ENTITY_STATUS',
}


export type TodolistsActionsType = RemoveTodoActionType
   | AddTodoActionType
   | ChangeTodoTitleActionType
   | ChangeFilterTodoActionType
   | SetTodolistsType
   | SetRequestStatusACType
   | SetEntityStatus;

type ChangeFilterTodoActionType = ReturnType<typeof changeFilterTodoAC>;
type ChangeTodoTitleActionType = ReturnType<typeof changeTodoTitleAC>;
export type AddTodoActionType = ReturnType<typeof addTodoAC>;
export type RemoveTodoActionType = ReturnType<typeof removeTodoAC>;
export type SetTodolistsType = ReturnType<typeof setTodolistsAC>;
export type SetEntityStatus = ReturnType<typeof setEntityStatusAC>;