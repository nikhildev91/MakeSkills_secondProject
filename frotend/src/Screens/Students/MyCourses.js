import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loadMyCoursesAction } from '../../Actions/StudentActions/CourseActions'

const MyCourses = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userLogin = useSelector( state => state.userLogin )
    const { userInfo } = userLogin

    const myCoursesList = useSelector( state => state.myCoursesList )
    const { courses } = myCoursesList

    useEffect(() => {
        if(!userInfo && !userInfo.isStudent){
            navigate('/login')
        }

        dispatch(loadMyCoursesAction())
    }, [ userInfo ])
  return (
    <>
    <Container className='mt-5'>
      <h1>My Courses</h1>
      <Row className='mt-4'>
        {
          courses && courses.map( course => (
            <Col md={3}>
              <div className="card" style={{width : "18rem"}}>
                <img className="card-img-top" src={course.image} alt={course.title} />
                <div className="card-body">
                  <h5 className="card-title">{course.title}</h5>
                  <p className="card-text text-dark">{course.description}</p>
                  <LinkContainer to ={ `/start-course/${course.slug}`}>
                  <a className="btn btn-success">Start Course</a>
                  </LinkContainer>
                </div>
              </div>
            </Col>
          ))
        }
      </Row>
    </Container>
    </>
  )
}

export default MyCourses