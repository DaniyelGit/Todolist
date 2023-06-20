import {FilterValuesType, TodolistsDomainType} from "../reducers/todolists-reducer";
import {v1} from "uuid";
import {todolistsAPI, TodolistType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {AppActionsType, AppThunkType} from "../store";
import {RequestStatusType, setErrorAC, setRequestStatus, SetRequestStatusType} from "../reducers/app-reducer";

// ActionsCreator
export const removeTodo = (id: string) => {
   return {
      type: ACTIONS_TODOLISTS.REMOVE_TODOLIST,
      payload: id,
   } as const;
};
export const addTodo = (todolist: TodolistType) => {
   return {
      type: ACTIONS_TODOLISTS.ADD_TODOLIST,
      todolist,
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
export const setEntityStatusAC = (todoId: string, entityStatus: RequestStatusType) => {
   return {
      type: ACTIONS_TODOLISTS.SET_ENTITY_STATUS,
      todoId,
      entityStatus,
   } as const;
};

// ThunksCreator
export const getTodolistsTC = (): AppThunkType => (dispatch: Dispatch<AppActionsType>) => {
   dispatch(setRequestStatus('loading'));
   todolistsAPI.getTodolists()
      .then(res => {
         dispatch(setTodolists(res.data));
         dispatch(setRequestStatus('succeeded'));
      });
};

export const createTodolistTC = (title: string): AppThunkType => (dispatch: Dispatch<AppActionsType>) => {
   dispatch(setRequestStatus('loading'));
   todolistsAPI.createTodolist(title)
      .then((res) => {
         console.log(res)
         dispatch(addTodo(res.data.data.item));
         dispatch(setRequestStatus('succeeded'));
      })
};

export const removeTodolistTC = (todoId: string): AppThunkType => (dispatch: Dispatch<AppActionsType>) => {
   dispatch(setRequestStatus('loading'));
   dispatch(setEntityStatusAC(todoId, 'loading'));
   todolistsAPI.deleteTodolist(todoId)
      .then(res => {
         dispatch(removeTodo(todoId));
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
         dispatch(changeTodoTitle(todoId, title));
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

type ChangeFilterTodoActionType = ReturnType<typeof changeFilterTodo>;
type ChangeTodoTitleActionType = ReturnType<typeof changeTodoTitle>;
export type AddTodoActionType = ReturnType<typeof addTodo>;
export type RemoveTodoActionType = ReturnType<typeof removeTodo>;
export type SetTodolistsType = ReturnType<typeof setTodolists>;
export type SetEntityStatus = ReturnType<typeof setEntityStatusAC>;