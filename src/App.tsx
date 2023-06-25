import React, {useEffect} from 'react';
import './App.css';
import {Box} from "@mui/material";
import {Header} from "./components/Header/Header";
import {ErrorSnackbar} from "./components/ErrorSnackbar/ErrorSnackbar";
import TodolistsList from "./components/Todolist/TodolistsList";
import {Login} from "./components/Login/Login";
import {Routes, Route, Navigate} from "react-router-dom";
import {useAppDispatch} from "./redux/store";


export const App = () => {

   const dispatch = useAppDispatch();

   useEffect(() => {
      // dispatch()
   }, [])

   return (
      <div className="App">
         <Header/>
         <Box style={{paddingTop: '80px'}}>
            <Routes>
               <Route path={'/'} element={<TodolistsList/>}/>
               <Route path={'/login'} element={<Login/>}/>

               <Route path={'/404'} element={<h1 style={{textAlign: "center"}}>404: PAGE NOT FOUND</h1>}/>
               <Route path={'*'} element={<Navigate to={'/404'}/>}/>
            </Routes>
         </Box>
         <ErrorSnackbar/>
      </div>
   );
}

