import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Row, Col ,Container, Form} from 'react-bootstrap'
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
      if(!userInfo || !userInfo.isStudent){
        naviagate('/')
      }
        dispatch(studentCourseListAction())
    }, [ userInfo, dispatch ])
   
  return (
      <> 
          <div className='banner2'>
            <div className="gradiant-banner2">
              <div>
                    <h1>All Courses</h1>
              </div>
              <Container>
              <Form>
                <Form.Group>
                  <div className="d-flex justify-content-center">
                      <Form.Control className='ms-auto w-50 p-3 searchField' placeholder='Search Courses..' style={{ display : "inline-block"}}/>
                      <span style={{ display : "inline-block"}} className='btn btn-success me-auto w-25 p-3 searchButton'>Search</span>
                  </div>
                </Form.Group>
              </Form>
              </Container>
            </div>
          </div>
        <Row className='m-5'>
          <h1>What To Learn Next?</h1>
          <CourseListingCard courses = {coursesList} />    
        </Row>
    </>
  )
}

export default HomePage