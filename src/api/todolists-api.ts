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
      return instance.delete<ResponseType<{}>>(`todo-lists/${todoID}`);
   },
   updateTodolistTitle(todoID: string, title: string) {
      return instance.put<ResponseType<{}>>(`todo-lists/${todoID}`, {title: title});
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