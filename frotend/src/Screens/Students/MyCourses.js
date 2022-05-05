import React, { useEffect } from 'react'
import { Row } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loadMyCoursesAction } from '../../Actions/StudentActions/CourseActions'
import CourseListingCard from '../../Components/Students/CourseListingCard'

const MyCourses = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userLogin = useSelector( state => state.userLogin )
    const { userInfo } = userLogin

    const myCoursesList = useSelector( state => state.myCoursesList )
    const { courses } = myCoursesList

    useEffect(() => {
        if(!userInfo || !userInfo.isStudent){
            navigate('/login')
        }

        dispatch(loadMyCoursesAction())
    }, [ userInfo ])
  return (
    <div className='container-fluid p-5' style={{ minHeight : "78vh"}}>
      <h1 style={{ fontWeight : "bold"}}>My Courses</h1>
      <Row>
        <CourseListingCard courses={courses} mycourses={true}/>
      </Row>
    </div>
  )
}

export default MyCourses