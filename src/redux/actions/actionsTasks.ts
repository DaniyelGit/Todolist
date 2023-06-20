import {AddTodoActionType, RemoveTodoActionType, SetTodolistsType} from "./actionsTodolists";
import {
   tasksAPI,
   TaskStatuses,
   TaskType,
   UpdateDomainTaskModalType,
   UpdateTaskModalType
} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {AppActionsType, AppRootStateType, AppThunkType} from "../store";
import {setErrorAC, SetErrorType, setRequestStatus} from "../reducers/app-reducer";


export enum ACTIONS_TASKS {
   REMOVE_TASK = 'REMOVE-TASK',
   ADD_TASK = 'ADD-TASK',
   CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS',
   CHANGE_TASK_TITLE = 'CHANGE-TASK-TITLE',
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
type SetTasksType = ReturnType<typeof setTasks>;
type UpdateTaskACType = ReturnType<typeof updateTaskAC>;

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
export const setTasks = (todoId: string, tasks: TaskType[]) => {
   return {
      type: ACTIONS_TASKS.SET_TASKS,
      todoId,
      tasks,
   } as const;
};

// ThunksCreator
export const getTasksTC = (todoId: string): AppThunkType => (dispatch: Dispatch<AppActionsType>) => {
   dispatch(setRequestStatus('loading'));
   tasksAPI.getTasks(todoId)
      .then(res => {
         dispatch(setTasks(todoId, res.data.items));
         dispatch(setRequestStatus('succeeded'));
      });
};
export const deleteTaskTC = (todoId: string, taskId: string): AppThunkType => (dispatch: Dispatch<AppActionsType>) => {
   dispatch(setRequestStatus('loading'));
   tasksAPI.deleteTask(todoId, taskId)
      .then(res => {
         if (res.data.resultCode === 0) {
            dispatch(removeTaskAC(todoId, taskId));
            dispatch(setRequestStatus('succeeded'));
         }
      });
};

export enum  ResultCode {
   OK = 0,
   ERROR = 1,
   ERROR_CAPTCHA = 10,
}

export const createTaskTC = (todoId: string, title: string): AppThunkType => (dispatch: Dispatch<AppActionsType>) => {
   dispatch(setRequestStatus('loading'));
   tasksAPI.createTask(todoId, title)
      .then(res => {
         if (res.data.resultCode === ResultCode.OK) {
            const task = res.data.data.item;
            const action = addTaskAC(todoId, task);
            dispatch(action);
         }
         else {
            if (res.data.messages.length) {
               dispatch(setErrorAC(res.data.messages[0]))
            }
            else {
               dispatch(setErrorAC('Error'))
            }
         }
         dispatch(setRequestStatus('idle'));
      })
};
export const updateTaskTC = (todoId: string, taskId: string, model: UpdateDomainTaskModalType): AppThunkType =>
   (dispatch: Dispatch<AppActionsType>, getState: () => AppRootStateType) => {
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
         dispatch(setRequestStatus('loading'));
         tasksAPI.updateTask(todoId, taskId, modelForDomain)
            .then(res => {
               dispatch(updateTaskAC(todoId, taskId, model))
               dispatch(setRequestStatus('succeeded'));
            })
      }
   };