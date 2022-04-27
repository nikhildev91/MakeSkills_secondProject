import axios from 'axios'
import { 
    BLOCK_STUDENTS_FAIL,
    BLOCK_STUDENTS_REQUEST,
    BLOCK_STUDENTS_SUCCESS,
    LIST_INSTRUCTORS_FAIL, 
    LIST_INSTRUCTORS_REQUEST, 
    LIST_INSTRUCTORS_SUCCESS, 
    LIST_STUDENTS_FAIL, 
    LIST_STUDENTS_REQUEST,
    LIST_STUDENTS_SUCCESS,
    UNBLOCK_STUDENTS_FAIL,
    UNBLOCK_STUDENTS_REQUEST,
    UNBLOCK_STUDENTS_SUCCESS,
    BLOCK_INSTRUCTORS_REQUEST,
    BLOCK_INSTRUCTORS_SUCCESS,
    BLOCK_INSTRUCTORS_FAIL,
    UNBLOCK_INSTRUCTORS_REQUEST,
    UNBLOCK_INSTRUCTORS_SUCCESS,
    UNBLOCK_INSTRUCTORS_FAIL
} from '../Constants/Admin/adiminConstants'

export const loadAllInstructors = () => async ( dispatch, getState) => {
    try{

        dispatch({
            type : LIST_INSTRUCTORS_REQUEST
        })
    
        const {
            userLogin : { userInfo }
        } = getState()
    
        const config = {
            headers : {
                Authorization : `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.get(`/api/admin/get-all-instructors`, config)
    
        dispatch({
            type : LIST_INSTRUCTORS_SUCCESS,
            payload : data
        })
    }catch(error) {
    dispatch({
        type : LIST_INSTRUCTORS_FAIL,
        payload :
        error.response && error.response.data.message ?
        error.response.data.message :
        error.message
    })

    }
}


export const loadAllStudents = () => async ( dispatch, getState) => {
    try{

        dispatch({
            type : LIST_STUDENTS_REQUEST
        })
    
        const {
            userLogin : { userInfo }
        } = getState()
    
        const config = {
            headers : {
                Authorization : `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.get(`/api/admin/get-all-students`, config)
    
        dispatch({
            type : LIST_STUDENTS_SUCCESS,
            payload : data
        })
    }catch(error) {
    dispatch({
        type : LIST_STUDENTS_FAIL,
        payload :
        error.response && error.response.data.message ?
        error.response.data.message :
        error.message
    })

    }
}



export const blockStudentAction = ( userId ) => async ( dispatch, getState) => {
    try{

        dispatch({
            type : BLOCK_STUDENTS_REQUEST
        })
    
        const {
            userLogin : { userInfo }
        } = getState()
    
        const config = {
            headers : {
                Authorization : `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.post(`/api/admin/block-student`,{ userId }, config)
    
        dispatch({
            type : BLOCK_STUDENTS_SUCCESS,
            payload : data
        })
    }catch(error) {
    dispatch({
        type : BLOCK_STUDENTS_FAIL,
        payload :
        error.response && error.response.data.message ?
        error.response.data.message :
        error.message
    })

    }
}


export const unBlockStudentAction = ( userId ) => async ( dispatch, getState) => {
    try{

        dispatch({
            type : UNBLOCK_STUDENTS_REQUEST
        })
    
        const {
            userLogin : { userInfo }
        } = getState()
    
        const config = {
            headers : {
                Authorization : `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.post(`/api/admin/unblock-instructors`,{ userId }, config)
    
        dispatch({
            type : UNBLOCK_STUDENTS_SUCCESS,
            payload : data
        })
    }catch(error) {
    dispatch({
        type : UNBLOCK_STUDENTS_FAIL,
       payload :
        error.response && error.response.data.message ?
        error.response.data.message :
        error.message
    })

    }
}



export const blockInstructorAction = ( userId ) => async ( dispatch, getState) => {
    try{

        dispatch({
            type : BLOCK_INSTRUCTORS_REQUEST
        })
    
        const {
            userLogin : { userInfo }
        } = getState()
    
        const config = {
            headers : {
                Authorization : `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.post(`/api/admin/block-instructor`,{ userId }, config)
    
        dispatch({
            type : BLOCK_INSTRUCTORS_SUCCESS,
            payload : data
        })
    }catch(error) {
    dispatch({
        type : BLOCK_INSTRUCTORS_FAIL,
        payload :
        error.response && error.response.data.message ?
        error.response.data.message :
        error.message
    })

    }
}


export const unBlockInstructorAction = ( userId ) => async ( dispatch, getState) => {
    try{

        dispatch({
            type : UNBLOCK_INSTRUCTORS_REQUEST
        })
    
        const {
            userLogin : { userInfo }
        } = getState()
    
        const config = {
            headers : {
                Authorization : `Bearer ${userInfo.token}`
            }
        }
    
        const { data } = await axios.post(`/api/admin/unblock-instructor`,{ userId }, config)
    
        dispatch({
            type : UNBLOCK_INSTRUCTORS_SUCCESS,
            payload : data
        })
    }catch(error) {
    dispatch({
        type : UNBLOCK_INSTRUCTORS_FAIL,
       payload :
        error.response && error.response.data.message ?
        error.response.data.message :
        error.message
    })

    }
}