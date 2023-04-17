import React, {memo, useCallback, useState} from "react";
import s from './Todolist.module.css';
import {Button} from "../Button";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {FilterValuesType, TodolistType} from "../../redux/reducers/todolists-reducer";
import {Tasks} from "../Tasks/Tasks";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {TasksType} from "../../redux/reducers/tasks-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../redux/actions/actionsTasks";
import {changeFilterTodoAC, changeTodoTitleAC, removeTodoAC} from "../../redux/actions/actionsTodolists";


type TodolistPropsType = {
   todolist: TodolistType
}

export const Todolist = memo((props: TodolistPropsType) => {
   const {
      todolist,
   } = props;

   const {id, title, filter} = todolist;

   let tasks = useSelector<AppRootStateType, TasksType[]>(state => state.tasks[id]);
   const dispatch = useDispatch();

   const [styleForBtnFiltered, setStyleForBtnFiltered] = useState<FilterValuesType>(filter);

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

   const changeStatusTask = useCallback((taskID: string, eventBool: boolean) => {
      dispatch(changeTaskStatusAC(id, taskID, eventBool));
   }, [id]);


   // ?????
   const changeFilter = useCallback((valueFilter: FilterValuesType) => {
      dispatch(changeFilterTodoAC(id, valueFilter));
      setStyleForBtnFiltered(valueFilter);
   }, [id]);
   // ?????
   const removeTodolist = useCallback(() => {
      dispatch(removeTodoAC(id));
   }, [id]);

   if (filter === 'active') {
      tasks = tasks.filter(item => !item.isDone)
   }
   if (filter === 'completed') {
      tasks = tasks.filter(item => item.isDone)
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
            <Button onClick={removeTodolist}>X</Button>
         </div>
         <div className={s.wrapper}>
            <AddItemForm addItem={addTask}/>
         </div>
         <ul>
            {mappedTasks}
         </ul>
         <div style={{display: 'flex', gap: '5px'}}>
            <Button className={styleForBtnFiltered === 'all' ? s.activeFilter : ''}
                    onClick={() => changeFilter('all')}
            >
               all
            </Button
            >
            <Button className={styleForBtnFiltered === 'active' ? s.activeFilter : ''}
                    onClick={() => changeFilter('active')}
            >
               active
            </Button>
            <Button className={styleForBtnFiltered === 'completed' ? s.activeFilter : ''}
                    onClick={() => changeFilter('completed')}
            >
               completed
            </Button>
         </div>
      </div>
   );
});