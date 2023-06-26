import React, {memo, useCallback, useEffect} from "react";
import s from './Todolist.module.css';
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {FilterValuesType, TodolistsDomainType} from "../../redux/reducers/todolists-reducer";
import {Tasks} from "../Tasks/Tasks";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "../../redux/store";
import {
   createTaskTC, deleteTaskTC,
   getTasksTC, updateTaskTC,
} from "../../redux/actions/actionsTasks";
import {
   changeFilterTodoAC,
   changeTitleTodolistTC,
   removeTodolistTC
} from "../../redux/actions/actionsTodolists";
import {TaskStatuses, TaskType} from "../../api/todolists-api";
import {Box, ButtonGroup, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import Button from '@mui/material/Button';
import styled from "styled-components";

type TodolistPropsType = {
   todolist: TodolistsDomainType
}

export const Todolist = memo((props: TodolistPropsType) => {
   const {
      todolist,
   } = props;

   const {id, title, filter, entityStatus} = todolist;

   let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[id]);
   const dispatch = useAppDispatch();

   const removeTask = useCallback((taskID: string) => {
      dispatch(deleteTaskTC(id, taskID));
   }, [id]);

   const changeTaskTitle = useCallback((taskID: string, newTitle: string) => {
      dispatch(updateTaskTC(id, taskID, {title: newTitle}));
   }, [id]);

   const changeTodolistTitle = useCallback((newTitleTodolist: string) => {
      dispatch(changeTitleTodolistTC(id, newTitleTodolist));
   }, [id])

   const addTask = useCallback((title: string) => {
      dispatch(createTaskTC(id, title));
   }, [id]);

   const changeStatusTask = useCallback((taskID: string, status: TaskStatuses) => {
      dispatch(updateTaskTC(id, taskID, {status: status}));
   }, [id]);


   const changeFilter = useCallback((valueFilter: FilterValuesType) => {
      dispatch(changeFilterTodoAC(id, valueFilter));
   }, [id, filter]);

   const removeTodolist = useCallback(() => {
      dispatch(removeTodolistTC(id));
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
            <IconButton disabled={entityStatus === 'loading'} color={"error"} onClick={removeTodolist}>
               <Delete/>
            </IconButton>
         </div>
         <div className={s.wrapper}>
            <AddItemForm addItem={addTask}/>
         </div>
         <TasksList>
            {mappedTasks}
         </TasksList>
         <StyledBoxButtons>
            <ButtonGroup size={'medium'} variant="contained" aria-label="outlined primary button group">
               <Button onClick={() => changeFilter('all')} color={filter === 'all' ? 'info' : 'primary'}>all</Button>
               <Button onClick={() => changeFilter('active')}
                       color={filter === 'active' ? 'info' : 'primary'}>active</Button>
               <Button onClick={() => changeFilter('completed')}
                       color={filter === 'completed' ? 'info' : 'primary'}>completed</Button>
            </ButtonGroup>
         </StyledBoxButtons>
      </div>
   );
});

const TasksList = styled.ul`
  margin: 0;
  padding: 5px 0 20px 0;
  list-style: none;
`;

const StyledBoxButtons = styled(Box)`
  display: flex;
  justify-content: center;
`;