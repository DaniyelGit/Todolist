import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist/Todolist";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {addTodo, createTodolistTC, getTodolistsTC} from "./redux/actions/actionsTodolists";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "./redux/store";
import {TodolistsDomainType} from "./redux/reducers/todolists-reducer";
import {Card, CardContent, Container} from "@mui/material";
import {Header} from "./components/Header/Header";
import Grid from '@mui/material/Unstable_Grid2';



export const App = () => {
   let todolists = useSelector<AppRootStateType, TodolistsDomainType[]>((state) => state.todolists);

   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(getTodolistsTC())
   }, []);

   const addTodolist = useCallback((title: string) => {
      dispatch(createTodolistTC(title));
   }, [dispatch]);

   const gridStyles = {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '20px',
   }

   return (
      <div className="App">
         <Header/>
         <div style={{marginTop: 20}}>
            <Container maxWidth="xl">
               <div style={{marginBottom: 50}}>
                  <AddItemForm addItem={addTodolist}/>
               </div>
                  <Grid container sx={gridStyles}>
                     {
                        todolists.map(tl => {
                           return (
                              <Grid key={tl.id}>
                                 <Card>
                                    <CardContent>
                                       <Todolist
                                          todolist={tl}
                                       />
                                    </CardContent>
                                 </Card>
                              </Grid>
                           );
                        })
                     }
                  </Grid>
            </Container>
         </div>
      </div>
   );
}

