import axios from 'axios'
import { setAlert } from './alert'
import{
    GET_PROFILE, 
    PROFILE_ERROR,
    CLEAR_PROFILE,
    GET_PROFILES

} from './types'

// Get current user profile
export const getCurrentProfile = () => 
async dispatch => {
    try {
        const res = await axios.get('/api/profils/me')
        dispatch({
            type: GET_PROFILE, 
            payload: res.data,
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR, 
            //payload: { msg: error.response.statusText, status: error.response.status}
        })
    }
}

//Get all profiles
export const getProfiles = () => 
async dispatch => {
    dispatch({ type: CLEAR_PROFILE})
    try {
        const res = await axios.get('/api/profils')
        dispatch({
            type: GET_PROFILES, 
            payload: res.data,
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR, 
            //payload: { msg: error.response.statusText, status: error.response.status}
        })
    }
}

//Get profile by id
export const getProfileById = userId => 
async dispatch => {
    
    try {
        const res = await axios.get(`/api/profils/user/${userId}`)
        dispatch({
            type: GET_PROFILE, 
            payload: res.data,
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR, 
            //payload: { msg: error.response.statusText, status: error.response.status}
        })
    }
}
// Create/Update profile
export const createProfile = (formData, history, edit = false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type' : 'application/json'
            }
        }

        const res = await axios.post('/api/profils', formData, config)

        dispatch({
            type: GET_PROFILE, 
            payload: res.data
        })
        dispatch(setAlert(edit ? 'Profile Update' : 'Profile Created', 'success'))
        
    
        if(!edit) {
            history.push('/dashboard')
        }
    } catch (error) {
        const errors = error.response.data.errors

        if(errors){
            errors.forEach(e => dispatch(setAlert(e.msg, "danger")))
        }

        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusText, status: error.response.status}
        })
    }
}
