import {
    COURSE_CREATE_REQUEST,
    COURSE_CREATE_SUCCESS,
    COURSE_CREATE_FAIL,
    COURSE_CREATE_RESET,
    COURSE_LIST_REQUEST,
    COURSE_LIST_SUCCESS,
    COURSE_LIST_FAIL,
    COURSE_VIEW_REQUEST,
    COURSE_VIEW_SUCCESS,
    COURSE_VIEW_FAIL,
    COURSE_UPDATE_REQUEST,
    COURSE_UPDATE_SUCCESS,
    COURSE_UPDATE_FAIL,
    COURSE_UPDATE_RESET
} from '../Constants/CourseConstants'

export const courseCreateReducer = (state = { }, action ) => {
    switch ( action.type ) {
        case COURSE_CREATE_REQUEST :
            return { loading : true }
        case COURSE_CREATE_SUCCESS :
            return { loading : false, success : true, course : action.payload }
        case COURSE_CREATE_FAIL : 
            return { loading : false, error : action.payload }
        case COURSE_CREATE_RESET :
            return {}
        default : 
            return state
    }
}

export const courseListReducer = (state = { }, action ) => {
    switch ( action.type ) {
        case COURSE_LIST_REQUEST :
            return { loading : true }
        case COURSE_LIST_SUCCESS :
            return { loading : false, courses : action.payload }
        case COURSE_LIST_FAIL : 
            return { loading : false, error : action.payload }
        default : 
            return state
    }
}

export const courseViewReducer = (state = { }, action ) => {
    switch ( action.type ) {
        case COURSE_VIEW_REQUEST :
            return { loading : true }
        case COURSE_VIEW_SUCCESS :
            return { loading : false, courseDetails : action.payload }
        case COURSE_VIEW_FAIL : 
            return { loading : false, error : action.payload }
        default : 
            return state
    }
}


export const courseUpdateReducer = (state = { }, action ) => {
    switch ( action.type ) {
        case COURSE_UPDATE_REQUEST :
            return { loading : true }
        case COURSE_UPDATE_SUCCESS :
            return { loading : false, success : true, course : action.payload }
        case COURSE_UPDATE_FAIL : 
            return { loading : false, error : action.payload }
        case COURSE_UPDATE_RESET :
            return {}
        default : 
            return state
    }
}