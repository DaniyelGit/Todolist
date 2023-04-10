import {FilterValuesType, TodolistType} from "../../App";
import {v1} from "uuid";

const initialState: TodolistType[] = [];

export const TodolistReducer = (state: TodolistType[] = initialState, action: ActionsType): TodolistType[] => {
   switch (action.type) {
      case "REMOVE-TODOLIST": {
         return state.filter(tl => tl.id !== action.payload);
      }
      case "ADD-TODOLIST": {
         const newTodolist: TodolistType = {
            ...action.payload,
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


export type ActionsType = removeTodoActionType
   | addTodoActionType
   | changeTodoTitleActionType
   | changeFilterTodoActionType;

type changeFilterTodoActionType = ReturnType<typeof changeFilterTodoAC>;
type changeTodoTitleActionType = ReturnType<typeof changeTodoTitleAC>;
export type addTodoActionType = ReturnType<typeof addTodoAC>;
export type removeTodoActionType = ReturnType<typeof removeTodoAC>;

export const removeTodoAC = (id: string) => {
   return {
      type: 'REMOVE-TODOLIST',
      payload: id,
   } as const
};
export const addTodoAC = (title: string) => {
   return {
      type: 'ADD-TODOLIST',
      payload: {
         id: v1(),
         title
      },
   } as const
};
export const changeTodoTitleAC = (id: string, newTodolistTitle: string) => {
   return {
      type: 'CHANGE-TODOLIST-TITLE',
      payload: {
         id,
         newTodolistTitle,
      }
   } as const
};
export const changeFilterTodoAC = (id: string, valueFilter: FilterValuesType) => {
   return {
      type: 'CHANGE-TODOLIST-FILTER',
      payload: {
         id,
         valueFilter,
      }
   } as const
}


