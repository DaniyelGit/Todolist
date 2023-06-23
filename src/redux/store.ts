import {AnyAction, combineReducers, legacy_createStore, applyMiddleware} from "redux";
import {TodolistReducer} from "./reducers/todolists-reducer";
import {TasksReducer} from "./reducers/tasks-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {useDispatch, TypedUseSelectorHook, useSelector} from "react-redux";
import {TodolistsActionsType} from "./actions/actionsTodolists";
import {TasksActionsType} from "./actions/actionsTasks";
import {AppReducer} from "./reducers/app-reducer"

const rootReducer = combineReducers({
   todolists: TodolistReducer,
   tasks: TasksReducer,
   app: AppReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>;
// type for ThunkDispatch
export type AppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>;
// type for ThunkActions
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>;
//type for AllActionsType
export type AppActionsType = TodolistsActionsType | TasksActionsType;
// custom hook
export const useAppDispatch = () => useDispatch<AppDispatchType>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;

// @ts-ignore
window.store = store;
