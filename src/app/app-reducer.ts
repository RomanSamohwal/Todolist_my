import {authAPI} from '../api/todolists-api';
import {setIsLoggedInAC} from '../features/TodolistsList/Login/auth-reducer';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

export const initializedApTC = createAsyncThunk('app/initializeApp', async (param, {dispatch}) => {
    let res = await authAPI.me()
    if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC({value: true}))
    }
})

const slice = createSlice({
        name: 'app',
    initialState : {
        status: 'idle',
        error: null,
        isInitialized: false
    } as InitialStateType,
        reducers: {
            setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
                state.error = action.payload.error
            },
            setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
                state.status = action.payload.status
            }
        },
        extraReducers: builder => {
            builder.addCase(initializedApTC.fulfilled, (state) => {
                state.isInitialized = true
            })
        }
    }
)

export const appReducer = slice.reducer;
export const {setAppErrorAC, setAppStatusAC} = slice.actions

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
    isInitialized: boolean
}
