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
    UNBLOCK_STUDENTS_SUCCESS
} from "../Constants/Admin/adiminConstants"

export const listInstructorsReducer = (state = { }, action ) => {
    switch ( action.type ) {
        case LIST_INSTRUCTORS_REQUEST :
            return { loading : true }
        case LIST_INSTRUCTORS_SUCCESS :
            return { loading : false, instructorsList : action.payload }
        case LIST_INSTRUCTORS_FAIL : 
            return { loading : false, error : action.payload }
        default : 
            return state
    }
}


// student Reducers
export const listStudentsReducer = (state = { }, action ) => {
    switch ( action.type ) {
        case LIST_STUDENTS_REQUEST :
            return { loading : true }
        case LIST_STUDENTS_SUCCESS :
            return { loading : false, studentsList : action.payload }
        case LIST_STUDENTS_FAIL : 
            return { loading : false, error : action.payload }
        default : 
            return state
    }
}

export const blockStudentsReducer = (state = { }, action ) => {
    switch ( action.type ) {
        case BLOCK_STUDENTS_REQUEST :
            return { loading : true }
        case BLOCK_STUDENTS_SUCCESS :
            return { loading : false, blocked : action.payload }
        case BLOCK_STUDENTS_FAIL : 
            return { loading : false, error : action.payload }
        default : 
            return state
    }
}


export const unBlockStudentsReducer = (state = { }, action ) => {
    switch ( action.type ) {
        case UNBLOCK_STUDENTS_REQUEST :
            return { loading : true }
        case UNBLOCK_STUDENTS_SUCCESS :
            return { loading : false, UnBlocked : action.payload }
        case UNBLOCK_STUDENTS_FAIL : 
            return { loading : false, error : action.payload }
        default : 
            return state
    }
}