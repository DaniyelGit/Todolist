import {Dispatch} from "redux";
import {setErrorAC, SetErrorType, setRequestStatus, SetRequestStatusType} from "../redux/reducers/app-reducer";
import {ErrorsType, ResponseType} from "../api/todolists-api";
import {AxiosError, isAxiosError} from "axios";

export const handleServerNetworkError = (dispatch: Dispatch<ErrorUtilsDispatchType>, errorText: string) => {
      dispatch(setRequestStatus('failed'));
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


type ErrorUtilsDispatchType = SetRequestStatusType | SetErrorType;