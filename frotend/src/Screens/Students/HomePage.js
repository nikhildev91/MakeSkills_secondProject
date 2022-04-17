import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import CourseListingCard from '../../Components/Students/CourseListingCard'
import { studentCourseListAction } from '../../Actions/StudentActions/CourseActions'

const HomePage = () => {
    const naviagate = useNavigate()
    const dispatch = useDispatch()

    const userLogin = useSelector( state => state.userLogin )
    const { userInfo } = userLogin

    const studentCourseList = useSelector( state => state.studentCourseList )
    const { coursesList } = studentCourseList

    useEffect(() => {
        dispatch(studentCourseListAction())
    }, [ userInfo, dispatch ])
   
  return (
      <>
    <Row >
        <Col sm={12} className='d-flex' style={{width : "100%", height : "450px", background : `url('/banner2.png')`, margin : "0px"}}>

        </Col>
    </Row>
    <Row className='m-5'>
        <h1>What To Learn Next?</h1>
            <CourseListingCard courses = {coursesList} />
        
    </Row>
    <pre>{JSON.stringify(coursesList)}</pre>
    </>
  )
}

export default HomePage