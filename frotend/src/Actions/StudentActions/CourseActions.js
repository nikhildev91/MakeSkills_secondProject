import axios from "axios";
import { 
    CART_LIST_FAIL,
    CART_LIST_REQUEST,
    CART_LIST_SUCCESS,
    COURSE_CREATE_REVIEW_FAIL,
    COURSE_CREATE_REVIEW_REQUEST,
    COURSE_CREATE_REVIEW_SUCCESS,
    FREE_ENROLLMENT_COURSE_FAIL,
    FREE_ENROLLMENT_COURSE_REQUEST,
    FREE_ENROLLMENT_COURSE_SUCCESS,
    LIST_COMPLETE_FAIL,
    LIST_COMPLETE_REQUEST,
    LIST_COMPLETE_SUCCESS,
    LIST_MYCOURSES_FAIL,
    LIST_MYCOURSES_REQUEST,
    LIST_MYCOURSES_SUCCESS,
    MARK_lESSON_COMPLETE_FAIL,
    MARK_lESSON_COMPLETE_REQUEST,
    MARK_lESSON_COMPLETE_SUCCESS,
    MYCOURSES_DETAILS_FAIL,
    MYCOURSES_DETAILS_REQUEST,
    MYCOURSES_DETAILS_SUCCESS,
    MYCOURSE_START_FAIL,
    MYCOURSE_START_REQUEST,
    MYCOURSE_START_SUCCESS,
    PROVIDE_CERTIFICATE_FAIL,
    PROVIDE_CERTIFICATE_REQUEST,
    PROVIDE_CERTIFICATE_SUCCESS,
    REMOVE_CART_ITEM_FAIL,
    REMOVE_CART_ITEM_REQUEST,
    REMOVE_CART_ITEM_SUCCESS,
    STUDENTS_COURSE_ADDTOCART_FAIL,
    STUDENTS_COURSE_ADDTOCART_REQUEST,
    STUDENTS_COURSE_ADDTOCART_SUCCESS,
    STUDENTS_COURSE_DETAILS_FAIL,
    STUDENTS_COURSE_DETAILS_REQUEST,
    STUDENTS_COURSE_DETAILS_SUCCESS,
    STUDENTS_COURSE_LIST_FAIL, 
    STUDENTS_COURSE_LIST_REQUEST, 
    STUDENTS_COURSE_LIST_SUCCESS 
} from "../../Constants/StudentConstants/CourseConstants";


export const studentCourseListAction = () => async ( dispatch ) => {
    try{
        dispatch({
            type : STUDENTS_COURSE_LIST_REQUEST
        })

        const { data } = await axios.get(`/api/students/courses`)

        dispatch({
            type : STUDENTS_COURSE_LIST_SUCCESS,
            payload : data
        })
    }catch(error) {
        dispatch({
            type : STUDENTS_COURSE_LIST_FAIL,
            payload :
            error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        })
    }
}


export const studentCourseViewAction = (slug) => async ( dispatch ) => {
    try{
        dispatch({
            type : STUDENTS_COURSE_DETAILS_REQUEST
        })

        const { data } = await axios.get(`/api/students/course-view/${slug}`)

        dispatch({
            type : STUDENTS_COURSE_DETAILS_SUCCESS,
            payload : data
        })
    }catch(error) {
        dispatch({
            type : STUDENTS_COURSE_DETAILS_FAIL,
            payload :
            error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        })
    }
}


export const addtocartAction = (slug) => async ( dispatch, getState ) => {
    try{
        dispatch({
            type : STUDENTS_COURSE_ADDTOCART_REQUEST
        })

        const {
            userLogin : { userInfo }
        } = getState()

        const config = {
            headers : {
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`/api/students/add-to-cart/${userInfo._id}/${slug}`, config)

        dispatch({
            type : STUDENTS_COURSE_ADDTOCART_SUCCESS,
            payload : data
        })
    }catch(error) {
        dispatch({
            type : STUDENTS_COURSE_ADDTOCART_FAIL,
            payload :
            error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        })
    }
}


export const cartListAction = () => async ( dispatch, getState ) => {
    try{
        dispatch({
            type : CART_LIST_REQUEST
        })

        const {
            userLogin : { userInfo }
        } = getState()

        const config = {
            headers : {
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/students/add-to-cart/${userInfo._id}`, config)

        dispatch({
            type : CART_LIST_SUCCESS,
            payload : data
        })
    }catch(error) {
        dispatch({
            type : CART_LIST_FAIL,
            payload :
            error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        })
    }
}


export const removeCartItemAction = ( itemId, cartId ) => async ( dispatch, getState ) => {
    try{
        dispatch({
            type : REMOVE_CART_ITEM_REQUEST
        })

        const {
            userLogin : { userInfo }
        } = getState()

        const config = {
            headers : {
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`/api/students/remove-cart-item/${userInfo._id}/${itemId}/${cartId}`, config)

        dispatch({
            type : REMOVE_CART_ITEM_SUCCESS,
            payload : data
        })
    }catch(error) {
        dispatch({
            type : REMOVE_CART_ITEM_FAIL,
            payload :
            error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        })
    }
}



export const enrollmentFreeCourseAction = ( courseId ) => async ( dispatch, getState ) => {
    try{
        dispatch({
            type : FREE_ENROLLMENT_COURSE_REQUEST
        })

        const {
            userLogin : { userInfo }
        } = getState()

        const config = {
            headers : {
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`/api/students/free-enrollment/${courseId}`,{}, config)

        dispatch({
            type : FREE_ENROLLMENT_COURSE_SUCCESS,
            payload : data
        })
    }catch(error) {
        dispatch({
            type : FREE_ENROLLMENT_COURSE_FAIL,
            payload :
            error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        })
    }
}



export const loadMyCoursesAction = () => async ( dispatch, getState ) => {
    try{
        dispatch({
            type : LIST_MYCOURSES_REQUEST
        })

        const {
            userLogin : { userInfo }
        } = getState()

        const config = {
            headers : {
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/students/mycourses/${userInfo._id}`, config)

        dispatch({
            type : LIST_MYCOURSES_SUCCESS,
            payload : data
        })
    }catch(error) {
        dispatch({
            type : LIST_MYCOURSES_FAIL,
            payload :
            error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        })
    }
}




export const mycourseDetailsAction = ( slug ) => async ( dispatch, getState ) => {
    try{
        dispatch({
            type : MYCOURSES_DETAILS_REQUEST
        })

        const {
            userLogin : { userInfo }
        } = getState()

        const config = {
            headers : {
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/students/mycourses-details/${userInfo._id}/${slug}`, config)

        dispatch({
            type : MYCOURSES_DETAILS_SUCCESS,
            payload : data
        })
    }catch(error) {
        dispatch({
            type : MYCOURSES_DETAILS_FAIL,
            payload :
            error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        })
    }
}


export const startCourseAction = ( slug ) => async ( dispatch, getState ) => {
    try{
        dispatch({
            type : MYCOURSE_START_REQUEST
        })

        const {
            userLogin : { userInfo }
        } = getState()

        const config = {
            headers : {
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/students/start-course/${userInfo._id}/${slug}`, config)

        dispatch({
            type : MYCOURSE_START_SUCCESS,
            payload : data
        })
    }catch(error) {
        dispatch({
            type : MYCOURSE_START_FAIL,
            payload :
            error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        })
    }
}



export const markLessonCompleteAction = ( courseId, lessonId, note ) => async ( dispatch, getState ) => {
    try{
        dispatch({
            type : MARK_lESSON_COMPLETE_REQUEST
        })

        const {
            userLogin : { userInfo }
        } = getState()

        const config = {
            headers : {
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`/api/students/mark-completed-lesson`,{ courseId, lessonId, note }, config)

        dispatch({
            type : MARK_lESSON_COMPLETE_SUCCESS,
            payload : data
        })
    }catch(error) {
        dispatch({
            type : MARK_lESSON_COMPLETE_FAIL,
            payload :
            error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        })
    }
}


export const listCourseCompleteAction = ( courseId ) => async ( dispatch, getState ) => {
    try{
        dispatch({
            type : LIST_COMPLETE_REQUEST
        })

        const {
            userLogin : { userInfo }
        } = getState()

        const config = {
            headers : {
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`/api/students/list-completed`,{ courseId }, config)

        dispatch({
            type : LIST_COMPLETE_SUCCESS,
            payload : data
        })
    }catch(error) {
        dispatch({
            type : LIST_COMPLETE_FAIL,
            payload :
            error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        })
    }
}


export const provideCertificateAction = ( courseId ) => async ( dispatch, getState ) => {
    try{
        dispatch({
            type : PROVIDE_CERTIFICATE_REQUEST
        })

        const {
            userLogin : { userInfo }
        } = getState()

        const config = {
            headers : {
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`/api/students/provide-certificate`,{ courseId }, config)

        dispatch({
            type : PROVIDE_CERTIFICATE_SUCCESS,
            payload : data
        })
    }catch(error) {
        dispatch({
            type : PROVIDE_CERTIFICATE_FAIL,
            payload :
            error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        })
    }
}



export const courseReviewAction = ( courseId, review ) => async ( dispatch, getState ) => {
    try{
        dispatch({
            type : COURSE_CREATE_REVIEW_REQUEST
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

        const { data } = await axios.post(`/api/students/course-review${courseId}`,{ review }, config)

        dispatch({
            type : COURSE_CREATE_REVIEW_SUCCESS,
        })
    }catch(error) {
        dispatch({
            type : COURSE_CREATE_REVIEW_FAIL,
            payload :
            error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        })
    }
}












