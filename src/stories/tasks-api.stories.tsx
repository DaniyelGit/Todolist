import React, {useState} from 'react';
import {tasksAPI} from "../api/todolists-api";

export default {
   title: 'API-Tasks'
}

export const GetTasks = () => {
   const [state, setState] = useState<any>(null)
   const [todolistId, setTodolistId] = useState<any>('34ecc68e-20dc-4705-b80f-040164b6582f');

   const getTasks = () => {
      tasksAPI.getTasks(todolistId)
         .then(res => {
            setState(res.data);
         })
   }

   return (
      <div>
         {JSON.stringify(state)}
         <div>
            <input type="text"
                   value={todolistId}
                   placeholder="todoID"
                   onChange={(e) => setTodolistId(e.currentTarget.value)}
            />
            <button onClick={getTasks}>get tasks</button>
         </div>
      </div>
   )
};

export const CreateTask = () => {
   const [state, setState] = useState<any>(null);
   const [taskTitle, setTaskTitle] = useState<any>('');
   const [todolistId, setTodolistId] = useState<any>('34ecc68e-20dc-4705-b80f-040164b6582f');

   const createTask = () => {
      tasksAPI.createTask(todolistId, taskTitle)
         .then(res => {
            setState(res.data);
         })
   }

   return (
      <div>
         {JSON.stringify(state)}
         <div>
            <input type="text"
                   value={todolistId}
                   placeholder="todoID"
                   onChange={(e) => setTodolistId(e.currentTarget.value)}
            />
            <input type="text"
                   value={taskTitle}
                   placeholder="task title"
                   onChange={(e) => setTaskTitle(e.currentTarget.value)}
            />
            <button onClick={createTask}>create task</button>
         </div>
      </div>
   )
};

export const UpdateTask = () => {
   const [state, setState] = useState<any>(null)
   const [taskId, setTaskId] = useState<any>('');
   const [todolistId, setTodolistId] = useState<any>('34ecc68e-20dc-4705-b80f-040164b6582f');
   const [title, setTitle] = useState<any>('test-task-title');
   const [description, setDescription] = useState<any>('description-1');
   const [status, setStatus] = useState<number>(0);
   const [priority, setPriority] = useState<number>(0);
   const [deadline, setDeadline] = useState<string>('');
   const [startDate, setStartDate] = useState<any>('');


   const updateTask = () => {
      tasksAPI.updateTask(todolistId, taskId, {
         deadline, priority, description,
         title, status, startDate
      })
         .then(res => {
            setState(res.data);
         })
   }

   return (
      <div>
         {JSON.stringify(state)}
         <div>
            <input type="text"
                   value={todolistId}
                   placeholder="todoID"
                   onChange={(e) => setTodolistId(e.currentTarget.value)}
            />
            <input type="text"
                   value={taskId}
                   placeholder="taskID"
                   onChange={(e) => setTaskId(e.currentTarget.value)}
            />
            <input type="text"
                   value={description}
                   placeholder="description"
                   onChange={(e) => setDescription(e.currentTarget.value)}
            />
            <input type="text"
                   value={title}
                   placeholder="taskTitle"
                   onChange={(e) => setTitle(e.currentTarget.value)}
            />
            <button onClick={updateTask}>update task</button>
         </div>
      </div>
   )
};

export const DeleteTask = () => {
   const [state, setState] = useState<any>(null)
   const [taskId, setTaskId] = useState<any>('');
   const [todolistId, setTodolistId] = useState<any>('');

   const deleteTask = () => {
      tasksAPI.deleteTask(todolistId, taskId)
         .then(res => {
            setState(res.data);
         })
   }

   return (
      <div>
         {JSON.stringify(state)}
         <div>
            <input type="text"
                   value={todolistId}
                   placeholder="todoID"
                   onChange={(e) => setTodolistId(e.currentTarget.value)}
            />
            <input type="text"
                   value={taskId}
                   placeholder="taskID"
                   onChange={(e) => setTaskId(e.currentTarget.value)}
            />
            <button onClick={deleteTask}>create task</button>
         </div>
      </div>
   )
};

