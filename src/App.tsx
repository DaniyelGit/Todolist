import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist/Todolist";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {createTodolistTC, getTodolistsTC} from "./redux/actions/actionsTodolists";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "./redux/store";
import {TodolistsDomainType} from "./redux/reducers/todolists-reducer";
import {Box, Paper} from "@mui/material";
import {Header} from "./components/Header/Header";
import Grid from '@mui/material/Unstable_Grid2';
import {ErrorSnackbar} from "./components/ErrorSnackbar/ErrorSnackbar";


export const App = () => {
   let todolists = useSelector<AppRootStateType, TodolistsDomainType[]>((state) => state.todolists);

   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(getTodolistsTC())
   }, []);

   const addTodolist = useCallback((title: string) => {
      dispatch(createTodolistTC(title));
   }, [dispatch]);


   return (
      <div className="App">
         <Header/>
         <div style={{marginTop: 20}}>
            <Box style={{padding: '0px 20px'}}>
               <Grid container style={{padding: '20px'}}>
                  <AddItemForm addItem={addTodolist}/>
               </Grid>
               <Grid container spacing={3}>
                  {
                     todolists.map(tl => {
                        return (
                           <Grid key={tl.id}>
                              <Paper style={{padding: '10px'}}>
                                 <Todolist
                                    todolist={tl}
                                 />
                              </Paper>
                           </Grid>
                        );
                     })
                  }
               </Grid>
            </Box>
         </div>
         <ErrorSnackbar/>
      </div>
   );
}

