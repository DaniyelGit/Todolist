import React, {useEffect, useState} from 'react';
import axios from 'axios';

export default {
   title: 'API'
}

const todolistAPI = axios.create({
   baseURL: 'https://social-network.samuraijs.com/api/1.1',
   withCredentials: true,
   headers: {
      "API-KEY": "94c26306-e433-431b-b042-de5fa1af00f0",
   }
})

const settings = {
   withCredentials: true,
   headers: {
      "API-KEY": "94c26306-e433-431b-b042-de5fa1af00f0",
   }
}

export const GetTodolists = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
      axios.get("https://social-network.samuraijs.com/api/1.1/todo-lists", settings)
         .then(res => {
            setState(res.data);
         })
   }, [])
   return <div>{JSON.stringify(state)}</div>
};

export const CreateTodolist = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
      axios.post("https://social-network.samuraijs.com/api/1.1/todo-lists", {title: 'Выучить'}, settings)
         .then(res => {
            setState(res.data);
         })
   }, [])

   return <div>{JSON.stringify(state)}</div>
};

export const DeleteTodolist = () => {
   const [state, setState] = useState<any>(null)
   const id = '3b3c7e5c-232e-4382-8ecd-81ec3ab106e9';
   useEffect(() => {
      axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, settings)
         .then(res => {
            setState(res.data);
         })
   }, [])

   return <div>{JSON.stringify(state)}</div>
};

export const UpdateTodolistTitle = () => {
   const [state, setState] = useState<any>(null)
   const id = '489dc31e-c706-4406-beaa-4b00293c90e0';
   useEffect(() => {
      axios.put(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {title: 'Запомнить'}, settings)
         .then(res => {
            setState(res.data);
         })
   }, [])

   return <div>{JSON.stringify(state)}</div>
};

