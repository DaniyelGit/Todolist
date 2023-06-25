import React, {useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {TodolistsDomainType} from "../../redux/reducers/todolists-reducer";
import {Box, Paper} from "@mui/material";
import {Todolist} from "./Todolist";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {createTodolistTC, getTodolistsTC} from "../../redux/actions/actionsTodolists";
import {Navigate} from "react-router-dom";

export const TodolistsList = () => {

   const todolists = useAppSelector<TodolistsDomainType[]>(state => state.todolists);
   const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn);
   const dispatch = useAppDispatch();

   useEffect(() => {
      if (!isLoggedIn) {
         return;
      }
      dispatch(getTodolistsTC())
   }, []);

   const addTodolist = useCallback((title: string) => {
      dispatch(createTodolistTC(title))
   }, [dispatch]);

   if (!isLoggedIn) {
      return <Navigate to={'/login'}/>;
   }

   return (
      <>
         <Box style={{padding: '20px'}}>
            <div>
               <div style={{marginBottom: '20px'}}>
                  <AddItemForm addItem={addTodolist}/>
               </div>
               <div style={{display: "flex", width: '100%', overflowX: 'auto'}}>
                  {
                     todolists.map(tl => {
                        return (
                           <Box key={`todo-${tl.id}`} style={{padding: '10px'}}>
                              <Paper style={{padding: '10px'}}>
                                 <Todolist
                                    todolist={tl}
                                 />
                              </Paper>
                           </Box>
                        );
                     })
                  }
               </div>
            </div>
         </Box>
      </>
   );
};

export default TodolistsList;