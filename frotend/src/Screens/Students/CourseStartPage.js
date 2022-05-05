import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Row, Col, Container } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { mycourseDetailsAction } from '../../Actions/StudentActions/CourseActions'
import { LinkContainer } from 'react-router-bootstrap'

const CourseStartPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { slug } = useParams()

  const userLogin = useSelector( state => state.userLogin )
  const { userInfo } = userLogin

  const myCourseDetails = useSelector( state => state.myCourseDetails )
  const { course } = myCourseDetails

  useEffect(() => {
    if(!userInfo){
      navigate('/login')
    }
      dispatch(mycourseDetailsAction(slug))
  }, [ userInfo, dispatch ])
  return (
    <div className='courseStartPageBox py-3' style={{ backgroundColor : "rgb(236, 252, 250)", minHeight : "80vh"}}>
      <div className="container-fluid p-5 m-5">
        <div className="row">
          <div className="col-md-12 col-lg-4 d-flex justify-content-center">
            <img className='w-100' src={course && course.courseDetails && course.courseDetails.image} alt={course && course.courseDetails && course.courseDetails.title} />
          </div>
          <div className="col-md-12 col-lg-8">
            <div className='mt-2'>
              <h1>{course && course.courseDetails && course.courseDetails.title}</h1>
              <h5>Author : { course && course.author.fname + " " + course.author.lname}</h5>
              <span className='btn btn-outline-dark btn-block rounded-pill justify-content-center mt-3'>{course && course.courseDetails && course.courseDetails.category}</span>
              <p className='mt-3'>{course && course.courseDetails && course.courseDetails.description}</p>
              <div className="">
              <LinkContainer to={`/course/${course && course.courseDetails && course.courseDetails.slug}`}>
                <span className='mt-5 btn btn-primary btn-block text-light ms-auto' style={{ float : "right"}}>Start Course</span>
              </LinkContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Container className='align-self-center'>
        <Row>
          <Col md={6} className="p-5 d-flex justify-content-center">
            <img src={course && course.courseDetails && course.courseDetails.image} alt={course && course.courseDetails && course.courseDetails.title} />
          </Col>
          <Col md={6}>
            <h1>{course && course.courseDetails && course.courseDetails.title}</h1>
            <h5 style={{color : "white"}}>Author : { course && course.author.fname + " " + course.author.lname}</h5>
            <span className='btn btn-outline-light btn-block rounded-pill justify-content-center mt-3'>{course && course.courseDetails && course.courseDetails.category}</span>
            <p className='mt-3'>{course && course.courseDetails && course.courseDetails.description}</p>
            <LinkContainer to={`/course/${course && course.courseDetails && course.courseDetails.slug}`}>
            <span className='mt-5 btn btn-primary btn-block justify-content-center text-light'>Start Course</span>
            </LinkContainer>
          </Col>
        </Row>
      </Container> */}
      {/* <pre>{JSON.stringify(course, null, 4 )}</pre> */}
    </div>
  )
}

export default CourseStartPage