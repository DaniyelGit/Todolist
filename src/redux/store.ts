import {combineReducers, legacy_createStore} from "redux";
import {TodolistReducer} from "./reducers/todolists-reducer";
import {TasksReducer} from "./reducers/tasks-reducer";


const rootReducer = combineReducers({
   todolists: TodolistReducer,
   tasks: TasksReducer,
})

export const store = legacy_createStore(rootReducer);

export type AppRootStateType = ReturnType<typeof rootReducer>;


// @ts-ignore
window.store = store;
