import {AddTodoActionType, RemoveTodoActionType, SetTodolistsType} from "./actionsTodolists";
import {
   ErrorsType,
   tasksAPI,
   TaskType, TodolistType,
   UpdateDomainTaskModalType,
   UpdateTaskModalType
} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {AppActionsType, AppRootStateType, AppThunkType} from "../store";
import {ResultCode, setErrorAC, SetErrorACType, setRequestStatusAC} from "../reducers/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {isAxiosError} from "axios";



// ActionsCreator
export const removeTaskAC = (todoID: string, taskID: string) => {
   return {
      type: ACTIONS_TASKS.REMOVE_TASK,
      todoID,
      taskID,
   } as const;
};
export const addTaskAC = (todoId: string, task: TaskType) => {
   return {
      type: ACTIONS_TASKS.ADD_TASK,
      task,
      todoId,
   } as const;
};
export const updateTaskAC = (todoId: string, taskId: string, model: UpdateDomainTaskModalType) => {
   return {
      type: ACTIONS_TASKS.UPDATE_TASK,
      todoId,
      taskId,
      payload: {
         ...model
      }
   } as const;
}
export const setTasksAC = (todoId: string, tasks: TaskType[]) => {
   return {
      type: ACTIONS_TASKS.SET_TASKS,
      todoId,
      tasks,
   } as const;
};

// ThunksCreator
export const getTasksTC = (todoId: string): AppThunkType => async (dispatch: Dispatch<AppActionsType>) => {
   dispatch(setRequestStatusAC('loading'));

   try {
      const res = await tasksAPI.getTasks(todoId);
      if (!res.data.error) {
         dispatch(setTasksAC(todoId, res.data.items));
      } else {
         dispatch(setErrorAC(res.data.error));
      }
   } catch (e) {
      if (isAxiosError(e))
      handleServerNetworkError(dispatch, e.message)
   } finally {
      dispatch(setRequestStatusAC('succeeded'));
   }
};
export const deleteTaskTC = (todoId: string, taskId: string): AppThunkType =>  async (dispatch: Dispatch<AppActionsType>) => {
   dispatch(setRequestStatusAC('loading'));

   try {
      const res = await tasksAPI.deleteTask(todoId, taskId);
      if (res.data.resultCode === ResultCode.OK) {
         dispatch(removeTaskAC(todoId, taskId));
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


export const createTaskTC = (todoId: string, title: string): AppThunkType => async (dispatch: Dispatch<AppActionsType>) => {
   dispatch(setRequestStatusAC('loading'));

   try {
      const res = await tasksAPI.createTask(todoId, title);
      if (res.data.resultCode === ResultCode.OK) {
         dispatch(addTaskAC(todoId, res.data.data.item));
      } else {
         handleServerAppError<{item: TaskType}>(dispatch, res.data);
      }
   } catch (e) {
      if (isAxiosError(e)) {
         handleServerNetworkError(dispatch, e.message);
      }
   } finally {
      dispatch(setRequestStatusAC('succeeded'));
   }
};

export const updateTaskTC = (todoId: string, taskId: string, model: UpdateDomainTaskModalType): AppThunkType =>
   async (dispatch: Dispatch<AppActionsType>, getState: () => AppRootStateType) => {
      dispatch(setRequestStatusAC('loading'));
      const task = getState().tasks[todoId].find(t => t.id === taskId);
      if (task) {
         const modelForDomain: UpdateTaskModalType = {
            title: task.title,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            status: task.status,
            ...model,
         };

         try {
            const res = await tasksAPI.updateTask(todoId, taskId, modelForDomain);
            if (res.data.resultCode === ResultCode.OK) {
               dispatch(updateTaskAC(todoId, taskId, model))
            } else {
               handleServerAppError<{ item: TodolistType }>(dispatch, res.data);
            }
         } catch (e) {
            if (isAxiosError<ErrorsType>(e)) {
               const err = e.response ? e.response.data.message : e.message;
               handleServerNetworkError(dispatch, err)
            } else {
               const err = (e as Error).message;
               handleServerNetworkError(dispatch, err)
            }
         }
         finally {
            dispatch(setRequestStatusAC('succeeded'));
         }
      }
   };


export enum ACTIONS_TASKS {
   REMOVE_TASK = 'REMOVE-TASK',
   ADD_TASK = 'ADD-TASK',
   SET_TASKS = 'SET_TASKS',
   UPDATE_TASK = 'UPDATE_TASK',
}

export type TasksActionsType = RemoveTaskActionType
   | AddTaskActionType
   | AddTodoActionType
   | RemoveTodoActionType
   | SetTodolistsType
   | SetTasksType
   | UpdateTaskACType
   | SetErrorACType;


type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
type AddTaskActionType = ReturnType<typeof addTaskAC>;
type SetTasksType = ReturnType<typeof setTasksAC>;
type UpdateTaskACType = ReturnType<typeof updateTaskAC>;