import React, {memo, useCallback} from "react";
import s from './Todolist.module.css';
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {FilterValuesType, TodolistDomainType} from "../../redux/reducers/todolists-reducer";
import {Tasks} from "../Tasks/Tasks";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";

import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../redux/actions/actionsTasks";
import {changeFilterTodoAC, changeTodoTitleAC, removeTodoAC} from "../../redux/actions/actionsTodolists";
import {TaskStatuses, TaskType} from "../../api/todolists-api";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Button} from "../Button";
import styled from "styled-components";



type TodolistPropsType = {
   todolist: TodolistDomainType
}

export const Todolist = memo((props: TodolistPropsType) => {
   const {
      todolist,
   } = props;

   const {id, title, filter} = todolist;

   let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[id]);
   const dispatch = useDispatch();

   const removeTask = useCallback((taskID: string) => {
      dispatch(removeTaskAC(id, taskID));
   }, [id]);

   const changeTaskTitle = useCallback((taskID: string, newTitle: string) => {
      dispatch(changeTaskTitleAC(id, taskID, newTitle));
   }, [id]);

   const changeTodolistTitle = useCallback((newTitleTodolist: string) => {
      dispatch(changeTodoTitleAC(id, newTitleTodolist));
   }, [id])

   const addTask = useCallback((title: string) => {
      dispatch(addTaskAC(id, title));
   }, [id]);

   const changeStatusTask = useCallback((taskID: string, status: TaskStatuses) => {
      dispatch(changeTaskStatusAC(id, taskID, status));
   }, [id]);


   const changeFilter = useCallback((valueFilter: FilterValuesType) => {
      dispatch(changeFilterTodoAC(id, valueFilter));
   }, [id, filter]);

   const removeTodolist = useCallback(() => {
      dispatch(removeTodoAC(id));
   }, [id]);

   if (filter === 'active') {
      tasks = tasks.filter(item => item.status === TaskStatuses.New)
   }
   if (filter === 'completed') {
      tasks = tasks.filter(item => item.status === TaskStatuses.Completed)
   }

   const mappedTasks = tasks && tasks.map(t => {
      return (
         <Tasks
            key={t.id}
            task={t}
            removeTask={removeTask}
            changeStatusTask={changeStatusTask}
            changeTaskTitle={changeTaskTitle}
         />
      );
   });

   return (
      <div>
         <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
            <h3>
               <EditableSpan
                  oldTitle={title}
                  callBack={changeTodolistTitle}
               />
            </h3>
            <IconButton aria-label="delete" color={"error"}>
               <Delete />
            </IconButton>
         </div>
         <div className={s.wrapper}>
            <AddItemForm addItem={addTask} />
         </div>
         <TasksList>
            {mappedTasks}
         </TasksList>
         <div style={{display: 'flex', gap: '5px'}}>
            <Button className={filter === 'all' ? s.activeFilter : ''}
                    onClick={() => changeFilter('all')}
            >
               all
            </Button
            >
            <Button className={filter === 'active' ? s.activeFilter : ''}
                    onClick={() => changeFilter('active')}
            >
               active
            </Button>
            <Button className={filter === 'completed' ? s.activeFilter : ''}
                    onClick={() => changeFilter('completed')}
            >
               completed
            </Button>
         </div>
      </div>
   );
});

const TasksList = styled.ul`
  margin: 0;
  padding: 5px 0 20px 0;
  list-style: none;
`