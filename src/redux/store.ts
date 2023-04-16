import {combineReducers, compose, legacy_createStore} from "redux";
import {TodolistReducer} from "./reducers/todolists-reducer";
import {TasksReducer} from "./reducers/tasks-reducer";

declare global {
   interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
   }
}

const rootReducer = combineReducers({
   todolists: TodolistReducer,
   tasks: TasksReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


export const store = legacy_createStore(rootReducer, composeEnhancers());

export type AppRootStateType = ReturnType<typeof rootReducer>;


// @ts-ignore
window.store = store;
