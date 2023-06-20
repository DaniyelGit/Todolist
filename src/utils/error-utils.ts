import {Dispatch} from "redux";
import {setErrorAC, SetErrorType, setRequestStatus, SetRequestStatusType} from "../redux/reducers/app-reducer";

export const handleServerNetworkError = (dispatch: Dispatch<ErrorUtilsDispatchType>, error: string) => {
   dispatch(setRequestStatus('failed'));
   dispatch(setErrorAC(error));
}

type ErrorUtilsDispatchType = SetRequestStatusType | SetErrorType;