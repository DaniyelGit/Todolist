import React, {useCallback} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist/Todolist";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {
   addTodoAC,
} from "./redux/actions/actionsTodolists";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./redux/store";
import {TodolistType} from "./redux/reducers/todolists-reducer";


export const App = () => {
   let todolists = useSelector<AppRootStateType, TodolistType[]>((state) => state.todolists);

   const dispatch = useDispatch();

   const addTodolist = useCallback((titleValue: string) => {
      dispatch(addTodoAC(titleValue));
   }, [dispatch]);

   return (
      <div className="App">
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
      </div>
   );
}

