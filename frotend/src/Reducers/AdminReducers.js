import { 
    LIST_INSTRUCTORS_FAIL, 
    LIST_INSTRUCTORS_REQUEST, 
    LIST_INSTRUCTORS_SUCCESS, 
    LIST_STUDENTS_FAIL, 
    LIST_STUDENTS_REQUEST,
    LIST_STUDENTS_SUCCESS
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