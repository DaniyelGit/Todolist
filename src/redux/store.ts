import {AnyAction, combineReducers, legacy_createStore, applyMiddleware} from "redux";
import {TodolistReducer} from "./reducers/todolists-reducer";
import {TasksReducer} from "./reducers/tasks-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {useDispatch} from "react-redux";
import {TodolistsActionsType} from "./actions/actionsTodolists";
import {TasksActionsType} from "./actions/actionsTasks";

const rootReducer = combineReducers({
   todolists: TodolistReducer,
   tasks: TasksReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

export const useAppDispatch = () => useDispatch<AppDispatchType>();

export type AppRootStateType = ReturnType<typeof rootReducer>;
// type for ThunkDispatch
type AppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>;
// type for ThunkActions
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>;
//type for AllActionsType
export type AppActionsType = TodolistsActionsType | TasksActionsType;

// @ts-ignore
window.store = store;
