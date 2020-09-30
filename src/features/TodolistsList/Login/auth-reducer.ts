import {Dispatch} from 'redux';
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from '../../../app/app-reducer';
import {authAPI, LoginParamsType} from '../../../api/todolists-api';
import {handleServerAppError, handleServerNetworkError} from '../../../utils/error-utils';

const initialState: InitialStateType = {
    isLoggedIn: false
}

export const authReducer = (state: InitialStateType = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case 'LOGIN/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return {...state}
    }
}

//action
export const setIsLoggedInAC = (value: boolean) => ({type: 'LOGIN/SET-IS-LOGGED-IN', value} as const)

//thunk
export const loginTC = (data: LoginParamsType) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(data)
        .then((res) => {
            if (res.data.resultCode === 0) {
                const task = res.data.data.userId;
                dispatch(setIsLoggedInAC(true))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
export const logoutTC = () => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(setIsLoggedInAC(false))
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch)
        })
}
//types
type ActionType = ReturnType<typeof setIsLoggedInAC>
type InitialStateType = {
    isLoggedIn: boolean
}
type ThunkDispatch = Dispatch<ActionType | SetAppStatusActionType | SetAppErrorActionType>