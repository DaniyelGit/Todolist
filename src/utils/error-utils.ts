import {Dispatch} from "redux";
import {setErrorAC, SetErrorACType, setRequestStatusAC, SetRequestStatusACType} from "../redux/reducers/app-reducer";
import {ResponseType} from "../api/todolists-api";

export const handleServerNetworkError = (dispatch: Dispatch<ErrorUtilsDispatchType>, errorText: string) => {
      dispatch(setRequestStatusAC('failed'));
      dispatch(setErrorAC(errorText));
}

export const handleServerAppError = <T>(dispatch: Dispatch<ErrorUtilsDispatchType>, data: ResponseType<T>) => {
   if (data.messages.length) {
      dispatch(setErrorAC(data.messages[0]));
   }
   else {
      dispatch(setErrorAC('Some error occurred'));
   }
}


type ErrorUtilsDispatchType = SetRequestStatusACType | SetErrorACType;