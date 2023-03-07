import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from './Todolist.module.css';

import {FilterValuesType, TasksType} from "../../App";
import {Button} from "../Button";
import {AddItemForm} from "../AddItemForm/AddItemForm";

type TodolistPropsType = {
   todoID: string
   title: string
   tasks: TasksType[]
   removeTask: (todoID: string, taskId: string) => void
   changeFilter: (todoID: string, valueFilter: FilterValuesType) => void
   addTask: (todoID: string, titleTask: string) => void
   changeChecked: (todoID: string, eventBool: boolean, taskID: string) => void
   removeTodolist: (todoID: string) => void
}

export const Todolist = (props: TodolistPropsType) => {
   const {
      todoID,
      title,
      tasks,
      changeFilter,
      addTask,
      removeTask,
      changeChecked,
      removeTodolist,
   } = props;

   const [styleForBtnFiltered, setStyleForBtnFiltered] = useState<FilterValuesType>('all')

   const removeTaskHandler = (taskID: string) => {
      removeTask(todoID, taskID);
   };

   const addTaskHandler = (titleValue: string) => {
      addTask(todoID, titleValue);
   }

   const changeCheckedHandler = (eventBool: boolean, taskID: string) => {
      changeChecked(todoID, eventBool, taskID);
   };

   const changeFilterHandler = (valueFilter: FilterValuesType) => {
      changeFilter(todoID, valueFilter);
      setStyleForBtnFiltered(valueFilter);
   };

   const removeTodolistHandler = () => {
      removeTodolist(todoID);
   };

   const mappedTasks = tasks && tasks.map(task => {
      return (
         <li key={task.id} className={task.isDone ? s.taskIsDone : ''}>
            <button onClick={() => removeTaskHandler(task.id)}>x</button>
            <input type="checkbox" checked={task.isDone} onChange={(e) => changeCheckedHandler(e.currentTarget.checked, task.id)}/>
            <span>{task.title}</span>
         </li>
      );
   });


   return (
      <div>
         <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
            <h3>{title}</h3>
            <Button onClick={removeTodolistHandler}>X</Button>
         </div>
         <div className={s.wrapper}>
            <AddItemForm addItem={addTaskHandler}/>
         </div>
         <ul>
            {mappedTasks}
         </ul>
         <div>
            <Button className={styleForBtnFiltered === 'all' ? s.activeFilter : ''} onClick={() => changeFilterHandler('all')}>all</Button>
            <Button className={styleForBtnFiltered === 'active' ? s.activeFilter : ''} onClick={() => changeFilterHandler('active')}>active</Button>
            <Button className={styleForBtnFiltered === 'completed' ? s.activeFilter : ''} onClick={() => changeFilterHandler('completed')}>completed</Button>
         </div>
      </div>
   );
}