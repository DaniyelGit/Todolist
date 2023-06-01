import React, {ChangeEvent, memo, useCallback} from 'react';
import s from "../Todolist/Todolist.module.css";
import IconButton from '@mui/material/IconButton';
import HighlightOff from '@mui/icons-material/HighlightOff';
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {TaskStatuses, TaskType} from "../../api/todolists-api";
import Checkbox from '@mui/material/Checkbox';
import styled from "styled-components";


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


   const changeStatusTaskHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      const newIsDoneValue = e.currentTarget.checked;
      changeStatusTask(task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New);
   }, [changeStatusTask, task.id])

   const updateTitleTaskHandler = useCallback((newTitle: string) => {
      changeTaskTitle(task.id, newTitle);
   }, [changeTaskTitle, task.id])


   return (
      <li key={task.id} className={`${s.task} ${task.status === TaskStatuses.Completed ? s.taskIsDone : ''}`}>
         <StyledCheckBox checked={task.status === TaskStatuses.Completed} onChange={changeStatusTaskHandler}/>
         <EditableSpan oldTitle={task.title} callBack={updateTitleTaskHandler}/>
         <DeleteTaskButton onClick={removeTaskHandler}>
            <HighlightOff color={"error"}/>
         </DeleteTaskButton>
      </li>
   );
});

const StyledCheckBox = styled(Checkbox)`
  ${'MuiButtonBase-root'}: {
    flex-grow: 0;
  }
`
const DeleteTaskButton = styled(IconButton)`
   margin-left: auto;
`