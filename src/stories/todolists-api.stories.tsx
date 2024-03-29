import React, {useEffect, useState} from 'react';
import {todolistsAPI} from "../api/todolists-api";

export default {
   title: 'API-todolists'
}

export const GetTodolists = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
      todolistsAPI.getTodolists()
         .then(res => setState(res.data))
   }, [])
   return <div>{JSON.stringify(state)}</div>
};

export const CreateTodolist = () => {
   const [state, setState] = useState<any>(null)
   useEffect(() => {
      todolistsAPI.createTodolist('Пересмотреть')
         .then(res => {
            setState(res.data);
         })
   }, [])

   return <div>{JSON.stringify(state)}</div>
};

export const DeleteTodolist = () => {
   const [state, setState] = useState<any>(null)
   const id = 'bda97305-de75-4719-b53e-bc53814e704b';
   useEffect(() => {
      todolistsAPI.deleteTodolist(id)
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
      todolistsAPI.updateTodolistTitle(id, 'Пересмотреть')
         .then(res => {
            setState(res.data);
         })
   }, [])

   return <div>{JSON.stringify(state)}</div>
};

