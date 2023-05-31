import React, {memo, useCallback} from 'react';
import s from "../Todolist/Todolist.module.css";
import {Button} from "../Button";
import {CheckBox} from "../CheckBox/CheckBox";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {TaskStatuses, TaskType} from "../../api/todolists-api";


type TasksPropsType = {
   task: TaskType
   removeTask: (taskId: string) => void
   changeStatusTask: (taskID: string, status: TaskStatuses) => void
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

   const changeStatusTaskHandler = useCallback((status: TaskStatuses) => {
      changeStatusTask(task.id, status);
   }, [changeStatusTask, task.id])

   const updateTitleTaskHandler = useCallback((newTitle: string) => {
      changeTaskTitle(task.id, newTitle);
   }, [changeTaskTitle, task.id])


   return (
      <li key={task.id} className={`${s.task} ${task.status === TaskStatuses.Completed ? s.taskIsDone : ''}`}>
         <CheckBox checked={task.status} changeStatusTaskHandler={changeStatusTaskHandler}/>
         <EditableSpan oldTitle={task.title} callBack={updateTitleTaskHandler}/>
         <Button onClick={removeTaskHandler}>x</Button>
      </li>
   );
});