import axios from "axios";
import { 
    CART_LIST_FAIL,
    CART_LIST_REQUEST,
    CART_LIST_SUCCESS,
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


export const studentCourseListAction = () => async ( dispatch, getState ) => {
    try{
        dispatch({
            type : STUDENTS_COURSE_LIST_REQUEST
        })

        const {
            userLogin : { userInfo }
        } = getState()

        const config = {
            headers : {
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/students/courses`, config)

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


export const studentCourseViewAction = (slug) => async ( dispatch, getState ) => {
    try{
        dispatch({
            type : STUDENTS_COURSE_DETAILS_REQUEST
        })

        const {
            userLogin : { userInfo }
        } = getState()

        const config = {
            headers : {
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/students/course-view/${slug}`, config)

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



