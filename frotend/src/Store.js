import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { userLoginReducer, userRegisterReducer } from './Reducers/UserReducers'
import { courseCreateReducer, courseListReducer, courseUpdateReducer, courseViewReducer } from './Reducers/CourseReducers'


const reducer = combineReducers({
    userLogin : userLoginReducer,
    userRegister : userRegisterReducer,

    courseCreate : courseCreateReducer,
    courseList : courseListReducer,
    courseViewDetails : courseViewReducer,
    courseUpdate : courseUpdateReducer
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