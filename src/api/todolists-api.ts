import axios from "axios";

const instance = axios.create({
   baseURL: 'https://social-network.samuraijs.com/api/1.1/',
   withCredentials: true,
   headers: {
      "API-KEY": "94c26306-e433-431b-b042-de5fa1af00f0",
   }
})

export const todolistsAPI = {
   getTodolists() {
      return instance.get<TodolistType[]>("todo-lists");
   },
   createTodolist(title: string) {
      return instance.post<ResponseType<{ item: TodolistType }>>("todo-lists", {title: title});
   },
   deleteTodolist(todoID: string) {
      return instance.delete<ResponseType>(`todo-lists/${todoID}`);
   },
   updateTodolistTitle(todoID: string, title: string) {
      return instance.put<ResponseType>(`todo-lists/${todoID}`, {title: title});
   },
};

export const tasksAPI = {
   getTasks(todoID: string) {
      return instance.get<GetTaskResponse>(`todo-lists/${todoID}/tasks`);
   },
   createTask(todoID: string, taskTitle: string) {
      return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todoID}/tasks`, {title: taskTitle});
   },
   updateTask(todoID: string, taskID: string, model: UpdateTaskModalType) {
      return instance.put<ResponseType<{ item: TaskType }>>(`todo-lists/${todoID}/tasks/${taskID}`, model);
   },
   deleteTask(todoID: string, taskID: string) {
      return instance.delete<ResponseType>(`todo-lists/${todoID}/tasks/${taskID}`);
   }
};

export enum TaskStatuses {
   New = 0,
   InProgress = 1,
   Completed = 2,
   Draft = 3,
}

export enum TaskPriorities {
   Low = 0,
   Middle = 1,
   Hi = 2,
   Urgently = 3,
   Later = 4,
}

export type TodolistType = {
   id: string
   title: string
   addedDate: string,
   order: number
};

export type TaskType = {
   addedDate: string
   deadline: string
   description: string
   id: string
   order: number
   priority: TaskPriorities
   startDate: string
   status: TaskStatuses
   title: string
   todoListId: string
};

export type UpdateTaskModalType = {
   title: string
   description: string
   status: number
   priority: number
   startDate: string
   deadline: string
};

type ResponseType<T = {}> = {
   resultCode: number
   messages: string[]
   fieldsErrors: []
   data: T
};

type GetTaskResponse = {
   error: null | string
   totalCount: number
   items: TaskType[]
};