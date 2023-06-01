import {TasksReducer, TasksStateType} from "../redux/reducers/tasks-reducer";
import {addTodoAC, removeTodoAC} from "../redux/actions/actionsTodolists";
import {TodolistsDomainType, TodolistReducer} from "../redux/reducers/todolists-reducer";
import {TaskStatuses} from "../api/todolists-api";


test('ids should be equals', () => {
   const startTasksState: TasksStateType = {}
   const startTodolistState: TodolistsDomainType[] = []

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
         {
            id: '1', title: 'CSS', status: TaskStatuses.New,
            order: 0, priority: 1, startDate: '',
            addedDate: '', description: '', deadline: '',
            todoListId: 'todolistId1'
         },
         {
            id: '2', title: 'JS', status: TaskStatuses.Completed,
            order: 0, priority: 1, startDate: '',
            addedDate: '', description: '', deadline: '',
            todoListId: 'todolistId1'
         },
         {
            id: '3', title: 'React', status: TaskStatuses.New,
            order: 0, priority: 1, startDate: '',
            addedDate: '', description: '', deadline: '',
            todoListId: 'todolistId1'
         },
      ],
      'todolistId2': [
         {
            id: '1', title: 'bread', status: TaskStatuses.New,
            order: 0, priority: 0, startDate: '',
            addedDate: '', description: '', deadline: '',
            todoListId: 'todolistId1'
         },
         {
            id: '2', title: 'milk', status: TaskStatuses.New,
            order: 0, priority: 0, startDate: '',
            addedDate: '', description: '', deadline: '',
            todoListId: 'todolistId1'
         },
         {
            id: '3', title: 'tea', status: TaskStatuses.Completed,
            order: 0, priority: 0, startDate: '',
            addedDate: '', description: '', deadline: '',
            todoListId: 'todolistId1',
         }
      ]
   }
   const startTodolistState: TodolistsDomainType[] = [
      {id: 'todolistId1', title: 'todo-1', filter: 'all', order: 0, addedDate: ''},
      {id: 'todolistId2', title: 'todo-2', filter: 'all', order: 0, addedDate: ''},
   ]

   const action = removeTodoAC('todolistId2')

   const endTasksState = TasksReducer(startTasksState, action)
   const endTodolistState = TodolistReducer(startTodolistState, action)

   const keys = Object.keys(endTasksState);
   const restTaskID = keys[0];

   expect(endTodolistState.length).toBe(1);
   expect(restTaskID).toBe(endTodolistState[0].id);
})