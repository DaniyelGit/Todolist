import {AddTodoActionType, RemoveTodoActionType, SetTodolistsType} from "./actionsTodolists";
import {TaskStatuses} from "../../api/todolists-api";


export enum ACTIONS_TASKS {
   REMOVE_TASK= 'REMOVE-TASK',
   ADD_TASK = 'ADD-TASK',
   CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS',
   CHANGE_TASK_TITLE = 'CHANGE-TASK-TITLE',
}

export type ActionsTypes = RemoveTaskActionType
   | AddTaskActionType
   | ChangeTaskStatusActionType
   | ChangeTaskTitleActionType
   | AddTodoActionType
   | RemoveTodoActionType
   | SetTodolistsType;


type RemoveTaskActionType = ReturnType<typeof removeTaskAC>;
type AddTaskActionType = ReturnType<typeof addTaskAC>;
type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>;
type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>;


export const removeTaskAC = (todoID: string, taskID: string) => {
   return {
      type: ACTIONS_TASKS.REMOVE_TASK,
      todoID,
      taskID,
   } as const;
};
export const addTaskAC = (todoID: string, title: string) => {
   return {
      type: ACTIONS_TASKS.ADD_TASK,
      todoID,
      title,
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