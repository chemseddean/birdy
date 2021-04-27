import axios from 'axios'
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL, 
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT
} from '../actions/types'

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false, 
  loading: true,
  user: null
}
//eslint-disable-next-line
export default function(state = initialState, action) {
  const { type, payload } = action
  switch(type){
    case USER_LOADED:
      return {
        ...state, 
        isAuthenticated: true, 
        loading: false,
        user: payload
      }
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token)
      localStorage.setItem('user', payload.userAsString)
      axios.defaults.headers.common['x-auth-token'] = payload.token
      return {
        ...state, 
        // ...payload,
        isAuthenticated: true, 
        loading: false,
        user: JSON.parse(payload.userAsString)
      }
      case REGISTER_FAIL:
      case AUTH_ERROR:
      case LOGIN_FAIL:
      case LOGOUT:
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          localStorage.removeItem('profil')
          delete axios.defaults.headers.common['x-auth-token']
          return {
            ...state,
            token: null,
            isAuthenticated: false, 
            loading: false
          }
    default: 
        return state;
  }
}