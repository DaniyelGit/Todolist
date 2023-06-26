import {ACTIONS_TODOLISTS, TodolistsActionsType} from "../actions/actionsTodolists";
import {TodolistType} from "../../api/todolists-api";
import {RequestStatusType} from "./app-reducer";


export type TodolistsDomainType = TodolistType & {
   filter: FilterValuesType
   entityStatus: RequestStatusType
};

export type FilterValuesType = 'all' | 'active' | 'completed';

const initialStateTodolist: TodolistsDomainType[] = [];

export const TodolistReducer = (state: TodolistsDomainType[] = initialStateTodolist, action: TodolistsActionsType): TodolistsDomainType[] => {
   switch (action.type) {
      case ACTIONS_TODOLISTS.REMOVE_TODOLIST: {
         return state.filter(tl => tl.id !== action.payload);
      }
      case ACTIONS_TODOLISTS.ADD_TODOLIST: {
         const newTodolist: TodolistsDomainType = {
            ...action.todolist,
            filter: 'all',
            entityStatus: 'idle',
         }
         return [newTodolist, ...state];
      }
      case ACTIONS_TODOLISTS.CHANGE_TODOLIST_TITLE: {
         return state.map(tl => tl.id === action.payload.id
            ? {...tl, title: action.payload.newTodolistTitle}
            : tl);
      }
      case ACTIONS_TODOLISTS.CHANGE_TODOLIST_FILTER: {
         return state.map(tl => tl.id === action.payload.id
            ? {...tl, filter: action.payload.valueFilter}
            : tl);
      }
      case ACTIONS_TODOLISTS.SET_TODOLISTS: {
         return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}));
      }
      case ACTIONS_TODOLISTS.SET_ENTITY_STATUS: {
         return state.map(tl => tl.id === action.todoId ? {...tl, entityStatus: action.entityStatus} : tl);
      }
      case ACTIONS_TODOLISTS.CLEAR_TODOLISTS_DATA: {
         return [];
      }
      default: {
         return state;
      }
   }
}




