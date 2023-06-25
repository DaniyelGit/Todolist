import {ResultCode, SetErrorACType, setRequestStatusAC, SetRequestStatusACType} from "./app-reducer";
import {Dispatch} from "redux";
import {LoginType} from "../../components/Login/Login";
import {authAPI} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

const initialState = {
   isLoggedIn: false
}
type InitialStateType = typeof initialState

export const AuthReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
   switch (action.type) {
      case 'login/SET-IS-LOGGED-IN':
         return {...state, isLoggedIn: action.value}
      default:
         return state
   }
}

// actions
export const setIsLoggedInAC = (value: boolean) => {
   return {
      type: 'login/SET-IS-LOGGED-IN',
      value,
   } as const
};

// thunks
export const loginTC = (data: LoginType) => async (dispatch: Dispatch<ActionsType>) => {
   dispatch(setRequestStatusAC('loading'))
   try {
      const res = await authAPI.login(data);
      if (res.data.resultCode === ResultCode.OK) {
         dispatch(setIsLoggedInAC(true));
      } else {
         handleServerAppError<{userId: number}>(dispatch, res.data);
      }
   }
   catch (e) {
      const error = (e as {message: string});
      handleServerNetworkError(dispatch, error.message);
   } finally {
      dispatch(setRequestStatusAC('succeeded'));
   }
}

export const meTC = () => async (dispatch: Dispatch<ActionsType>) => {
   dispatch(setRequestStatusAC('loading'))
   try {
      const res = await authAPI.me();
      if (res.data.resultCode === ResultCode.OK) {
         dispatch(setIsLoggedInAC(true));
      } else {
         handleServerAppError(dispatch, res.data);
      }
   }
   catch (e) {
      const error = (e as {message: string});
      handleServerNetworkError(dispatch, error.message);
   } finally {
      dispatch(setRequestStatusAC('succeeded'));
   }
}

// types
type ActionsType = ReturnType<typeof setIsLoggedInAC> | SetRequestStatusACType | SetErrorACType