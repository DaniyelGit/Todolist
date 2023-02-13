import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType, TasksType} from "../App";
import {Button} from "./Button";

type TodolistPropsType = {
   title: string
   tasks: TasksType[]
   removeTask: (taskId: string) => void
   changeFilter: (filter: FilterValuesType) => void
   addTask: (titleTask: string) => void
   changeChecked: (taskID: string) => void
}

export const Todolist = (props: TodolistPropsType) => {
   const {
      title,
      tasks,
      changeFilter,
      addTask,
      removeTask,
      changeChecked,
   } = props;

   const [valueInput, setValueInput] = useState<string>('');

   const addTaskHandler = () => {
      addTask(valueInput);
      setValueInput('');
   };

   const changeValueInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setValueInput(e.currentTarget.value);
   };

   const removeTaskHandler = (taskID: string) => {
      removeTask(taskID);
   };

   const changeCheckedHandler = (taskID: string) => {
      changeChecked(taskID);
   };

   const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
         addTaskHandler()
      }
   };

   const mappedTasks = tasks && tasks.map((task, index) => {
      return (
         <li key={task.id}>
            <button onClick={() => removeTaskHandler(task.id)}>x</button>
            <input type="checkbox" checked={task.isDone} onChange={() => changeCheckedHandler(task.id)}/>
            <span>{task.title}</span>
         </li>
      );
   })

   return (
      <div>
         <h3>{title}</h3>
         <div>
            <input value={valueInput} onChange={changeValueInputHandler} onKeyPress={onKeyPressHandler}/>
            <button onClick={addTaskHandler}>+</button>
         </div>
         <ul>
            {mappedTasks}
         </ul>
         <div>
            <Button onClick={() => changeFilter('all')}>all</Button>
            <Button onClick={() => changeFilter('active')}>active</Button>
            <Button onClick={() => changeFilter('completed')}>completed</Button>
         </div>
      </div>
   );
}