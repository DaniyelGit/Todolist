import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist/Todolist";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {
   addTodoAC,
} from "./redux/actions/actionsTodolists";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./redux/store";
import {TodolistDomainType} from "./redux/reducers/todolists-reducer";
import {AppBar, Box, Button, Container, IconButton, Toolbar, Typography} from "@mui/material";
import {Header} from "./components/Header/Header";


export const App = () => {
   let todolists = useSelector<AppRootStateType, TodolistDomainType[]>((state) => state.todolists);

   const dispatch = useDispatch();

   const addTodolist = useCallback((titleValue: string) => {
      dispatch(addTodoAC(titleValue));
   }, [dispatch]);

   return (
      <div className="App">
         <Header/>
         <div style={{marginTop: 20}}>
            <Container maxWidth="xl">
               <div>
                  <AddItemForm addItem={addTodolist}/>
               </div>
               {
                  todolists.map(tl => {
                     return (
                        <Todolist
                           key={tl.id}
                           todolist={tl}
                        />
                     );
                  })
               }
            </Container>
         </div>
      </div>
   );
}

