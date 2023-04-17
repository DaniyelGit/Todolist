import React, {ChangeEvent, memo, useCallback} from 'react';
import s from "../Todolist/Todolist.module.css";
import {Button} from "../Button";
import {CheckBox} from "../CheckBox/CheckBox";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {TasksType} from "../../redux/reducers/tasks-reducer";


type TasksPropsType = {
   task: TasksType
   removeTask: (taskId: string) => void
   changeStatusTask: (taskID: string, eventBool: boolean) => void
   changeTaskTitle: (taskID: string, newTitle: string) => void
}

export const Tasks = memo((props: TasksPropsType) => {
   const {
      task,
      removeTask,
      changeStatusTask,
      changeTaskTitle
   } = props;

   const removeTaskHandler = useCallback(() => {
      removeTask(task.id);
   }, [removeTask, task.id]);

   const changeCheckedHandler = useCallback((isChecked: boolean) => {
      changeStatusTask(task.id, isChecked);
   }, [changeStatusTask, task.id])

   const updateTitleTaskHandler = useCallback((newTitle: string) => {
      changeTaskTitle(task.id, newTitle);
   }, [changeTaskTitle, task.id])


   return (
      <li key={task.id} className={task.isDone ? s.taskIsDone : ''}>
         <Button onClick={removeTaskHandler}>x</Button>
         <CheckBox checked={task.isDone} changeChecked={changeCheckedHandler}/>
         <EditableSpan oldTitle={task.title} callBack={updateTitleTaskHandler}/>
      </li>
   );
});