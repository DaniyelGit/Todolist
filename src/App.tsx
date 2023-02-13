import React, {useState} from 'react';
import './App.css';

import {Todolist} from "./components/Todolist";
import {v1} from "uuid";

export type TasksType = {
   id: string
   title: string
   isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {



   const [tasks, setTasks] = useState<Array<TasksType>>([
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "ReactJS", isDone: false},
      {id: v1(), title: "ReactJS", isDone: true},
   ]);

   const [filterTask, setFilterTask] = useState<FilterValuesType>('all')

   const removeTask = (taskId: string) => {
      setTasks(tasks.filter(task => task.id !== taskId));
   }

   const changeFilter = (filter: FilterValuesType) => {
      setFilterTask(filter);
   };

   const addTask = (titleTask: string) => {
      const newTask = {id: v1(), title: titleTask, isDone: false};
      setTasks([...tasks, newTask]);
   };

   const changeChecked = (taskID: string) => {
      setTasks([...tasks].map(item => item.id === taskID ?
         {...item, isDone: !item.isDone}
         : item));
   };


   // filtered tasks
   let filteredTasks = tasks;
   if (filterTask === 'active') {
      filteredTasks = tasks.filter(item => !item.isDone)
   };
   if (filterTask === 'completed') {
      filteredTasks = tasks.filter(item => item.isDone)
   };

   return (
      <div className="App">
         <Todolist
            title={'Выучить'}
            tasks={filteredTasks}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeChecked={changeChecked}
         />
      </div>
   );
}

export default App;
