import React, {useState} from "react";
import {FilterValuesType, TasksType} from "../App";
import {Button} from "./Button";

type TodolistPropsType = {
   title: string
   tasks: TasksType[]
   removeTask: (taskId: number) => void
}

export const Todolist = (props: TodolistPropsType) => {
   const {
      title,
      tasks,
   } = props;

   const [filterTask, setFilterTask] = useState<FilterValuesType>('all')

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
   };

   return (
      <div>
         <h3>{title}</h3>
         <div>
            <input/>
            <button>+</button>
         </div>
         <ul>
            {
               filteredTasks && filteredTasks.map((task, index) => {
                  return (
                     <li key={task.id}>
                        <button onClick={() => props.removeTask(task.id)}>x</button>
                        <input type="checkbox" checked={task.isDone} onChange={() => {}}/>
                        <span>{task.title}</span>
                     </li>
                  );
               })
            }
         </ul>
         <div>
            <Button onClick={() => changeFilter('all')}>all</Button>
            <Button onClick={() => changeFilter('active')}>active</Button>
            <Button onClick={() => changeFilter('completed')}>completed</Button>
         </div>
      </div>
   );
}