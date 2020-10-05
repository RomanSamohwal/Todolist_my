import {Dispatch} from 'redux';
import {authAPI} from '../api/todolists-api';
import {setIsLoggedInAC} from '../features/TodolistsList/Login/auth-reducer';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitialized: false
}

const slice = createSlice({
        name: 'app',
        initialState: initialState,
        reducers: {
            setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
                state.error = action.payload.error
            },
            setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
                state.status = action.payload.status
            },
            setIsAppInitializedAC(state, action: PayloadAction<{isInitialized: boolean }>) {
                state.isInitialized = action.payload.isInitialized
            }
        }
    }
)

export const appReducer = slice.reducer;

export const {setAppErrorAC} = slice.actions
export const {setAppStatusAC} = slice.actions
export const {setIsAppInitializedAC} = slice.actions

//thunk
export const initializedApTC = () => (dispatch: Dispatch) => {
    authAPI.me()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC({value: true}))
            } else {

            }
            dispatch(setIsAppInitializedAC({isInitialized: true}))
        })
}
//types
/*export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetIsAppInitializeType = ReturnType<typeof setIsAppInitializedAC>*/
/*type ActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType
    | SetIsAppInitializeType*/
export type RequestStatusType =  'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
    isInitialized: boolean
}
