import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../redux/actions/actionsTasks";
import {addTodoAC, removeTodoAC} from "../redux/actions/actionsTodolists";
import {TasksReducer, TasksStateType} from "../redux/reducers/tasks-reducer";
import {TaskStatuses} from "../api/todolists-api";

let startState: TasksStateType;

beforeEach(() => {
   startState = {
      'todolistId1': [
         {
            id: '1', title: 'CSS', status: 0,
            order: 0, priority: 1, startDate: '',
            addedDate: '', description: '', deadline: '',
            todoListId: 'todolistId1'
         },
         {
            id: '2', title: 'JS', status: 2,
            order: 0, priority: 1, startDate: '',
            addedDate: '', description: '', deadline: '',
            todoListId: 'todolistId1'
         },
         {
            id: '3', title: 'React', status: 0,
            order: 0, priority: 1, startDate: '',
            addedDate: '', description: '', deadline: '',
            todoListId: 'todolistId1'
         },
      ],
      'todolistId2': [
         {
            id: '1', title: 'bread', status: 0,
            order: 0, priority: 0, startDate: '',
            addedDate: '', description: '', deadline: '',
            todoListId: 'todolistId2'
         },
         {
            id: '2', title: 'milk', status: 2,
            order: 0, priority: 0, startDate: '',
            addedDate: '', description: '', deadline: '',
            todoListId: 'todolistId2'
         },
         {
            id: '3', title: 'tea', status: 1,
            order: 0, priority: 0, startDate: '',
            addedDate: '', description: '', deadline: '',
            todoListId: 'todolistId2'
         },
      ]
   }
});

test('correct task should be deleted from correct array', () => {
   const action = removeTaskAC('todolistId2', '2')

   const endState = TasksReducer(startState, action)

   expect(endState).toEqual({
      'todolistId1': [
         {
            id: '1', title: 'CSS', status: 0,
            order: 0, priority: 1, startDate: '',
            addedDate: '', description: '', deadline: '',
            todoListId: 'todolistId1'
         },
         {
            id: '2', title: 'JS', status: 2,
            order: 0, priority: 1, startDate: '',
            addedDate: '', description: '', deadline: '',
            todoListId: 'todolistId1'
         },
         {
            id: '3', title: 'React', status: 0,
            order: 0, priority: 1, startDate: '',
            addedDate: '', description: '', deadline: '',
            todoListId: 'todolistId1'
         },
      ],
      'todolistId2': [
         {
            id: '1', title: 'bread', status: 0,
            order: 0, priority: 0, startDate: '',
            addedDate: '', description: '', deadline: '',
            todoListId: 'todolistId2'
         },
         {
            id: '3', title: 'tea', status: 1,
            order: 0, priority: 0, startDate: '',
            addedDate: '', description: '', deadline: '',
            todoListId: 'todolistId2'
         },
      ]
   })
});

/*test('correct task should be added to correct array', () => {
   const action = addTaskAC('todolistId2', 'juce')

   const endState = TasksReducer(startState, action)

   expect(endState['todolistId1'].length).toBe(3)
   expect(endState['todolistId2'].length).toBe(4)
   expect(endState['todolistId2'][3].id).toBeDefined()
   expect(endState['todolistId2'][3].title).toBe('juce')
   expect(endState['todolistId2'][3].status).toBe(TaskStatuses.New)
});*/

test('status of specified task should be changed', () => {
   const action = changeTaskStatusAC('todolistId2', '2', TaskStatuses.New);

   const endState = TasksReducer(startState, action)

   expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed);
   expect(endState['todolistId2'][1].status).toBe(TaskStatuses.New);
});

test('title of specified task should be changed', () => {
   const action = changeTaskTitleAC('todolistId2', '2', 'coffee');

   const endState = TasksReducer(startState, action)

   expect(endState['todolistId1'][1].title).toBe('JS');
   expect(endState['todolistId2'][1].title).toBe('coffee');
});

test('new array should be added when new todolist is added', () => {
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
   const action = removeTodoAC('todolistId2')

   const endState = TasksReducer(startState, action)

   const keys = Object.keys(endState)

   expect(keys.length).toBe(1)
   expect(endState['todolistId2']).not.toBeDefined()
});