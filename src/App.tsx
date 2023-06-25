import React, {useEffect} from 'react';
import './App.css';
import {Box, CircularProgress} from "@mui/material";
import {Header} from "./components/Header/Header";
import {ErrorSnackbar} from "./components/ErrorSnackbar/ErrorSnackbar";
import TodolistsList from "./components/Todolist/TodolistsList";
import {Login} from "./components/Login/Login";
import {Routes, Route, Navigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "./redux/store";
import {meTC} from "./redux/reducers/auth-reducer";


export const App = () => {
   const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized);
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(meTC());
   }, []);


   if (!isInitialized) {
      return (
         <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
         </div>
      )
   }

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

