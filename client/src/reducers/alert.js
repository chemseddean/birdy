import { SET_ALERT, REMOVE_ALERT} from '../actions/types'

const initialState = []
//eslint-disable-next-line
export default function(state = initialState, action){
    const { type, payload} = action; 

    switch(type){
        case SET_ALERT:
            return [...state, payload] //add curent alert to past states
        
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== payload) //The payload here is just the id
        
        default:
            return state;
    }
}