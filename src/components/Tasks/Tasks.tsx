import React, {ChangeEvent} from 'react';
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

export const Tasks = (props: TasksPropsType) => {
   const {
      task,
      removeTask,
      changeStatusTask,
      changeTaskTitle
   } = props;

   const removeTaskHandler = () => {
      removeTask(task.id);
   }

   const changeCheckedHandler = (isChecked: boolean) => {
      changeStatusTask(task.id, isChecked);
   }

   const updateTitleTaskHandler = (newTitle: string) => {
      changeTaskTitle(task.id, newTitle);
   }


   return (
      <li key={task.id} className={task.isDone ? s.taskIsDone : ''}>
         <Button onClick={removeTaskHandler}>x</Button>
         <CheckBox checked={task.isDone} changeChecked={changeCheckedHandler}/>
         <EditableSpan oldTitle={task.title} callBack={updateTitleTaskHandler}/>
      </li>
   );
};