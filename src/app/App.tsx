import React, {useCallback, useEffect} from 'react'
import './App.css'
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar} from '@material-ui/core'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './store'
import {initializedApTC, RequestStatusType} from './app-reducer'
import {HashRouter} from 'react-router-dom';
import {Route} from 'react-router-dom';
import {Login} from '../features/TodolistsList/Login/Login';
import SimpleBackdrop from '../common/Backdroploading';
import {logoutTC} from '../features/TodolistsList/Login/auth-reducer';

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const dispatch = useDispatch()
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const isInitialized = useSelector<AppRootStateType, boolean>(state => state.app.isInitialized);
    const isLoggedIn = useSelector<AppRootStateType,boolean>(state => state.login.isLoggedIn)

    useEffect(()=>{
        dispatch(initializedApTC())
    },[])

    const handlerLogout = useCallback (() => {
        dispatch(logoutTC())
    },[])

    if (!isInitialized) {
        return <SimpleBackdrop/>
    }

    return (
        <HashRouter>
            <div className="App">
                <ErrorSnackbar/>
                <AppBar position="static">
                    <Toolbar>
                        {isLoggedIn && <Button color="inherit" onClick={handlerLogout}>Log out</Button>}
                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
                </AppBar>
                <Container fixed>
                    <Route exact path={'/'} render={() => <TodolistsList demo={demo}/>}/>
                    <Route path={'/login'} render={() => <Login/>}/>
                </Container>
            </div>
        </HashRouter>
    )
}

export default App
