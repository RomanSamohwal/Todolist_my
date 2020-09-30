import {Dispatch} from 'redux';
import {authAPI} from '../api/todolists-api';
import {setIsLoggedInAC} from '../features/TodolistsList/Login/auth-reducer';

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-IS-INITIALIZED':
            return {...state, isInitialized: action.value}
        default:
            return {...state}
    }
}


//action creator
export const setAppErrorAC = (error: string | null) => ({ type: 'APP/SET-ERROR', error } as const)
export const setAppStatusAC = (status:  RequestStatusType) => ({ type: 'APP/SET-STATUS', status } as const)
export const setIsAppInitializedAC = (value:  boolean) => ({ type: 'APP/SET-IS-INITIALIZED', value } as const)
//thunk
export const initializedApTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(true))
            } else {

            }
            dispatch(setIsAppInitializedAC(true))
        })
}
//types
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetIsAppInitializeType = ReturnType<typeof setIsAppInitializedAC>
type ActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType
    | SetIsAppInitializeType
export type RequestStatusType =  'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
    isInitialized: boolean
}
