import axios from 'axios'
import {
	REGISTER_SUCCESS, 
	REGISTER_FAIL,
	AUTH_ERROR, 
	USER_LOADED,
	LOGIN_FAIL, 
	LOGIN_SUCCESS, 
	LOGOUT,
	CLEAR_PROFILE
} from './types'
import {setAlert} from './alert'
// import setAuthToken from '../utils/setAuthToken'

//login
// 1. envoie une requete de login au serveur
// 2. il dispatch/execute le type LOGIN_SUCCESS (details a reducers/auth)
export const login = (username, password) => async dispatch => {
	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	}
	const body = JSON.stringify({ username, password })
	try {
		const res = await axios.post("/api/users/login", body, config)
		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data
		})
		// dispatch({
		// 	type: GET_PROFILE
		// })

		// dispatch(loadUser())
	} catch (error) {
		const msg = error.response.status + " : " + error.response.data
		dispatch(setAlert(msg, "danger"))
		dispatch({type: LOGIN_FAIL})
	}
	// get profil as well
	// try {
	// 	const config = {
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 			'x-auth-token': localStorage.getItem('token')
	// 		}
	// 	}
	// 	const res = await axios.get('/api/profils/me', config)
	// 	dispatch({
	// 		type: GET_PROFILE,
	// 		payload: res.data,
	// 	})
	// } catch (error) {
	// 	dispatch({
	// 		type: PROFILE_ERROR
	// 	})
	// }
}

export const online = () => async dispatch => {
	const token = localStorage.getItem('token')
	if (localStorage.token) {
		axios.defaults.headers.common['x-auth-token'] = token
		dispatch({
			type: USER_LOADED,
			payload: JSON.parse(localStorage.getItem('user'))
		})
	} else {
		delete axios.defaults.headers.common['x-auth-token']
		dispatch({
		    type: AUTH_ERROR
		})
	}
}





// export const loadUser = () => async dispatch =>{
// 	if(localStorage.token){
// 		setAuthToken(localStorage.token)
// 	}

// 	try {
// 		const res = await axios.get('/api/users')
// 		dispatch({
// 			type: USER_LOADED,
// 			payload: res.data
// 		})
// 	} catch (error) {
// 		// dispatch({
// 		//     type: AUTH_ERROR
// 		// })
// 		console.log("Error")
// 	}
// }

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



//Logout
export const logout = () => dispatch => {
	dispatch({ 
		type: LOGOUT
	})
	dispatch({ 
		type: CLEAR_PROFILE
	})
}