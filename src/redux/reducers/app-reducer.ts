export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

const initialState = {
   status: 'idle' as RequestStatusType
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
      default: {
         return state;
      }
   }
};

export type AppRequestStatusType = SetRequestStatusType;

export type SetRequestStatusType = ReturnType<typeof setRequestStatus>;

export const setRequestStatus = (status: RequestStatusType) => {
   return {
      type: 'APP/SET_STATUS',
      status,
   } as const;
}

