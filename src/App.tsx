import React from 'react';
import './App.css';
import {Box} from "@mui/material";
import {Header} from "./components/Header/Header";
import {ErrorSnackbar} from "./components/ErrorSnackbar/ErrorSnackbar";
import TodolistsList from "./components/Todolist/TodolistsList";
import {Login} from "./components/Login/Login";
import {Routes, Route} from "react-router-dom";


export const App = () => {

   return (
      <div className="App">
         <Header/>
         <div style={{height: '100%'}}>
            <Box>
               <Routes>
                  <Route path={'/'} element={<TodolistsList/>}/>
                  <Route path={'/login'} element={<Login/>}/>
               </Routes>
            </Box>
         </div>
         <ErrorSnackbar/>
      </div>
   );
}

