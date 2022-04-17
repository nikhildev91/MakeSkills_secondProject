import axios from "axios";
import { 
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

        const { data } = await axios.post(`/api/students/add-to-cart/${slug}`, config)

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

