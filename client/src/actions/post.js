import axios from 'axios'
import { setAlert } from './alert'

import { 
    GET_POSTS,
    POST_ERROR,
    UPDATE_LIKES,
    DELETE_POST,
    ADD_POST, 
    ADD_COMMENT,
    DELETE_COMMENT,
    GET_POST
} from './types'

//post
export const getPost = id => async dispatch => {
    try {
        const res = await axios.get(`/api/posts/${id}`)

        dispatch({
            type: GET_POST,
            payload: res.data
        })
    } catch (error){
        dispatch({
            type: POST_ERROR, 
            //payload: { msg: error.response.statusText, status: error.response.status}
        })
    }
}

//posts
export const getPosts = () => async dispatch => {
    try {
        const res = await axios.get('/api/posts')

        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    } catch (error){
        dispatch({
            type: POST_ERROR, 
            //payload: { msg: error.response.statusText, status: error.response.status}
        })
    }
}

//delete post
export const deletePost = id => async dispatch => {
    try {
        await axios.delete(`/api/posts/${id}`)

        dispatch({
            type: DELETE_POST,
            payload: id //deleted post id
        })

        dispatch(setAlert('Post Removed', 'success'))
    } catch (error){
        dispatch({
            type: POST_ERROR, 
            //payload: { msg: error.response.statusText, status: error.response.status}
        })
    }
}

//create post
export const addPost =  formData => async dispatch => {
    
    const config = {
        headers: {
            'Content-Type' : 'application/json'

        }
    }
    
    try {
        const res = await axios.post('/api/posts', formData, config)

        dispatch({
            type: ADD_POST,
            payload: res.data 
        })

        dispatch(setAlert('Post Created', 'success'))
    } catch (error){
        dispatch({
            type: POST_ERROR, 
            //payload: { msg: error.response.statusText, status: error.response.status}
        })
    }
}

//like
export const addLike = id => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/like/${id}`)

        dispatch({
            type: UPDATE_LIKES,
            payload: {id, likes : res.data}
        })
    } catch (error){
        dispatch({
            type: POST_ERROR, 
            //payload: { msg: error.response.statusText, status: error.response.status}
        })
    }
}
//unlike
export const removeLike = id => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/unlike/${id}`)

        dispatch({
            type: UPDATE_LIKES,
            payload: {id, likes : res.data}
        })
    } catch (error){
        dispatch({
            type: POST_ERROR, 
            //payload: { msg: error.response.statusText, status: error.response.status}
        })
    }
}

//create comment
export const addComment =  (postId, formData) => async dispatch => {
    
    const config = {
        headers: {
            'Content-Type' : 'application/json'

        }
    }
    
    try {
        const res = await axios.post(`/api/posts/comment/${postId}`, formData, config)

        dispatch({
            type: ADD_COMMENT,
            payload: res.data 
        })

        dispatch(setAlert('Comment added', 'success'))
    } catch (error){
        dispatch({
            type: POST_ERROR, 
            //payload: { msg: error.response.statusText, status: error.response.status}
        })
    }
}

//delete comment
export const removeComment = (postId, commentId)=> async dispatch => {
    try {
        // return console.log(postId)
        const res = await axios.delete(`/api/posts/comment/${postId}/${commentId}`)

        dispatch({
            type: DELETE_COMMENT,
            payload: commentId
        })

        dispatch(setAlert('Comment removed', 'success'))
    } catch (error){
        console.log(error)
        dispatch({
            type: POST_ERROR, 
            //payload: { msg: error.response.statusText, status: error.response.status}
        })
    }
}