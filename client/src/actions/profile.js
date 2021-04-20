import axios from 'axios'
import { setAlert } from './alert'
import{
    GET_PROFILE, 
    PROFILE_ERROR,
} from './types'

// Get current user profile
// export const getCurrentProfile = () => 
// async dispatch => {
//     try {
//         const res = await axios.get('/api/profils/me')
//         dispatch({
//             type: GET_PROFILE, 
//             payload: res.data,
//         })
//     } catch (error) {
//         dispatch({
//             type: PROFILE_ERROR, 
//             payload: { msg: error.response.statusText, status: error.response.status}
//         })
//     }
// }

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
        dispatch(setAlert(edit ? 'Profile Update' : 'Profile Created'))
        
    
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
