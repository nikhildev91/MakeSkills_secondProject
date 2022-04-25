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
    COURSE_UPDATE_FAIL,
    LESSON_CREATE_REQUEST,
    LESSON_CREATE_SUCCESS,
    LESSON_CREATE_FAIL,
    LESSON_UPDATE_REQUEST,
    LESSON_UPDATE_SUCCESS,
    LESSON_UPDATE_FAIL,
    PUBLISH_COURSE_REQUEST,
    PUBLISH_COURSE_SUCCESS,
    PUBLISH_COURSE_FAIL,
    UNPUBLISH_COURSE_REQUEST,
    UNPUBLISH_COURSE_SUCCESS,
    UNPUBLISH_COURSE_FAIL,
    PUBLISHED_COURSES_LIST_REQUEST,
    PUBLISHED_COURSES_LIST_SUCCESS,
    PUBLISHED_COURSES_LIST_FAIL
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

export const createLessonAction = (name, content, video, slug) => async ( dispatch, getState ) => {
    try{
        dispatch({
            type : LESSON_CREATE_REQUEST
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

        const { data } = await axios.post(`/api/instructors/add-lesson/${slug}`, { name, content, video }, config)

        dispatch({
            type : LESSON_CREATE_SUCCESS,
            payload : data
        })
    }catch(error) {
        dispatch({
            type : LESSON_CREATE_FAIL,
            payload :
            error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        })
    }
}

export const updateLessonAction = (current, slug ) => async ( dispatch, getState ) => {
    try{
        dispatch({
            type : LESSON_UPDATE_REQUEST
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

        const { data } = await axios.put(`/api/instructors/update-lesson/${slug}/${current._id}`, { current }, config)

        dispatch({
            type : LESSON_UPDATE_SUCCESS,
            payload : data
        })
    }catch(error) {
        dispatch({
            type : LESSON_UPDATE_FAIL,
            payload :
            error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        })
    }
}



export const publishCourseAction = (courseId) => async ( dispatch, getState ) => {
    try{
        dispatch({
            type : PUBLISH_COURSE_REQUEST
        })

        const {
            userLogin : { userInfo }
        } = getState()

        const config = {
            headers : {
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/instructors/publish/${courseId}`,{}, config)

        dispatch({
            type : PUBLISH_COURSE_SUCCESS,
            payload : data
        })
    }catch(error) {
        dispatch({
            type : PUBLISH_COURSE_FAIL,
            payload :
            error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        })
    }
}


export const unpublishCourseAction = (courseId) => async ( dispatch, getState ) => {
    try{
        dispatch({
            type : UNPUBLISH_COURSE_REQUEST
        })

        const {
            userLogin : { userInfo }
        } = getState()

        const config = {
            headers : {
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/instructors/unpublish/${courseId}`,{}, config)

        dispatch({
            type : UNPUBLISH_COURSE_SUCCESS,
            payload : data
        })
    }catch(error) {
        dispatch({
            type : UNPUBLISH_COURSE_FAIL,
            payload :
            error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        })
    }
}


export const publishedCoursesListAction = () => async ( dispatch, getState ) => {
    try{
        dispatch({
            type : PUBLISHED_COURSES_LIST_REQUEST
        })

        const {
            userLogin : { userInfo }
        } = getState()

        const config = {
            headers : {
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/instructors/published-courses`, config)

        dispatch({
            type : PUBLISHED_COURSES_LIST_SUCCESS,
            payload : data
        })
    }catch(error) {
        dispatch({
            type : PUBLISHED_COURSES_LIST_FAIL,
            payload :
            error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        })
    }
}





