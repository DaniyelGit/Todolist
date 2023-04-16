import {TasksReducer, TasksStateType} from "../redux/reducers/tasks-reducer";
import {addTodoAC, removeTodoAC} from "../redux/actions/actionsTodolists";
import {TodolistReducer, TodolistType} from "../redux/reducers/todolists-reducer";


test('ids should be equals', () => {
   const startTasksState: TasksStateType = {}
   const startTodolistState: TodolistType[] = []

   const action = addTodoAC('new todolist')

   const endTasksState = TasksReducer(startTasksState, action)
   const endTodolistState = TodolistReducer(startTodolistState, action)

   const keys = Object.keys(endTasksState)
   const idFromTasks = keys[0]
   const idFromTodolist = endTodolistState[0].id

   expect(idFromTasks).toBe(action.payload.id)
   expect(idFromTodolist).toBe(action.payload.id)
   expect(idFromTodolist).toBe(idFromTodolist)
   expect(idFromTasks).toBe(idFromTodolist)
});
test('correct todolist and state tasks should be removed', () => {
   const startTasksState: TasksStateType = {
      'todolistId1': [
         {id: '1', title: 'CSS', isDone: false},
         {id: '2', title: 'JS', isDone: true},
         {id: '3', title: 'React', isDone: false}
      ],
      'todolistId2': [
         {id: '1', title: 'bread', isDone: false},
         {id: '2', title: 'milk', isDone: true},
         {id: '3', title: 'tea', isDone: false}
      ]
   }
   const startTodolistState: TodolistType[] = [
      {id: 'todolistId1', title: 'todo-1', filter: 'all'},
      {id: 'todolistId2', title: 'todo-2', filter: 'all'},
   ]

   const action = removeTodoAC('todolistId2')

   const endTasksState = TasksReducer(startTasksState, action)
   const endTodolistState = TodolistReducer(startTodolistState, action)

   const keys = Object.keys(endTasksState);
   const restTaskID = keys[0];

   expect(endTodolistState.length).toBe(1);
   expect(restTaskID).toBe(endTodolistState[0].id);
})