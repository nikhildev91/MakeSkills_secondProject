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
    COURSE_UPDATE_RESET,
    LESSON_CREATE_REQUEST,
    LESSON_CREATE_SUCCESS,
    LESSON_CREATE_FAIL,
    LESSON_CREATE_RESET,
    LESSON_UPDATE_REQUEST,
    LESSON_UPDATE_SUCCESS,
    LESSON_UPDATE_FAIL,
    LESSON_UPDATE_RESET,
    PUBLISH_COURSE_REQUEST,
    PUBLISH_COURSE_SUCCESS,
    PUBLISH_COURSE_FAIL,
    UNPUBLISH_COURSE_REQUEST,
    UNPUBLISH_COURSE_SUCCESS,
    UNPUBLISH_COURSE_FAIL,
    PUBLISH_COURSE_RESET,
    UNPUBLISH_COURSE_RESET,
    PUBLISHED_COURSES_LIST_REQUEST,
    PUBLISHED_COURSES_LIST_SUCCESS,
    PUBLISHED_COURSES_LIST_FAIL
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


export const lessonCreateReducer = (state = { }, action ) => {
    switch ( action.type ) {
        case LESSON_CREATE_REQUEST :
            return { loading : true }
        case LESSON_CREATE_SUCCESS :
            return { loading : false, success : true, course : action.payload }
        case LESSON_CREATE_FAIL : 
            return { loading : false, error : action.payload }
        case LESSON_CREATE_RESET :
            return {}
        default : 
            return state
    }
}


export const lessonUpdateReducer = (state = { }, action ) => {
    switch ( action.type ) {
        case LESSON_UPDATE_REQUEST :
            return { loading : true }
        case LESSON_UPDATE_SUCCESS :
            return { loading : false, success : true, course : action.payload }
        case LESSON_UPDATE_FAIL : 
            return { loading : false, error : action.payload }
        case LESSON_UPDATE_RESET :
            return {}
        default : 
            return state
    }
}


export const coursePublishReducer = (state = { }, action ) => {
    switch ( action.type ) {
        case PUBLISH_COURSE_REQUEST :
            return { loading : true }
        case PUBLISH_COURSE_SUCCESS :
            return { loading : false, published : action.payload }
        case PUBLISH_COURSE_FAIL : 
            return { loading : false, error : action.payload }
        case PUBLISH_COURSE_RESET :
            return { published : false }
        default : 
            return state
    }
}

export const courseUnpublishReducer = (state = { }, action ) => {
    switch ( action.type ) {
        case UNPUBLISH_COURSE_REQUEST :
            return { loading : true }
        case UNPUBLISH_COURSE_SUCCESS :
            return { loading : false, unpublished : true}
        case UNPUBLISH_COURSE_FAIL :
            return { loading : false, error : action.payload }
            case UNPUBLISH_COURSE_RESET :
                return { unpublished : false }
        default : 
            return state
    }
}

export const publishedCoursesListReducer = (state = { }, action ) => {
    switch ( action.type ) {
        case PUBLISHED_COURSES_LIST_REQUEST :
            return { loading : true }
        case PUBLISHED_COURSES_LIST_SUCCESS :
            return { loading : false, courses : action.payload }
        case PUBLISHED_COURSES_LIST_FAIL : 
            return { loading : false, error : action.payload }
        default : 
            return state
    }
}
