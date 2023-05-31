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
import {Card, CardContent, Container} from "@mui/material";
import {Header} from "./components/Header/Header";
import Grid from '@mui/material/Unstable_Grid2';


export const App = () => {
   let todolists = useSelector<AppRootStateType, TodolistDomainType[]>((state) => state.todolists);

   const dispatch = useDispatch();

   const addTodolist = useCallback((titleValue: string) => {
      dispatch(addTodoAC(titleValue));
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
                              <Grid>
                                 <Card>
                                    <CardContent>
                                       <Todolist
                                          key={tl.id}
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

