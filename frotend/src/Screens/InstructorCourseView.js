import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { courseViewAction } from '../Actions/CourseActions'

const InstructorCourseView = () => {
    const { slug } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userLogin = useSelector( state => state.userLogin )
    const { userInfo } = userLogin

    const courseViewDetails = useSelector( state => state.courseViewDetails )
    const { courseDetails } = courseViewDetails

    useEffect(() => {
        if(userInfo && !userInfo.isInstructor ){
            navigate('/login')
        }
        dispatch(courseViewAction(slug))
    }, [ userInfo, dispatch ])

    const handleEdit = () => {
        navigate(`/instructor/edit-course/${slug}`)
    }

  return (
    <Container>
        <Row>
            <Col sm={12}>
                <div className="courseTitleBox mt-3 card" style={{ backgroundColor : "black"}}>
                    <Row className='p-5'>
                        <Col md={6} style={{ color : "white"}}>
                            <h2 className='mt-3' style={{ color : "white"}}>{courseDetails && courseDetails.title}</h2>
                            <h4 className='mt-3' style={{ color : "white"}}>{courseDetails && courseDetails.category}</h4>
                            <p className='mt-3' style={{ color : "white"}}>{courseDetails && courseDetails.lessons && courseDetails.lessons.length} Lessons</p>
                            <h1 className='mt-3' style={{ color : "white"}}>₹ {courseDetails && courseDetails.price}</h1>
                        </Col>
                        <Col md={6} style={{ color : "white"}} >
                            <img src={courseDetails && courseDetails.image && courseDetails.image.Location } alt={courseDetails && courseDetails.title} className="w-100 d-flex justify-content-center"/>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
            
        <hr />
        <Row>
            <Col md={8}>
                <h4>Description</h4>
                <p>{courseDetails && courseDetails.description}</p>
            </Col>
            <Col md={4}>
                <Row>
                    <Col md={6}><i className="fa-solid fa-pen-to-square" style={{ fontSize : "30px"}} onClick={ handleEdit }></i></Col>
                    <Col md={6}><i className="fa-solid fa-check" style={{ fontSize : "30px"}}></i></Col>
                </Row>
                <Button className='w-100 rounded-pill mt-3' ><i className="fa-solid fa-plus" ></i>&nbsp; Add Lesson</Button>
            </Col>
        </Row>
    </Container>
  )
}

export default InstructorCourseView