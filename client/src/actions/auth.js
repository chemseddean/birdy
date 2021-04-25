import axios from 'axios'
import {
    REGISTER_SUCCESS, 
    REGISTER_FAIL, 
    // AUTH_ERROR, 
    USER_LOADED,
    LOGIN_FAIL, 
    LOGIN_SUCCESS, 
    LOGOUT,
    CLEAR_PROFILE
} from './types'
import {setAlert} from './alert'
import setAuthToken from '../utils/setAuthToken'

//Load user
export const loadUser = () => async dispatch =>{
    if(localStorage.token){
        setAuthToken(localStorage.token)
    }

    try {
        const res = await axios.get('/api/users')
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (error) {
        // dispatch({
        //     type: AUTH_ERROR
        // })
        console.log("Error")
    }
}

//Register
export const register = ({firstName, lastName, username, email, password}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }

    const body = JSON.stringify({firstName, lastName, username, email, password})
    try{
        const res = await axios.post("/api/users/register", body, config)
        dispatch({
            type: REGISTER_SUCCESS, 
            payload: res.data
        })

    } catch(error){
        const msg = error.response.status + " : " + error.response.data
        dispatch(setAlert(msg, "danger"))
        dispatch({
            type: REGISTER_FAIL
        }
        )
    }
}

//login
export const login = (username, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }

    const body = JSON.stringify({username, password})

    try{
        const res = await axios.post("/api/users/login", body, config)

        dispatch({
            type: LOGIN_SUCCESS, 
            payload: res.data
        })

        dispatch(loadUser())
    } catch(error){
        const msg = error.response.status + " : " + error.response.data
        dispatch(setAlert(msg, "danger"))
        dispatch({
            type: LOGIN_FAIL
        })
    }
}

//Logout
export const logout = () => dispatch => {
    dispatch({ 
        type: LOGOUT
    })
    dispatch({ 
        type: CLEAR_PROFILE
    })
}