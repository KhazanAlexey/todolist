import {setIsLoggedInAC} from "../features/Login/auth-reducer";
import {Dispatch} from "redux";
import { authAPI } from "../api/todolists-api";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized:false
}
///redux tool-kit
const slice=createSlice({
    name:'app',
    initialState:initialState,
    reducers:{
        setAppErrorAC (state,action:PayloadAction<{error:string|null}>){
            state.error=action.payload.error
        },
        setAppStatusAC (state,action:PayloadAction<{status:  RequestStatusType}>) {
            state.status=action.payload.status
        },
        setIsInitializedAC (state,action:PayloadAction<{status: boolean}>){
            state.isInitialized=action.payload.status
        }



    }
})
////reducer
export const appReducer=slice.reducer
// export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
//     switch (action.type) {
//         case 'APP/SET-STATUS':
//             return {...state, status: action.status}
//         case 'APP/SET-ERROR':
//             return {...state, error: action.error}
//         case 'APP/SET-INITIALIZED':
//             return {...state,isInitialized:action.status
//             }
//         default:
//             return {...state}
//     }
// }

export type RequestStatusType =  'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
    isInitialized:boolean
}
////actions
export const {setAppErrorAC,setAppStatusAC,setIsInitializedAC}=slice.actions


// export const setAppErrorAC = (error: string | null) => ({ type: 'APP/SET-ERROR', error } as const)
// export const setAppStatusAC = (status:  RequestStatusType) => ({ type: 'APP/SET-STATUS', status } as const)
// export const setIsInitializedAC = (status:boolean) => ({ type: 'APP/SET-INITIALIZED', status } as const)

// export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
// export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
// export type setIsInitializedACType = ReturnType<typeof setIsInitializedAC>

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: true}));

        }
        dispatch(setIsInitializedAC({status:true}))

    })
}

