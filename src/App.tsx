import React, {useState} from 'react';
import './App.css';

import {Todolist} from "./components/Todolist/Todolist";
import {v1} from "uuid";

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
export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {

   const todolistID1 = v1();
   const todolistID2 = v1();

   const [todolists, setTodolists] = useState<Array<TodolistType>>([
      {id: todolistID1, title: 'What to learn', filter: 'all'},
      {id: todolistID2, title: 'What to buy', filter: 'active'},
   ])

   let [tasks, setTasks] = useState({
      [todolistID1]:[
         {id: v1(), title: "HTML&CSS", isDone: true},
         {id: v1(), title: "JS", isDone: true},
         {id: v1(), title: "ReactJS", isDone: false},
         {id: v1(), title: "Rest API", isDone: false},
         {id: v1(), title: "GraphQL", isDone: false},
      ],
      [todolistID2]:[
         {id: v1(), title: "HTML&CSS2", isDone: true},
         {id: v1(), title: "JS2", isDone: true},
         {id: v1(), title: "ReactJS2", isDone: false},
         {id: v1(), title: "Rest API2", isDone: false},
         {id: v1(), title: "GraphQL2", isDone: false},
      ]
   });


   const removeTask = (todoID: string, taskId: string) => {
      setTasks({...tasks, [todoID]: tasks[todoID].filter(t => t.id !== taskId)});
   }

   const changeFilter = (todoID: string, valueFilter: FilterValuesType) => {
      setTodolists(todolists.map(tl => tl.id === todoID
         ? {...tl, filter: valueFilter}
         : tl)
      );
   };

   const addTask = (todoID:string, titleTask: string) => {
      const newTask = {id: v1(), title: titleTask, isDone: false};
      setTasks({...tasks, [todoID]: [newTask, ...tasks[todoID]]});
   };

   const changeChecked = (todoID: string, eventBool: boolean, taskID: string) => {
      setTasks({...tasks,
         [todoID]: tasks[todoID].map(t => t.id === taskID
            ? {...t, isDone: eventBool}
            : t)
      })
   };


   return (
      <div className="App">
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
                     removeTask={removeTask}
                     changeFilter={changeFilter}
                     addTask={addTask}
                     changeChecked={changeChecked}
                  />
               );
            })
         }

      </div>
   );
}

export default App;
