import {ACTIONS_TASKS, TasksActionsType} from "../actions/actionsTasks";
import {ACTIONS_TODOLISTS} from "../actions/actionsTodolists";
import {TaskType} from "../../api/todolists-api";


export type TasksStateType = {
   [key: string]: TaskType[]
}

const initialStateTasks: TasksStateType = {};

export const TasksReducer = (state: TasksStateType = initialStateTasks, action: TasksActionsType): TasksStateType => {
   switch (action.type) {
      case ACTIONS_TASKS.REMOVE_TASK: {
         return {
            ...state,
            [action.todoID]: state[action.todoID].filter(t => t.id !== action.taskID)
         };
      }
      case ACTIONS_TASKS.ADD_TASK: {
         return {
            ...state,
            [action.todoId]: [...state[action.todoId], action.task]
         }
      }
      case ACTIONS_TODOLISTS.ADD_TODOLIST: {
         return {
            ...state,
            [action.todolist.id]: []
         }
      }
      case ACTIONS_TODOLISTS.REMOVE_TODOLIST: {
         const copyState = {...state}
         delete copyState[action.payload]
         return copyState;
      }
      case ACTIONS_TODOLISTS.SET_TODOLISTS: {
         const stateCopy = {...state};
         action.todolists.forEach(tl => {
            stateCopy[tl.id] = [];
         })
         return stateCopy;
      }
      case ACTIONS_TASKS.SET_TASKS: {
         return {
            ...state,
            [action.todoId]: action.tasks
         }
      }
      case ACTIONS_TASKS.UPDATE_TASK: {
         return {
            ...state,
            [action.todoId]: state[action.todoId].map(t => t.id === action.taskId ? {...t, ...action.payload} : t),
         }
      }
      default: {
         return state;
      }
   }
}