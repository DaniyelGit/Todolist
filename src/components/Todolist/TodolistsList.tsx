import React, {useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {TodolistsDomainType} from "../../redux/reducers/todolists-reducer";
import Grid from "@mui/material/Unstable_Grid2";
import {Box, Container, Paper} from "@mui/material";
import {Todolist} from "./Todolist";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {createTodolistTC, getTodolistsTC} from "../../redux/actions/actionsTodolists";

export const TodolistsList = () => {

   const todolists = useAppSelector<TodolistsDomainType[]>(state => state.todolists);
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(getTodolistsTC())
   }, []);

   const addTodolist = useCallback((title: string) => {
      dispatch(createTodolistTC(title))
   }, [dispatch]);

   return (
      <>
         {/*<Grid container style={{padding: '20px'}}>
            <AddItemForm addItem={addTodolist}/>
         </Grid>*/}
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