import {TasksStateType} from "../../App";
import {v1} from "uuid";
import {addTodoActionType, removeTodoActionType} from "../todolist-reducer/todolists-reducer";


export const TasksReducer = (state: TasksStateType, action: ActionsTypes): TasksStateType => {
   switch (action.type) {
      case 'REMOVE-TASK': {
         return {
            ...state,
            [action.todoID]: state[action.todoID].filter(t => t.id !== action.taskID)
         };
      }
      case 'ADD-TASK': {
         const newTask = {id: v1(), title: action.title, isDone: false};
         return  {
            ...state,
            [action.todoID]: [...state[action.todoID], newTask]
         }
      }
      case 'CHANGE-TASK-STATUS': {
         return {
            ...state,
            [action.todoID]: state[action.todoID]
               .map(t => t.id === action.taskID ? {...t, isDone: action.isDone} : t)
         }
      }
      case 'CHANGE-TASK-TITLE': {
         return {
            ...state,
            [action.todoID]: state[action.todoID]
               .map(t => t.id === action.taskID ? {...t, title: action.newTitle} : t)
         }
      }
      case 'ADD-TODOLIST': {
         return  {
            ...state,
            [action.todoID]: []
         }
      }
      case 'REMOVE-TODOLIST': {
         const copyState = {...state}
         delete copyState[action.payload]
         return copyState;
      }

      default: {
         return state;
      }
   }
}

type ActionsTypes = removeTaskActionType
   | addTaskActionType
   | changeTaskStatusActionType
   | changeTaskTitleActionType
   | addTodoActionType
   | removeTodoActionType;


type removeTaskActionType = ReturnType<typeof removeTaskAC>;
type addTaskActionType = ReturnType<typeof addTaskAC>;
type changeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>;
type changeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>;


export const removeTaskAC = (todoID: string, taskID: string) => {
   return {
      type: 'REMOVE-TASK',
      todoID,
      taskID,
   } as const;
};
export const addTaskAC = (todoID: string, title: string) => {
   return {
      type: 'ADD-TASK',
      todoID,
      title,
   } as const;
};
export const changeTaskStatusAC = (todoID: string, taskID: string, isDone: boolean) => {
   return {
      type: 'CHANGE-TASK-STATUS',
      todoID,
      taskID,
      isDone,
   } as const;
};
export const changeTaskTitleAC = (todoID: string, taskID: string, newTitle: string) => {
   return {
      type: 'CHANGE-TASK-TITLE',
      todoID,
      taskID,
      newTitle,
   } as const;
};
