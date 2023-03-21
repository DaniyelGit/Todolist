import {
   addTodolistAC,
   changeFilterTodolistAC,
   changeTodolistTitleAC,
   removeTodolistAC,
   TodolistReducer
} from "./todolists-reducer";
import {v1} from 'uuid';
import {FilterValuesType, TodolistType} from '../../App';

test('correct todolist should be removed', () => {
   let todolistId1 = v1();
   let todolistId2 = v1();

   const startState: Array<TodolistType> = [
      {id: todolistId1, title: "What to learn", filter: "all"},
      {id: todolistId2, title: "What to buy", filter: "all"}
   ]

   const endState = TodolistReducer(startState, removeTodolistAC(todolistId1));

   expect(endState.length).toBe(1);
   expect(endState[0].id).toBe(todolistId2);
});
test('correct todolist should be added', () => {
   let todolistId1 = v1();
   let todolistId2 = v1();

   let newTodolistTitle = "New Todolist";

   const startState: Array<TodolistType> = [
      {id: todolistId1, title: "What to learn", filter: "all"},
      {id: todolistId2, title: "What to buy", filter: "all"}
   ]

   const endState = TodolistReducer(startState, addTodolistAC(newTodolistTitle));

   expect(endState.length).toBe(3);
   expect(endState[0].title).toBe(newTodolistTitle);
});
test('correct todolist should change its title', () => {
   let todolistId1 = v1();
   let todolistId2 = v1();

   let newTodolistTitle = "New Todolist";

   const startState: Array<TodolistType> = [
      {id: todolistId1, title: "What to learn", filter: "all"},
      {id: todolistId2, title: "What to buy", filter: "all"}
   ]

   const endState = TodolistReducer(startState, changeTodolistTitleAC(todolistId2, newTodolistTitle));

   expect(endState[0].title).toBe("What to learn");
   expect(endState[1].title).toBe(newTodolistTitle);
});
test('correct filter of todolist should be changed', () => {
   let todolistId1 = v1();
   let todolistId2 = v1();

   let newFilter: FilterValuesType = "completed";

   const startState: Array<TodolistType> = [
      {id: todolistId1, title: "What to learn", filter: "all"},
      {id: todolistId2, title: "What to buy", filter: "all"}
   ]

   const endState = TodolistReducer(startState, changeFilterTodolistAC(todolistId2, newFilter));

   expect(endState[0].filter).toBe("all");
   expect(endState[1].filter).toBe(newFilter);
});