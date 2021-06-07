import { Dispatch } from 'redux'
import {  setAppStatusAC, } from '../../app/app-reducer'
import {authAPI, LoginParamsType, todolistsAPI} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {addTaskAC} from "../TodolistsList/tasks-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false
}
const slice=createSlice({
    name: 'auth',
    initialState: initialState,
    reducers:{
        setIsLoggedInAC(state,action:PayloadAction<{value:boolean}>){
            state.isLoggedIn= action.payload.value}

    }
})
type InitialStateType = typeof initialState
///reducer
export const authReducer =slice.reducer
// actions
export const {setIsLoggedInAC}=slice.actions

// thunks
export const loginTC = ({email, password, rememberMe, captcha}: LoginParamsType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status:'loading'}))
    authAPI.login({email, password, rememberMe, captcha})
        .then(res=>{
            if (res.data.resultCode === 0){
                dispatch(setIsLoggedInAC({value: true}))


                dispatch(setAppStatusAC({status:'succeeded'}))

            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })

}
export const logoutTC = () => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC({status:'loading'}))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: false}))
                dispatch(setAppStatusAC({status:'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}


////



// types
