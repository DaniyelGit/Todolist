import {Dispatch} from "redux";
import {setErrorAC, SetErrorType, setRequestStatus, SetRequestStatusType} from "../redux/reducers/app-reducer";
import {ResponseType} from "../api/todolists-api";

export const handleServerNetworkError = (dispatch: Dispatch<ErrorUtilsDispatchType>, error: string) => {
   dispatch(setRequestStatus('failed'));
   dispatch(setErrorAC(error));
}

export const handleServerAppError = <T>(dispatch: Dispatch<ErrorUtilsDispatchType>, data: ResponseType<T>) => {
   if (data.messages.length) {
      dispatch(setErrorAC(data.messages[0]));
   }
   else {
      dispatch(setErrorAC('Some error occurred'));
   }

}


type ErrorUtilsDispatchType = SetRequestStatusType | SetErrorType;