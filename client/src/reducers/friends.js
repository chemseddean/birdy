import {
    GET_FRIENDS,
    ADD_FRIENDS,
    GET_USERBYID,
    BOBO
} from '../actions/types'

const initialState = {
    token: localStorage.getItem('token'),
    aFriend_: null,
    friendList: null
}

export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case GET_USERBYID:
            return {
                ...state,
                aFriend_: payload
            }
        // case REGISTER_SUCCESS:
        // case LOGIN_SUCCESS:
        //     localStorage.setItem('token', payload.token)
        //     localStorage.setItem('user', payload.userAsString)
        //     return {
        //         ...state,
        //         // ...payload,
        //         isAuthenticated: true,
        //         loading: false,
        //         user: JSON.parse(payload.userAsString)
        //     }
        // case REGISTER_FAIL:
        // case AUTH_ERROR:
        // case LOGIN_FAIL:
        // case LOGOUT:
        //     localStorage.removeItem('token')
        //     localStorage.removeItem('user')
        //     localStorage.removeItem('profil')
        //     return {
        //         ...state,
        //         token: null,
        //         isAuthenticated: false,
        //         loading: false
        //     }
        default:
            return state;
    }
}