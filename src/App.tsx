import React from 'react';
import './App.css';
import {Todolist} from "./components/Todolist/Todolist";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {
   addTodoAC,
   changeFilterTodoAC, changeTodoTitleAC, removeTodoAC,
} from "./redux/actions/actionsTodolists";
import {
   addTaskAC,
   changeTaskStatusAC, changeTaskTitleAC,
   removeTaskAC,
} from "./redux/actions/actionsTasks";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./redux/store";
import {FilterValuesType, TodolistType} from "./redux/reducers/todolists-reducer";
import {TasksStateType} from "./redux/reducers/tasks-reducer";


function App() {
   let todolists = useSelector<AppRootStateType, TodolistType[]>((state) => state.todolists);
   let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);

   const dispatch = useDispatch();


   const removeTask = (todoID: string, taskId: string) => {
      dispatch(removeTaskAC(todoID, taskId));
   }
   const changeFilter = (todoID: string, valueFilter: FilterValuesType) => {
      dispatch(changeFilterTodoAC(todoID, valueFilter));
   };
   const addTask = (todoID: string, titleTask: string) => {
      dispatch(addTaskAC(todoID, titleTask));
   };
   const changeStatusTask = (todoID: string, taskID: string, eventBool: boolean) => {
      dispatch(changeTaskStatusAC(todoID, taskID, eventBool));
   };
   const addTodolist = (titleValue: string) => {
      dispatch(addTodoAC(titleValue));
   }
   const removeTodolist = (todoID: string) => {
      dispatch(removeTodoAC(todoID));
   }

   const updateTitleTask = (todoID: string, taskID: string, newTitleTask: string) => {
      dispatch(changeTaskTitleAC(todoID, taskID, newTitleTask));
   }
   const updateTitleTodolist = (todoID: string, newTitleTodo: string) => {
      dispatch(changeTodoTitleAC(todoID, newTitleTodo));
   }
   return (
      <div className="App">
         <div>
            <AddItemForm addItem={addTodolist}/>
         </div>
         {
            todolists.map(tl => {
               let filteredTasks = tasks[tl.id];
               if (tl.filter === 'active') {
                  filteredTasks = tasks[tl.id].filter(item => !item.isDone)
               }
               if (tl.filter === 'completed') {
                  filteredTasks = tasks[tl.id].filter(item => item.isDone)
               }
               return (
                  <Todolist
                     key={tl.id}
                     todoID={tl.id}
                     title={tl.title}
                     tasks={filteredTasks}
                     filter={tl.filter}
                     removeTask={removeTask}
                     changeFilter={changeFilter}
                     addTask={addTask}
                     changeStatusTask={changeStatusTask}
                     removeTodolist={removeTodolist}
                     updateTitleTask={updateTitleTask}
                     updateTitleTodolist={updateTitleTodolist}
                  />
               );
            })
         }

      </div>
   );
}

export default App;
