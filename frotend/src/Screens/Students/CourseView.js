import React, { useEffect } from 'react'
import { Row, Container, Col, Card } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import './CourseView.css'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { studentCourseViewAction } from '../../Actions/StudentActions/CourseActions'

const CourseView = () => {
    const { slug } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userLogin = useSelector( state => state.userLogin )
    const { userInfo } = userLogin

    const studentCourseView = useSelector( state => state.studentCourseView )
    const { courseView } = studentCourseView

    useEffect (() => {
        if( !userInfo && !userInfo.isStudent ) {
            navigate('/')
        }
        dispatch(studentCourseViewAction( slug ))
    }, [ dispatch, userInfo ])

  return (
    <>
    <div className='courseDetailsTitleBox mt-2'>
    <Container>
    <Row>
        <Col className='d-flex justify-content-center p-3' md={6}>
         <img src={courseView && courseView.courseDetails && courseView.courseDetails.image} alt="" width="300px"/>
        </Col>
        <Col md={6} className="p-2">
          <h1>{courseView && courseView.courseDetails && courseView.courseDetails.title}</h1>
          <h3 className='text-light'>{courseView && courseView.courseDetails && courseView.courseDetails.category}</h3>
          <p>Author : &nbsp;{courseView && courseView.author && courseView.author.fname}</p>
          <p>{courseView && courseView.courseDetails && courseView.courseDetails.lessons && courseView.courseDetails.lessons.length} Lessons</p>
          <p>Students : &nbsp; {courseView && courseView.courseDetails && courseView.courseDetails.students && courseView.courseDetails.students.length}0</p>
        </Col>
    </Row>  
    </Container>
    </div>
    <Container>
      <Row className='courseDetailsBox mt-2'>
        <Col md={8} className="p-5"> 
          <Card className='DescriptionBox p-5'>
            <h4>Description :</h4>
            <span>{courseView && courseView.courseDetails && courseView.courseDetails.description}</span>
          </Card>
        </Col>
        <Col md={4} className="p-4">
        <Card className='addtoCart p-5'>
            <h4>Description :</h4>
            <Col sm={12} className="d-flex justify-content-center">
              <LinkContainer to={`/add-to-wishlist/${courseView && courseView.courseDetails.slug}`}>
                <span className="btn btn-outline-dark btn-block mt-3 w-100">Add to Wishlist</span>
              </LinkContainer>
            </Col>
            <Col sm={12} className="d-flex justify-content-center">
              <LinkContainer to={`/add-to-cart/${courseView && courseView.courseDetails.slug}`}>
                <span className="btn btn-outline-success btn-block mt-3 w-100">Add to Cart</span>
              </LinkContainer>
            </Col>
          </Card>
        </Col>
      </Row>
    </Container>
    <pre>{JSON.stringify(courseView)}</pre>
    </>
  )
}

export default CourseView