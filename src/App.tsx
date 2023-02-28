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
      {id: v1(), title: 'What to learn', filter: 'all'},
      {id: v1(), title: 'What to buy', filter: 'active'},
   ])


   const [tasks, setTasks] = useState<Array<TasksType>>([
      {id: v1(), title: "HTML&CSS", isDone: false},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "ReactJS", isDone: false},
      {id: v1(), title: "ReactJS", isDone: true},
   ]);

   const [filterTask, setFilterTask] = useState<FilterValuesType>('all')

   const removeTask = (taskId: string) => {
      setTasks(tasks.filter(task => task.id !== taskId));
   }

   const changeFilter = (todoID: string, valueFilter: FilterValuesType) => {
      setTodolists(todolists.map(tl => tl.id === todoID ? {...tl, filter: valueFilter} : tl));
   };

   const addTask = (titleTask: string) => {
      const newTask = {id: v1(), title: titleTask, isDone: false};
      setTasks([...tasks, newTask]);
   };

   const changeChecked = (eventBool: boolean, taskID: string) => {
      setTasks([...tasks].map(item => item.id === taskID ?
         {...item, isDone: eventBool}
         : item));
   };


   // filtered tasks
   /*let filteredTasks = tasks;
   if (filterTask === 'active') {
      filteredTasks = tasks.filter(item => !item.isDone)
   }
   if (filterTask === 'completed') {
      filteredTasks = tasks.filter(item => item.isDone)
   }*/

   return (
      <div className="App">
         {
            todolists.map(tl => {
               let filteredTasks = tasks;
               if (tl.filter === 'active') {
                  filteredTasks = tasks.filter(item => !item.isDone)
               }
               if (tl.filter === 'completed') {
                  filteredTasks = tasks.filter(item => item.isDone)
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
