import {AddTodoActionType, RemoveTodoActionType, SetTodolistsType} from "./actionsTodolists";
import {tasksAPI, TaskStatuses, TaskType} from "../../api/todolists-api";
import {Dispatch} from "redux";


export enum ACTIONS_TASKS {
   REMOVE_TASK= 'REMOVE-TASK',
   ADD_TASK = 'ADD-TASK',
   CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS',
   CHANGE_TASK_TITLE = 'CHANGE-TASK-TITLE',
   SET_TASKS = 'SET_TASKS',
}

export type ActionsTypes = RemoveTaskActionType
   | AddTaskActionType
   | ChangeTaskStatusActionType
   | ChangeTaskTitleActionType
   | AddTodoActionType
   | RemoveTodoActionType
   | SetTodolistsType
   | SetTasksType;


type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
type AddTaskActionType = ReturnType<typeof addTaskAC>;
type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>;
type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>;
type SetTasksType = ReturnType<typeof setTasks>;


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
export const changeTaskStatusAC = (todoID: string, taskID: string, status: TaskStatuses) => {
   return {
      type: ACTIONS_TASKS.CHANGE_TASK_STATUS,
      todoID,
      taskID,
      status,
   } as const;
};
export const changeTaskTitleAC = (todoID: string, taskID: string, newTitle: string) => {
   return {
      type: ACTIONS_TASKS.CHANGE_TASK_TITLE,
      todoID,
      taskID,
      newTitle,
   } as const;
};

export const setTasks = (todoId: string, tasks: TaskType[]) => {
   return {
      type: ACTIONS_TASKS.SET_TASKS,
      todoId,
      tasks,
   } as const;
};

export const getTasksTC = (todoId: string) => (dispatch: Dispatch) => {
   tasksAPI.getTasks(todoId)
      .then(res => {
         dispatch(setTasks(todoId, res.data.items));
      });
};

export const deleteTaskTC = (todoId: string, taskId: string) => (dispatch: Dispatch) => {
   tasksAPI.deleteTask(todoId, taskId)
      .then(res => {
         if (res.data.resultCode === 0) {
            dispatch(removeTaskAC(todoId, taskId));
         }
      });
};

export const createTaskTC = (todoId: string, title: string) => (dispatch: Dispatch) => {
   tasksAPI.createTask(todoId, title)
      .then(res => {
         dispatch(addTaskAC(todoId, res.data.data.item));
      });
}