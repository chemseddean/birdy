import {
    GET_FRIENDS,
    ADD_FRIENDS,
    GET_USERBYID,
    ERROR_FRIENDS
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
        default:
            return state;
    }
}