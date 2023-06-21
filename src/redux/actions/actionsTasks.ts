import {AddTodoActionType, RemoveTodoActionType, SetTodolistsType} from "./actionsTodolists";
import {
   tasksAPI,
   TaskType,
   UpdateDomainTaskModalType,
   UpdateTaskModalType
} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {AppActionsType, AppRootStateType, AppThunkType} from "../store";
import {ResultCode, setErrorAC, SetErrorType, setRequestStatus} from "../reducers/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {AxiosError, isAxiosError} from "axios";


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
   dispatch(setRequestStatus('loading'));
   try {
      const res = await tasksAPI.getTasks(todoId);
      dispatch(setTasksAC(todoId, res.data.items));
      dispatch(setRequestStatus('succeeded'));
   } catch (e) {
      // console.log(e.message)
   }
   /*tasksAPI.getTasks(todoId)

      .then(res => {
         dispatch(setTasksAC(todoId, res.data.items));
         dispatch(setRequestStatus('succeeded'));
      });*/
};
export const deleteTaskTC = (todoId: string, taskId: string): AppThunkType => (dispatch: Dispatch<AppActionsType>) => {
   dispatch(setRequestStatus('loading'));
   tasksAPI.deleteTask(todoId, taskId)
      .then(res => {
         if (res.data.resultCode === 0) {
            dispatch(removeTaskAC(todoId, taskId));
            dispatch(setRequestStatus('succeeded'));
         } else {
            handleServerAppError(dispatch, res.data);
         }
      });
};


export const createTaskTC = (todoId: string, title: string): AppThunkType => (dispatch: Dispatch<AppActionsType>) => {
   dispatch(setRequestStatus('loading'));
   tasksAPI.createTask(todoId, title)
      .then(res => {
         if (res.data.resultCode === ResultCode.OK) {
            const task = res.data.data.item;
            const action = addTaskAC(todoId, task);
            dispatch(action);
         } else {
            handleServerAppError<{ item: TaskType }>(dispatch, res.data);
         }
      })
      .catch((e: AxiosError) => {
         handleServerNetworkError(dispatch, e.message);
      })
      .finally(() => {
         dispatch(setRequestStatus('idle'));
      })
};
export const updateTaskTC = (todoId: string, taskId: string, model: UpdateDomainTaskModalType): AppThunkType =>
   async (dispatch: Dispatch<AppActionsType>, getState: () => AppRootStateType) => {
      dispatch(setRequestStatus('loading'));
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
               dispatch(setRequestStatus('succeeded'));
            } else {
               handleServerAppError<{ item: TaskType }>(dispatch, res.data);
            }
         } catch (e) {
            console.log(e)
            if (isAxiosError(e)) {
               handleServerNetworkError(dispatch, e.message)
            } else {
               const err = e as Error
               const message = err.message
            }
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
   | SetErrorType;


type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
type AddTaskActionType = ReturnType<typeof addTaskAC>;
type SetTasksType = ReturnType<typeof setTasksAC>;
type UpdateTaskACType = ReturnType<typeof updateTaskAC>;