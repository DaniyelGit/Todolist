import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TasksReducer} from "./tasks-reducer";
import {TasksStateType} from "../../App";
import {addTodoAC, removeTodoAC} from "../todolist-reducer/todolists-reducer";


test('correct task should be deleted from correct array', () => {
   const startState: TasksStateType = {
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

   const action = removeTaskAC('todolistId2', '2')

   const endState = TasksReducer(startState, action)

   expect(endState).toEqual({
      'todolistId1': [
         {id: '1', title: 'CSS', isDone: false},
         {id: '2', title: 'JS', isDone: true},
         {id: '3', title: 'React', isDone: false}
      ],
      'todolistId2': [
         {id: '1', title: 'bread', isDone: false},
         {id: '3', title: 'tea', isDone: false}
      ]
   })
});
test('correct task should be added to correct array', () => {
   const startState: TasksStateType = {
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

   const action = addTaskAC('todolistId2', 'juce')

   const endState = TasksReducer(startState, action)

   expect(endState['todolistId1'].length).toBe(3)
   expect(endState['todolistId2'].length).toBe(4)
   expect(endState['todolistId2'][3].id).toBeDefined()
   expect(endState['todolistId2'][3].title).toBe('juce')
   expect(endState['todolistId2'][3].isDone).toBe(false)
});
test('status of specified task should be changed', () => {
   const startState: TasksStateType = {
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

   const action = changeTaskStatusAC('todolistId2', '2', false);

   const endState = TasksReducer(startState, action)

   expect(endState['todolistId1'][1].isDone).toBe(true);
   expect(endState['todolistId2'][1].isDone).toBe(false);
});
test('title of specified task should be changed', () => {
   const startState: TasksStateType = {
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

   const action = changeTaskTitleAC('todolistId2', '2', 'coffee');

   const endState = TasksReducer(startState, action)

   expect(endState['todolistId1'][1].title).toBe('JS');
   expect(endState['todolistId2'][1].title).toBe('coffee');
});
test('new array should be added when new todolist is added', () => {
   const startState: TasksStateType = {
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

   const action = addTodoAC('new todolist')

   const endState = TasksReducer(startState, action)


   const keys = Object.keys(endState)
   const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
   if (!newKey) {
      throw Error('new key should be added')
   }

   expect(keys.length).toBe(3)
   expect(endState[newKey]).toEqual([])
});
test('property with todolistId should be deleted', () => {
   const startState: TasksStateType = {
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

   const action = removeTodoAC('todolistId2')

   const endState = TasksReducer(startState, action)


   const keys = Object.keys(endState)

   expect(keys.length).toBe(1)
   expect(endState['todolistId2']).not.toBeDefined()
});