import {FilterValuesType, TodolistType} from "../../App";
import {v1} from "uuid";


export const TodolistReducer = (state: TodolistType[], action: ActionsType): TodolistType[] => {
   switch (action.type) {
      case "REMOVE-TODOLIST": {
         return state.filter(tl => tl.id !== action.payload);
      }
      case "ADD-TODOLIST": {
         const newTodolistID = v1();
         const newTodolist: TodolistType = {
            id: newTodolistID,
            title: action.payload,
            filter: 'all',
         }
         return [newTodolist, ...state];
      }
      case "CHANGE-TODOLIST-TITLE": {
         return state.map(tl => tl.id === action.payload.id
            ? {...tl, title: action.payload.newTodolistTitle}
            : tl);
      }
      case "CHANGE-TODOLIST-FILTER": {
         return state.map(tl => tl.id === action.payload.id
         ? {...tl, filter: action.payload.valueFilter}
         : tl);
      }
      default: {
         return state;
      }
   }
}


type ActionsType = ReturnType<typeof removeTodolistAC>
   | ReturnType<typeof addTodolistAC>
   | ReturnType<typeof changeTodolistTitleAC>
   | ReturnType<typeof changeFilterTodolistAC>;

export const removeTodolistAC = (id: string) => {
   return {
      type: 'REMOVE-TODOLIST',
      payload: id,
   } as const
};
export const addTodolistAC = (newTodolistTitle: string) => {
   return {
      type: 'ADD-TODOLIST',
      payload: newTodolistTitle,
   } as const
};
export const changeTodolistTitleAC = (id: string, newTodolistTitle: string) => {
   return {
      type: 'CHANGE-TODOLIST-TITLE',
      payload: {
         id,
         newTodolistTitle,
      }
   } as const
};
export const changeFilterTodolistAC = (id: string, valueFilter: FilterValuesType) => {
   return {
      type: 'CHANGE-TODOLIST-FILTER',
      payload: {
         id,
         valueFilter,
      }
   } as const
}

