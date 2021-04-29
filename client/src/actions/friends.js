import axios from 'axios'
import { csonParser } from 'config/parser'
import { setAlert } from './alert'

import {
    GET_FRIENDS,
    ADD_FRIENDS,
    GET_USERBYID,
    ERROR_FRIENDS
} from './types'


export const getUserById = id => async dispatch => {
    // console.log("hhhhhhhhhhhhhhh")
        // dispatch({ type: BOBO })
        console.log(id)
        await axios.get('/api/users/' + id)
        .then(response => localStorage.setItem('aFriend', JSON.stringify(response.data)))
        .catch (error => {
            console.log('failed to get user by id ')
            console.log(error)
        })
}

export const getFriends = () => async dispatch => {
    try {
        const res = await axios.get('/api/friends/myfriends')

        dispatch({
            type: GET_FRIENDS,
            payload: res.data
        })
    } catch (error) {
        // dispatch({
        //     type: POST_ERROR,
        //     //payload: { msg: error.response.statusText, status: error.response.status}
        // })
        console.error(error.message)
    }
}


export const addFriend = (me, him) => async dispatch => {
    var q = 'insert '
    alert("j'ajoute l'ami")
    // try {
    //     const res = await axios.get('/api/friends/')

    //     dispatch({
    //         type: GET_FRIENDS,
    //         payload: res.data
    //     })
    // } catch (error) {
    //     dispatch({
    //         type: POST_ERROR,
    //         //payload: { msg: error.response.statusText, status: error.response.status}
    //     })
    // }
}