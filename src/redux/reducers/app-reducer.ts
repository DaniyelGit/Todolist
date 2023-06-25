export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export enum ResultCode {
   OK = 0,
   ERROR = 1,
   ERROR_CAPTCHA = 10,
}

const initialState = {
   status: 'idle' as RequestStatusType,
   error: null as null | string,
}

export type InitialStateType = typeof initialState;

export const AppReducer = (state: InitialStateType = initialState, action: AppRequestStatusType): InitialStateType => {
   switch (action.type) {
      case "APP/SET_STATUS": {
         return {
            ...state,
            status: action.status
         }
      }
      case "SET_ERROR": {
         return {
            ...state,
            error: action.error
         }
      }
      default: {
         return state;
      }
   }
};

export type AppRequestStatusType = SetRequestStatusACType | SetErrorACType;

export type SetRequestStatusACType = ReturnType<typeof setRequestStatusAC>;
export type SetErrorACType = ReturnType<typeof setErrorAC>;

export const setRequestStatusAC = (status: RequestStatusType) => {
   return {
      type: 'APP/SET_STATUS',
      status,
   } as const;
};

export const setErrorAC = (error: string | null) => {
   return {
      type: 'SET_ERROR',
      error,
   } as const;
}

