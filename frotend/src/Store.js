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
    lessonUpdateReducer
} from './Reducers/CourseReducers'
import { 
    cartListReducer,
    removeCartItemReducer,
    studentCourseAddtocartReducer,
    studentCourseDetailsReducer,
    studentCourseListReducer 
} from './Reducers/StudentReducers./CoursesReducers'


const reducer = combineReducers({
    userLogin : userLoginReducer,
    userRegister : userRegisterReducer,

    courseCreate : courseCreateReducer,
    courseList : courseListReducer,
    courseViewDetails : courseViewReducer,
    courseUpdate : courseUpdateReducer,
    publishCourse : coursePublishReducer,
    unpublishCourse : courseUnpublishReducer,
    
    lessonCreate : lessonCreateReducer,
    lessonUpdate : lessonUpdateReducer,

    studentCourseList : studentCourseListReducer,
    studentCourseView : studentCourseDetailsReducer,
    addtocartCourses : studentCourseAddtocartReducer,
    cartLists : cartListReducer,
    removeCartItem : removeCartItemReducer
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