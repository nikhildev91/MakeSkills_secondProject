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