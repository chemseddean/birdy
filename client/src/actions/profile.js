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
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token')
      }
    }
    const res = await axios.get('/api/profils/me', config)
    dispatch({
      type: GET_PROFILE, 
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR
    })
  }
}

// Create/Update profile
export const submitProfile = (formData, history, edit = false) => async dispatch => {
  // console.log(localStorage.getItem('token'))
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-auth-token': localStorage.getItem('token')
    }
  }
  axios.post('/api/profils', JSON.stringify(formData), config)
    .then(res => {
      console.log("res");
      console.log(res);
      dispatch({
        type: GET_PROFILE,
        payload: JSON.stringify(res.data)
      })
      if (!edit) history.push('/dashboard')
      dispatch(setAlert(edit ? 'Profile Update' : 'Profile Created', 'success'))
    })
    .catch(error => {
      return console.log(error)
      const errors = error.response.data.errors
      if (errors) errors.forEach(e => dispatch(setAlert(e.msg, "danger")))
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: error.response.statusText, status: error.response.status }
      })
    })
}


// export const getProfiles = () => 
// async dispatch => {
//   dispatch({ type: CLEAR_PROFILE})
//   try {
//     const res = await axios.get('/api/profils')
//     dispatch({
//       type: GET_PROFILES, 
//       payload: res.data,
//     })
//   } catch (error) {
//     dispatch({
//       type: PROFILE_ERROR, 
//       //payload: { msg: error.response.statusText, status: error.response.status}
//     })
//   }
// }


//Get all profiles
export const getProfiles = () =>
  async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': localStorage.getItem('token')
      }
    }
    const res = await axios.get('/api/profils/', config)
    console.log(res)
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    })
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR
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

