import React, {useState} from 'react';
import './App.css';

import {Todolist} from "./components/Todolist";

export type TasksType = {
   id: number
   title: string
   isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {



   const [tasks, setTasks] = useState<Array<TasksType>>([
      {id: 1, title: "HTML&CSS", isDone: true},
      {id: 2, title: "JS", isDone: true},
      {id: 3, title: "ReactJS", isDone: false},
      {id: 4, title: "ReactJS", isDone: true},
   ]);

   const removeTask = (taskId: number) => {
      setTasks(tasks.filter(task => task.id !== taskId));
   }

   /*const [filterTask, setFilterTask] = useState<FilterValuesType>('all')

   const changeFilter = (filter: FilterValuesType) => {
      setFilterTask(filter);
   }

   // filtered tasks
   let filteredTasks = tasks;
   if (filterTask === 'active') {
      filteredTasks = tasks.filter(item => !item.isDone)
   };
   if (filterTask === 'completed') {
      filteredTasks = tasks.filter(item => item.isDone)
   };*/

   return (
      <div className="App">
         <Todolist
            title={'Выучить'}
            tasks={tasks}
            removeTask={removeTask}
         />
      </div>
   );
}

export default App;
