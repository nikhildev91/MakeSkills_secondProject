import { 
    CART_LIST_FAIL,
    CART_LIST_REQUEST,
    CART_LIST_SUCCESS,
    FREE_ENROLLMENT_COURSE_FAIL,
    FREE_ENROLLMENT_COURSE_REQUEST,
    FREE_ENROLLMENT_COURSE_RESET,
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
    PROVIDE_CERTIFICATE_RESET,
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
} from "../../Constants/StudentConstants/CourseConstants"

export const studentCourseListReducer = (state = { }, action ) => {
    switch ( action.type ) {
        case STUDENTS_COURSE_LIST_REQUEST :
            return { loading : true }
        case STUDENTS_COURSE_LIST_SUCCESS :
            return { loading : false, coursesList : action.payload }
        case STUDENTS_COURSE_LIST_FAIL : 
            return { loading : false, error : action.payload }
        default : 
            return state
    }
}

export const studentCourseDetailsReducer = (state = { }, action ) => {
    switch ( action.type ) {
        case STUDENTS_COURSE_DETAILS_REQUEST :
            return { loading : true }
        case STUDENTS_COURSE_DETAILS_SUCCESS :
            return { loading : false, courseView : action.payload }
        case STUDENTS_COURSE_DETAILS_FAIL : 
            return { loading : false, error : action.payload }
        default : 
            return state
    }
}

export const studentCourseAddtocartReducer = (state = { }, action ) => {
    switch ( action.type ) {
        case STUDENTS_COURSE_ADDTOCART_REQUEST :
            return { loading : true }
        case STUDENTS_COURSE_ADDTOCART_SUCCESS :
            return { loading : false, addtocartCourses : action.payload }
        case STUDENTS_COURSE_ADDTOCART_FAIL : 
            return { loading : false, error : action.payload }
        default : 
            return state
    }
}


export const cartListReducer = (state = { }, action ) => {
    switch ( action.type ) {
        case CART_LIST_REQUEST :
            return { loading : true }
        case CART_LIST_SUCCESS :
            return { loading : false, courses : action.payload }
        case CART_LIST_FAIL : 
            return { loading : false, error : action.payload }
        default : 
            return state
    }
}

export const removeCartItemReducer = (state = { }, action ) => {
    switch ( action.type ) {
        case REMOVE_CART_ITEM_REQUEST :
            return { loading : true }
        case REMOVE_CART_ITEM_SUCCESS :
            return { loading : false, remove : action.payload }
        case REMOVE_CART_ITEM_FAIL : 
            return { loading : false, error : action.payload }
        default : 
            return state
    }
}

export const freeEnrollmentCourseReducer = (state = { }, action ) => {
    switch ( action.type ) {
        case FREE_ENROLLMENT_COURSE_REQUEST :
            return { loading : true }
        case FREE_ENROLLMENT_COURSE_SUCCESS :
            return { loading : false, success : action.payload }
        case FREE_ENROLLMENT_COURSE_FAIL : 
            return { loading : false, error : action.payload }
        case FREE_ENROLLMENT_COURSE_RESET : 
            return { }
        default : 
            return state
    }
}

export const listMyCoursesReducer = (state = { }, action ) => {
    switch ( action.type ) {
        case LIST_MYCOURSES_REQUEST :
            return { loading : true }
        case LIST_MYCOURSES_SUCCESS :
            return { loading : false, courses : action.payload }
        case LIST_MYCOURSES_FAIL : 
            return { loading : false, error : action.payload }
        default : 
            return state
    }
}

export const myCourseDetailsReducer = (state = { }, action ) => {
    switch ( action.type ) {
        case MYCOURSES_DETAILS_REQUEST :
            return { loading : true }
        case MYCOURSES_DETAILS_SUCCESS :
            return { loading : false, course : action.payload }
        case MYCOURSES_DETAILS_FAIL : 
            return { loading : false, error : action.payload }
        default : 
            return state
    }
}

export const myCourseStartReducer = (state = { }, action ) => {
    switch ( action.type ) {
        case MYCOURSE_START_REQUEST :
            return { loading : true }
        case MYCOURSE_START_SUCCESS :
            return { loading : false, course : action.payload }
        case MYCOURSE_START_FAIL : 
            return { loading : false, error : action.payload }
        default : 
            return state
    }
}


export const markLessonCompleteReducer = (state = { }, action ) => {
    switch ( action.type ) {
        case MARK_lESSON_COMPLETE_REQUEST :
            return { loading : true }
        case MARK_lESSON_COMPLETE_SUCCESS :
            return { loading : false, completed : action.payload }
        case MARK_lESSON_COMPLETE_FAIL : 
            return { loading : false, error : action.payload }
        default : 
            return state
    }
}


export const listCompleteReducer = (state = { }, action ) => {
    switch ( action.type ) {
        case LIST_COMPLETE_REQUEST :
            return { loading : true }
        case LIST_COMPLETE_SUCCESS :
            return { loading : false, completedList : action.payload }
        case LIST_COMPLETE_FAIL : 
            return { loading : false, error : action.payload }
        default : 
            return state
    }
}


export const provideCertificateReducer = (state = { }, action ) => {
    switch ( action.type ) {
        case PROVIDE_CERTIFICATE_REQUEST :
            return { loading : true }
        case PROVIDE_CERTIFICATE_SUCCESS :
            return { loading : false, certificate : action.payload }
        case PROVIDE_CERTIFICATE_FAIL : 
            return { loading : false, error : action.payload }
        case PROVIDE_CERTIFICATE_RESET : 
            return { }
        default : 
            return state
    }
}