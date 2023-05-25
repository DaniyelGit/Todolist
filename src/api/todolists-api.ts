import axios from "axios";

const settings = {
   // baseURL: 'https://social-network.samuraijs.com/api/1.1',
   withCredentials: true,
   headers: {
      "API-KEY": "94c26306-e433-431b-b042-de5fa1af00f0",
   }
}

export const todolistsAPI = {
   getTodolists() {
      return axios.get<TodolistType[]>("https://social-network.samuraijs.com/api/1.1/todo-lists", settings);
   },
   createTodolist(title: string) {
      return axios.post<ResponseType<{ item: TodolistType }>>("https://social-network.samuraijs.com/api/1.1/todo-lists", {title: title}, settings);
   },
   deleteTodolist(todoID: string) {
      return axios.delete<ResponseType<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoID}`, settings);
   },
   updateTodolistTitle(todoID: string, title: string) {
      return axios.put<ResponseType<{}>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todoID}`, {title: title}, settings);
   },
}

export type TodolistType = {
   id: string
   title: string
   addedDate: Date,
   order: number
};

type ResponseType<T> = {
   resultCode: number
   messages: string[]
   data: T
}