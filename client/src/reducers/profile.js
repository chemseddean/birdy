import { GET_PROFILE, PROFILE_ERROR, CLEAR_PROFILE, GET_PROFILES } from "../actions/types"

const initialState = {
    profile: null, 
    profiles: [],
    loading: true, 
    error: {}
}

export default function(state = initialState, action) {
    const {type, payload} = action

    switch(type){
        case GET_PROFILE:
            localStorage.setItem('profile',payload)
            return {
                ...state,
                profile: payload,
                loading: false
            }
        case GET_PROFILES:
            localStorage.setItem('profiles', payload)
            return {
                ...state,
                profiles: JSON.parse(payload), 
                loading: false
            }
        case PROFILE_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            }
        case CLEAR_PROFILE:
            localStorage.removeItem('profile', payload)
        return {
                ...state,
                profile: null,
                loading: false
            }
        default: 
        return state
    }
}