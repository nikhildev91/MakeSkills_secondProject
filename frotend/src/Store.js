import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer, userRegisterReducer } from './Reducers/UserReducers'
import { 
    courseCreateReducer, 
    courseListReducer, 
    coursePublishReducer, 
    courseUnpublishReducer, 
    courseUpdateReducer, 
    courseViewReducer, 
    lessonCreateReducer, 
    lessonUpdateReducer,
    publishedCoursesListReducer
} from './Reducers/CourseReducers'
import { 
    cartListReducer,
    createReviewReducer,
    freeEnrollmentCourseReducer,
    listCompleteReducer,
    listMyCoursesReducer,
    markLessonCompleteReducer,
    myCourseDetailsReducer,
    myCourseStartReducer,
    provideCertificateReducer,
    removeCartItemReducer,
    studentCourseAddtocartReducer,
    studentCourseDetailsReducer,
    studentCourseListReducer 
} from './Reducers/StudentReducers./CoursesReducers'
import { 
    blockInstructorsReducer,
    blockStudentsReducer,
    listInstructorsReducer, 
    listStudentsReducer, 
    unBlockInstructorsReducer, 
    unBlockStudentsReducer
} from './Reducers/AdminReducers'


const reducer = combineReducers({
    userLogin : userLoginReducer,
    userRegister : userRegisterReducer,

    courseCreate : courseCreateReducer,
    courseList : courseListReducer,
    courseViewDetails : courseViewReducer,
    courseUpdate : courseUpdateReducer,
    publishCourse : coursePublishReducer,
    unpublishCourse : courseUnpublishReducer,
    publishedCoursesList : publishedCoursesListReducer,
    
    lessonCreate : lessonCreateReducer,
    lessonUpdate : lessonUpdateReducer,

    studentCourseList : studentCourseListReducer,
    studentCourseView : studentCourseDetailsReducer,
    addtocartCourses : studentCourseAddtocartReducer,
    cartLists : cartListReducer,
    removeCartItem : removeCartItemReducer,
    freeEnrollmentCourse : freeEnrollmentCourseReducer,
    myCoursesList : listMyCoursesReducer,
    myCourseDetails : myCourseDetailsReducer,
    startCourse : myCourseStartReducer,
    markLessonCompleted : markLessonCompleteReducer,
    listCompleted : listCompleteReducer,
    provideCertificate : provideCertificateReducer,
    courseReview : createReviewReducer,

    listInstructors : listInstructorsReducer,
    studentsLists : listStudentsReducer,
    blockStudent : blockStudentsReducer,
    unBlockStudent : unBlockStudentsReducer,
    blockInstructor : blockInstructorsReducer,
    unBlockInstructor : unBlockInstructorsReducer
})

const userInfoFromStorage = localStorage.getItem('userInfo') 
? JSON.parse(localStorage.getItem('userInfo'))
: null

const initialState ={
    userLogin : { userInfo : userInfoFromStorage}
}

const middleware = [thunk]
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store