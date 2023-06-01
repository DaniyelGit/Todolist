import {AnyAction, combineReducers, legacy_createStore, applyMiddleware} from "redux";
import {TodolistReducer} from "./reducers/todolists-reducer";
import {TasksReducer} from "./reducers/tasks-reducer";
import thunk, {ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";

const rootReducer = combineReducers({
   todolists: TodolistReducer,
   tasks: TasksReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export const useAppDispatch = () => useDispatch<AppDispatchType>();

export type AppRootStateType = ReturnType<typeof rootReducer>;
// type for ThunkDispatch
type AppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>;

// @ts-ignore
window.store = store;
