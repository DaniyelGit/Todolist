import {FilterValuesType} from "../reducers/todolists-reducer";
import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {AppActionsType, AppThunkType} from "../store";
import {
   RequestStatusType,
   ResultCode,
   setErrorAC,
   setRequestStatus,
   SetRequestStatusType
} from "../reducers/app-reducer";

import {handleServerAppError} from "../../utils/error-utils";

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
export const getTodolistsTC = (): AppThunkType => (dispatch: Dispatch<AppActionsType>) => {
   dispatch(setRequestStatus('loading'));
   todolistsAPI.getTodolists()
      .then(res => {
         dispatch(setTodolistsAC(res.data));
         dispatch(setRequestStatus('succeeded'));
      });
};

export const createTodolistTC = (title: string): AppThunkType => (dispatch) => {
   dispatch(setRequestStatus('loading'));
   dispatch(getTodolistsTC())
   todolistsAPI.createTodolist(title)
      .then((res) => {
         if (res.data.resultCode === ResultCode.OK) {
            dispatch(addTodoAC(res.data.data.item));
            dispatch(setRequestStatus('succeeded'));
         }
         else {
            handleServerAppError<{item: TodolistType}>(dispatch, res.data)
         }
      })
};

export const removeTodolistTC = (todoId: string): AppThunkType => (dispatch: Dispatch<AppActionsType>) => {
   dispatch(setRequestStatus('loading'));
   dispatch(setEntityStatusAC(todoId, 'loading'));
   todolistsAPI.deleteTodolist(todoId)
      .then(res => {
         dispatch(removeTodoAC(todoId));
         dispatch(setRequestStatus('succeeded'));
      })
      .catch((e) => {
         dispatch(setRequestStatus('failed'));
         dispatch(setEntityStatusAC(todoId, 'failed'));
         dispatch(setErrorAC(e.message))
      })
}

export const changeTitleTodolist = (todoId: string, title: string) => (dispatch: Dispatch<AppActionsType>) => {
   dispatch(setRequestStatus('loading'));
   todolistsAPI.updateTodolistTitle(todoId, title)
      .then(res => {
         dispatch(changeTodoTitleAC(todoId, title));
         dispatch(setRequestStatus('succeeded'));
      })
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
   | SetRequestStatusType
   | SetEntityStatus;

type ChangeFilterTodoActionType = ReturnType<typeof changeFilterTodoAC>;
type ChangeTodoTitleActionType = ReturnType<typeof changeTodoTitleAC>;
export type AddTodoActionType = ReturnType<typeof addTodoAC>;
export type RemoveTodoActionType = ReturnType<typeof removeTodoAC>;
export type SetTodolistsType = ReturnType<typeof setTodolistsAC>;
export type SetEntityStatus = ReturnType<typeof setEntityStatusAC>;