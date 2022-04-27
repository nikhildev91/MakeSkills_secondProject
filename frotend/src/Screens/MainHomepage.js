import React, { useEffect } from 'react'
import './MainHomepage.css'
import { Container, Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import CourseListingCard from '../Components/Students/CourseListingCard'
import { studentCourseListAction } from '../Actions/StudentActions/CourseActions'

const MainHomepage = () => {
  const dispatch = useDispatch()
  const studentCourseList = useSelector( state => state.studentCourseList )
  const { coursesList } = studentCourseList

  useEffect(() => {
    dispatch(studentCourseListAction())
  }, [])
  return (
    <>
    <div className='banner1'>
      <Container >
        <p className='banner-short-title'>The best Courses</p>
        <h1 className='banner1-title'>Top Education <br />Courses 2022</h1>
        <p className='banner-short-para'>We are ready to help you to learn any topic you are interested in</p>
        <span className='btn btn-success mt-4'>Getting Start</span>
      </Container>
    </div>
    {/* <pre>{JSON.stringify(coursesList, null, 4)}</pre> */}
    <div className="min-title-wrapper">
      
      <h5 className="mini-course-title text-center">Popular Course</h5>
      <h1 className='text-center mt-5 ourProgrammes'>Our Programmes</h1>
    </div>
    <div className="container-fluid py-5">
      <div className="row d-flex justify-content-center">
        <CourseListingCard courses={coursesList}/>
      </div>
      <p style={{ display : "flex", justifyContent : "center", fontWeight : "normal", fontSize : "20px"}}><u>See More Courses &nbsp;<i className="fa-solid fa-arrow-right"></i></u></p>
    </div>

    <Container>
      <div className="registerDiv">
        <div className="row d-flex justify-content-center mt-5">
        <h1 className="mt-5 text-center">Register Now!</h1>
        <div className="col-md-12 d-flex justify-content-center">
          <div className="card shadow mb-5 bg-white rounded mt-3" style={{ height : "690px"}}>
            <div className="reg-style p-4" style={{ backgroundColor : "rgb(218, 249, 244)"}}>
              <p className='text-center reg-title'>Create Your Free Account Now and Get</p>
              <p className='text-center reg-title'>Immediate Access to </p>
              <h4 className='text-center' style={{ fontWeight : "bold", color : "rgb(120, 220, 178)"}}>100s of Online Courses</h4>
            </div>
            <div className="card-body p-4">
              <Form>
                <Form.Control className='mt-3' type='text' placeholder='First Name'/>
                <Form.Control className='mt-3' type='text' placeholder='Lasr Name'/>
                <Form.Control className='mt-3' type='email' placeholder='Email'/>
                <Form.Group className='mt-3'>
                <Form.Check inline type='radio' label="Student"  name='accountType'/>
                <Form.Check inline type='radio' label="Instructor" name='accountType'/>
                </Form.Group>
                <Form.Control className='mt-3' type='password' placeholder='New Password'/>
                <Form.Control className='mt-3' type='password' placeholder='Confirm Password'/>
                <div className='d-flex justify-content-center mt-4'>
                <span className="btn btn-success w-75 submitButton" type='submit'>Get It</span>
                </div>
              </Form>
            </div>
          </div>
        </div>
        </div>
      </div>
    </Container>
    </>
  )
}

export default MainHomepage