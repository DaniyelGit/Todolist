import {ACTIONS_TODOLISTS, ActionsType} from "../actions/actionsTodolists";
import {TodolistType} from "../../api/todolists-api";



export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
};

export type FilterValuesType = 'all' | 'active' | 'completed';

const initialStateTodolist: TodolistDomainType[] = [];

export const TodolistReducer = (state: TodolistDomainType[] = initialStateTodolist, action: ActionsType): TodolistDomainType[] => {
   switch (action.type) {
      case ACTIONS_TODOLISTS.REMOVE_TODOLIST: {
         return state.filter(tl => tl.id !== action.payload);
      }
      case ACTIONS_TODOLISTS.ADD_TODOLIST: {
         const newTodolist: TodolistDomainType = {
            ...action.payload,
            filter: 'all',
            addedDate: '',
            order: 0
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
      default: {
         return state;
      }
   }
}




