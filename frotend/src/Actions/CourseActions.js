import axios from 'axios'
import {
    COURSE_CREATE_REQUEST,
    COURSE_CREATE_SUCCESS,
    COURSE_CREATE_FAIL,
    COURSE_LIST_REQUEST,
    COURSE_LIST_SUCCESS,
    COURSE_LIST_FAIL,
    COURSE_VIEW_REQUEST,
    COURSE_VIEW_SUCCESS,
    COURSE_VIEW_FAIL,
    COURSE_UPDATE_REQUEST,
    COURSE_UPDATE_SUCCESS,
    COURSE_UPDATE_FAIL
} from '../Constants/CourseConstants'

export const createCourseAction = (title, description, category, paid, price, image) => async ( dispatch, getState ) => {
    try{
        dispatch({
            type : COURSE_CREATE_REQUEST
        })

        const {
            userLogin : { userInfo }
        } = getState()

        const config = {
            headers : {
                Authorization : `Bearer ${userInfo.token}`,
                'Content-Type' : 'application/json'
            }
        }
        console.log(config);

        const { data } = await axios.post(`/api/instructors/create-course`, { title, description, category, paid, price, image }, config)

        dispatch({
            type : COURSE_CREATE_SUCCESS,
            payload : data
        })
    }catch(error) {
        dispatch({
            type : COURSE_CREATE_FAIL,
            payload :
            error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        })
    }
}

export const courseListAction = () => async ( dispatch, getState ) => {
    try{
        dispatch({
            type : COURSE_LIST_REQUEST
        })

        const {
            userLogin : { userInfo }
        } = getState()

        const config = {
            headers : {
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/instructors/courses`, config)

        dispatch({
            type : COURSE_LIST_SUCCESS,
            payload : data
        })
    }catch(error) {
        dispatch({
            type : COURSE_LIST_FAIL,
            payload :
            error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        })
    }
}


export const courseViewAction = (slug) => async ( dispatch, getState ) => {
    try{
        dispatch({
            type : COURSE_VIEW_REQUEST
        })

        const {
            userLogin : { userInfo }
        } = getState()

        const config = {
            headers : {
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/instructors/course-view/${slug}`, config)

        dispatch({
            type : COURSE_VIEW_SUCCESS,
            payload : data
        })
    }catch(error) {
        dispatch({
            type : COURSE_VIEW_FAIL,
            payload :
            error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        })
    }
}


export const courseUpdateAction = (title, description, category, paid, price, image, slug) => async ( dispatch, getState ) => {
    try{
        dispatch({
            type : COURSE_UPDATE_REQUEST
        })

        const {
            userLogin : { userInfo }
        } = getState()

        const config = {
            headers : {
                'Content-Type' : 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`/api/instructors/course-update/${slug}`, { title, description, category, paid, price, image, slug }, config)

        dispatch({
            type : COURSE_UPDATE_SUCCESS,
            payload : data
        })
    }catch(error) {
        dispatch({
            type : COURSE_UPDATE_FAIL,
            payload :
            error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        })
    }
}

