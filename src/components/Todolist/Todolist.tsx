import React, {useState} from "react";
import s from './Todolist.module.css';


import {Button} from "../Button";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {CheckBox} from "../CheckBox/CheckBox";
import {FilterValuesType} from "../../redux/reducers/todolists-reducer";
import {TasksType} from "../../redux/reducers/tasks-reducer";


type TodolistPropsType = {
   todoID: string
   title: string
   tasks: TasksType[]
   filter: FilterValuesType
   removeTask: (todoID: string, taskId: string) => void
   changeFilter: (todoID: string, valueFilter: FilterValuesType) => void
   addTask: (todoID: string, titleTask: string) => void
   changeStatusTask: (todoID: string, taskID: string, eventBool: boolean) => void
   removeTodolist: (todoID: string) => void
   updateTitleTodolist: (todoID: string, newTitleTodo: string) => void
   updateTitleTask: (todoID: string, taskID: string, newTitleTask: string) => void
}

export const Todolist = (props: TodolistPropsType) => {
   const {
      todoID,
      title,
      tasks,
      filter,
      changeFilter,
      addTask,
      removeTask,
      changeStatusTask,
      removeTodolist,
      updateTitleTask,
      updateTitleTodolist
   } = props;

   const [styleForBtnFiltered, setStyleForBtnFiltered] = useState<FilterValuesType>(filter)

   const removeTaskHandler = (taskID: string) => {
      removeTask(todoID, taskID);
   };

   const updateTitleTaskHandler = (taskID: string, newTitle: string) => {
      updateTitleTask(todoID, taskID, newTitle);
   }

   const updateTitleTodoHandler = (newTitleTodo: string) => {
      updateTitleTodolist(todoID, newTitleTodo);
   }

   const addTaskHandler = (titleValue: string) => {
      addTask(todoID, titleValue);
   }

   const changeStatusHandler = (taskID: string, eventBool: boolean ) => {
      changeStatusTask(todoID, taskID, eventBool);
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
            <Button onClick={() => removeTaskHandler(task.id)}>x</Button>
            <CheckBox checked={task.isDone} changeChecked={(isDone: boolean) => changeStatusHandler(task.id, isDone)}/>
            <EditableSpan oldTitle={task.title}
                          callBack={(newTitle: string) => updateTitleTaskHandler(task.id, newTitle)}/>
         </li>
      );
   });

   return (
      <div>
         <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
            <h3>
               <EditableSpan
                  oldTitle={title}
                  callBack={updateTitleTodoHandler}
               />
            </h3>
            <Button
               onClick={removeTodolistHandler}
            >
               X
            </Button>
         </div>
         <div className={s.wrapper}>
            <AddItemForm addItem={addTaskHandler}/>
         </div>
         <ul>
            {mappedTasks}
         </ul>
         <div style={{display: 'flex', gap: '5px'}}>
            <Button className={styleForBtnFiltered === 'all' ? s.activeFilter : ''}
                    onClick={() => changeFilterHandler('all')}
            >
               all
            </Button
                    >
            <Button className={styleForBtnFiltered === 'active' ? s.activeFilter : ''}
                    onClick={() => changeFilterHandler('active')}
            >
               active
            </Button>
            <Button className={styleForBtnFiltered === 'completed' ? s.activeFilter : ''}
                    onClick={() => changeFilterHandler('completed')}
            >
               completed
            </Button>
         </div>
      </div>
   );
}