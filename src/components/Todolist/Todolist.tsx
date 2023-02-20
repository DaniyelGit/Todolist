import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from './Todolist.module.css';

import {FilterValuesType, TasksType} from "../../App";
import {Button} from "../Button";

type TodolistPropsType = {
   title: string
   tasks: TasksType[]
   removeTask: (taskId: string) => void
   changeFilter: (filter: FilterValuesType) => void
   addTask: (titleTask: string) => void
   changeChecked: (eventBool: boolean, taskID: string) => void
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
   const [error, setError] = useState<string | null>(null);

   const [styleForBtnFiltered, setStyleForBtnFiltered] = useState<FilterValuesType>('all')

   const addTaskHandler = () => {
      if (valueInput.trim() !== '') {
         addTask(valueInput.trim());
         setValueInput('');
      }
      else {
         setError('Title is reqired');
      }
   };

   const changeValueInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setValueInput(e.currentTarget.value);

      error && setError(null);
   };

   const removeTaskHandler = (taskID: string) => {
      removeTask(taskID);
   };

   const changeCheckedHandler = (eventBool: boolean, taskID: string) => {
      changeChecked(eventBool, taskID);
   };

   const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
         addTaskHandler()
      }
   };

   const changeFilterHandler = (filter: FilterValuesType) => {
      changeFilter(filter);
      setStyleForBtnFiltered(filter);
   }

   const mappedTasks = tasks && tasks.map(task => {
      return (
         <li key={task.id} className={task.isDone ? s.taskIsDone : ''}>
            <button onClick={() => removeTaskHandler(task.id)}>x</button>
            <input type="checkbox" checked={task.isDone} onChange={(e) => changeCheckedHandler(e.currentTarget.checked, task.id)}/>
            <span>{task.title}</span>
         </li>
      );
   })

   return (
      <div>
         <h3>{title}</h3>
         <div className={s.wrapper}>
            <input className={error ? s.error : ''} value={valueInput} onChange={changeValueInputHandler} onKeyPress={onKeyPressHandler}/>
            <button onClick={addTaskHandler}>+</button>
            {
               error &&  <div className={s.errorMessage}>{error}</div>
            }
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