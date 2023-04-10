import React, {Reducer, useReducer, useState} from 'react';
import './App.css';

import {Todolist} from "./components/Todolist/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {
   ActionsType,
   addTodoAC,
   changeFilterTodoAC, changeTodoTitleAC, removeTodoAC,
   TodolistReducer
} from "./reducers/todolist-reducer/todolists-reducer";
import {
   ActionsTypes,
   addTaskAC,
   changeTaskStatusAC, changeTaskTitleAC,
   removeTaskAC,
   TasksReducer
} from "./reducers/tasks-reducer/tasks-reducer";

export type TasksType = {
   id: string
   title: string
   isDone: boolean
}
export type TodolistType = {
   id: string
   title: string
   filter: FilterValuesType
}
export type TasksStateType = {
   [key: string]: TasksType[]
}
export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {

   const todolistID1 = v1();
   const todolistID2 = v1();

   const [todolists, dispatchForTodolist] = useReducer<Reducer<TodolistType[], ActionsType>>(TodolistReducer, [
      {id: todolistID1, title: 'What to learn', filter: 'all'},
      {id: todolistID2, title: 'What to buy', filter: 'active'},
   ]);

   const [tasks, dispatchForTasks] = useReducer<Reducer<TasksStateType, ActionsTypes>>(TasksReducer, {
      [todolistID1]: [
         {id: v1(), title: "HTML&CSS", isDone: true},
         {id: v1(), title: "JS", isDone: true},
         {id: v1(), title: "ReactJS", isDone: false},
         {id: v1(), title: "Rest API", isDone: false},
         {id: v1(), title: "GraphQL", isDone: false},
      ],
      [todolistID2]: [
         {id: v1(), title: "HTML&CSS2", isDone: true},
         {id: v1(), title: "JS2", isDone: true},
         {id: v1(), title: "ReactJS2", isDone: false},
         {id: v1(), title: "Rest API2", isDone: false},
         {id: v1(), title: "GraphQL2", isDone: false},
      ]
   });

   const removeTask = (todoID: string, taskId: string) => {
      // setTasks({...tasks, [todoID]: tasks[todoID].filter(t => t.id !== taskId)});
      dispatchForTasks(removeTaskAC(todoID, taskId));
   }
   const changeFilter = (todoID: string, valueFilter: FilterValuesType) => {
     /* setTodolists(todolists.map(tl => tl.id === todoID
         ? {...tl, filter: valueFilter}
         : tl)
      );*/
      dispatchForTodolist(changeFilterTodoAC(todoID, valueFilter));
   };
   const addTask = (todoID: string, titleTask: string) => {
      // const newTask = {id: v1(), title: titleTask, isDone: false};
      // setTasks({...tasks, [todoID]: [newTask, ...tasks[todoID]]});
      dispatchForTasks(addTaskAC(todoID, titleTask));
   };
   const changeStatusTask = (todoID: string, taskID: string, eventBool: boolean) => {
      /*setTasks({
         ...tasks,
         [todoID]: tasks[todoID].map(t => t.id === taskID
            ? {...t, isDone: eventBool}
            : t)
      })*/
      dispatchForTasks(changeTaskStatusAC(todoID, taskID, eventBool));
   };
   const addTodolist = (titleValue: string) => {
      /*const newTodoID = v1();
      const newTodolist: TodolistType = {id: newTodoID, title: titleValue, filter: 'all'}
      setTodolists([newTodolist, ...todolists]);
      setTasks({...tasks, [newTodoID]: []});*/

      const action = addTodoAC(titleValue);
      dispatchForTodolist(action);
      dispatchForTasks(action)
   }
   const removeTodolist = (todoID: string) => {
      /*setTodolists(todolists.filter(tl => tl.id !== todoID));
      delete tasks[todoID];*/

      dispatchForTodolist(removeTodoAC(todoID));
      dispatchForTasks(removeTodoAC(todoID));
   }

   const updateTitleTask = (todoID: string, taskID: string, newTitleTask: string) => {
      // setTasks({...tasks, [todoID]: tasks[todoID].map(t => t.id === taskID ? {...t, title: newTitleTask} : t)});
      dispatchForTasks(changeTaskTitleAC(todoID, taskID, newTitleTask));
   }
   const updateTitleTodolist = (todoID: string, newTitleTodo: string) => {
      // setTodolists(todolists.map(tl => tl.id === todoID ? {...tl, title: newTitleTodo}: tl));
      dispatchForTodolist(changeTodoTitleAC(todoID, newTitleTodo));
   }
   return (
      <div className="App">
         <div>
            <AddItemForm addItem={addTodolist}/>
         </div>
         {
            todolists.map(tl => {
               let filteredTasks = tasks[tl.id];
               if (tl.filter === 'active') {
                  filteredTasks = tasks[tl.id].filter(item => !item.isDone)
               }
               if (tl.filter === 'completed') {
                  filteredTasks = tasks[tl.id].filter(item => item.isDone)
               }
               return (
                  <Todolist
                     key={tl.id}
                     todoID={tl.id}
                     title={tl.title}
                     tasks={filteredTasks}
                     filter={tl.filter}
                     removeTask={removeTask}
                     changeFilter={changeFilter}
                     addTask={addTask}
                     changeStatusTask={changeStatusTask}
                     removeTodolist={removeTodolist}
                     updateTitleTask={updateTitleTask}
                     updateTitleTodolist={updateTitleTodolist}
                  />
               );
            })
         }

      </div>
   );
}

export default App;
