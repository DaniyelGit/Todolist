import {ACTIONS_TODOLISTS, ActionsType} from "../actions/actionsTodolists";


export type TodolistType = {
   id: string
   title: string
   filter: FilterValuesType
}
export type FilterValuesType = 'all' | 'active' | 'completed';

const initialStateTodolist = [] as TodolistType[];

export const TodolistReducer = (state: TodolistType[] = initialStateTodolist, action: ActionsType): TodolistType[] => {
   switch (action.type) {
      case ACTIONS_TODOLISTS.REMOVE_TODOLIST: {
         return state.filter(tl => tl.id !== action.payload);
      }
      case ACTIONS_TODOLISTS.ADD_TODOLIST: {
         const newTodolist: TodolistType = {
            ...action.payload,
            filter: 'all',
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




