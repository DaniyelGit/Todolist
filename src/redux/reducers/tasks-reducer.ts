import {v1} from "uuid";
import {ACTIONS_TASKS, ActionsTypes} from "../actions/actionsTasks";
import {ACTIONS_TODOLISTS} from "../actions/actionsTodolists";


export type TasksType = {
   id: string
   title: string
   isDone: boolean
}
export type TasksStateType = {
   [key: string]: TasksType[]
}

const initialStateTasks = {} as TasksStateType

export const TasksReducer = (state: TasksStateType = initialStateTasks, action: ActionsTypes): TasksStateType => {
   switch (action.type) {
      case ACTIONS_TASKS.REMOVE_TASK: {
         return {
            ...state,
            [action.todoID]: state[action.todoID].filter(t => t.id !== action.taskID)
         };
      }
      case ACTIONS_TASKS.ADD_TASK: {
         const newTask = {id: v1(), title: action.title, isDone: false};
         return  {
            ...state,
            [action.todoID]: [...state[action.todoID], newTask]
         }
      }
      case ACTIONS_TASKS.CHANGE_TASK_STATUS: {
         return {
            ...state,
            [action.todoID]: state[action.todoID]
               .map(t => t.id === action.taskID ? {...t, isDone: action.isDone} : t)
         }
      }
      case ACTIONS_TASKS.CHANGE_TASK_TITLE: {
         return {
            ...state,
            [action.todoID]: state[action.todoID]
               .map(t => t.id === action.taskID ? {...t, title: action.newTitle} : t)
         }
      }
      case ACTIONS_TODOLISTS.ADD_TODOLIST: {
         return  {
            ...state,
            [action.payload.id]: []
         }
      }
      case ACTIONS_TODOLISTS.REMOVE_TODOLIST: {
         const copyState = {...state}
         delete copyState[action.payload]
         return copyState;
      }

      default: {
         return state;
      }
   }
}