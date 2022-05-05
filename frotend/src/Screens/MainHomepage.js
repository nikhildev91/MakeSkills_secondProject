import React, { useEffect, useState } from 'react'
import './MainHomepage.css'
import { Container, Form, Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import CourseListingCard from '../Components/Students/CourseListingCard'
import { studentCourseListAction } from '../Actions/StudentActions/CourseActions'
import { register } from '../Actions/UserActions'
import { LinkContainer } from 'react-router-bootstrap'

const MainHomepage = () => {
  const dispatch = useDispatch()
  const studentCourseList = useSelector( state => state.studentCourseList )
  const { coursesList } = studentCourseList

  const [ fname, setFname ] = useState('')
  const [ lname, setLname ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ isStudent, setIsStudent ] = useState(false)
  const [ password, setPassword ] = useState('')
  const [ confirmPassword, setConfirmPassword ] = useState('')
  useEffect(() => {
    dispatch(studentCourseListAction())
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    let isInstructor = isStudent ? false : true
    if(password === confirmPassword){
      dispatch(register(fname, lname, email, isInstructor, isStudent, password ))
    }
  }
  return (
    <>
    <div className='banner1'>
      <Container >
        <p className='banner-short-title'>The best Courses</p>
        <h1 className='banner1-title'>Top Education <br />Courses 2022</h1>
        <p className='banner-short-para'>We are ready to help you to learn any topic you are interested in</p>
        <LinkContainer to='/login'>
        <span className='btn btn-success mt-4'>Getting Start</span>
        </LinkContainer>
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
              <Form onSubmit={handleSubmit}>
                <Form.Control className='mt-3' type='text' placeholder='First Name' value={fname} onChange={ (e) => setFname(e.target.value) }/>
                <Form.Control className='mt-3' type='text' placeholder='Lasr Name' value={lname} onChange={ (e) => setLname(e.target.value)}/>
                <Form.Control className='mt-3' type='email' placeholder='Email' value={email} onChange={ (e) => setEmail(e.target.value)}/>
                <Form.Group className='mt-3'>
                <Form.Check inline type='radio' label="Student"  name='accountType' value={isStudent} onClick={ (e) => setIsStudent(false)}/>
                <Form.Check inline type='radio' label="Instructor" name='accountType' value={!isStudent} onClick={ (e) => setIsStudent(false)}/>
                </Form.Group>
                <Form.Control className='mt-3' type='password' placeholder='New Password' value={password} onChange={ (e) => setPassword(e.target.value)}/>
                <Form.Control className='mt-3' type='password' placeholder='Confirm Password' value={ confirmPassword } onChange={ (e) => setConfirmPassword(e.target.value)}/>
                <div className='d-flex justify-content-center mt-4'>
                <Button className="btn btn-success w-75 submitButton" type='submit'>Get It</Button>
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