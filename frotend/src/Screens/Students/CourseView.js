import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { LinkContainer } from 'react-router-bootstrap'
import { toast, ToastContainer } from 'react-toastify'
import ReactPlayer from 'react-player'
import './CourseView.css'
import { useParams, useNavigate } from 'react-router-dom'
import { Avatar } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { addtocartAction, enrollmentFreeCourseAction, studentCourseViewAction } from '../../Actions/StudentActions/CourseActions'
import { Row, Col, Accordion } from 'react-bootstrap'
const CourseView = () => {
    const { slug } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [ enrolled, setEnrolled ] = useState({})

    const userLogin = useSelector( state => state.userLogin )
    const { userInfo } = userLogin

    const studentCourseView = useSelector( state => state.studentCourseView )
    const { courseView } = studentCourseView

    useEffect (() => {
        dispatch(studentCourseViewAction( slug ))
    }, [ dispatch ])

    useEffect(()=>{
      if( userInfo && courseView && courseView.courseDetails ) checkEnrollment()
    },[ userInfo, courseView ])

    const checkEnrollment = async () => {
      const config = {
        headers : {
          Authorization : `Bearer ${userInfo && userInfo.token}`
        }
      }
      const { data } = await axios.get(`/api/students/check-enrollment/${courseView.courseDetails._id}`, config)
      setEnrolled(data)

    }

    const handleFreeEnrollment = (e) => {
      e.preventDefault()
      if(!userInfo || !userInfo.isStudent){
        toast("Please Login for Enrollment!...")
      }else{
        dispatch(enrollmentFreeCourseAction(enrolled && enrolled.course && enrolled.course._id))
      }
    }

    const handleAddtoCart = () => {
      if(!userInfo || !userInfo.isStudent){
        toast("Please Login for Add To Cart !...")
      }else{
      dispatch(addtocartAction(slug))
      }
    }
  return (
    <>
    <ToastContainer />
    {/* <pre>{JSON.stringify(courseView, null, 4)}</pre> */}
    <div className="courseDetailsPage">
      <div className="container-fluid py-3 p-5">
        <Row>
          <Col className='d-flex justify-content-center' md={12} lg={4}>
            <img className='w-100 h-auto' src={courseView && courseView.courseDetails && courseView.courseDetails.image} alt="" />
          </Col>
          <Col md={12} lg={5} className="p-3">
            <h1 style={{ fontWeight : "bold"}} className='mt-3'>{courseView && courseView.courseDetails && courseView.courseDetails.title}</h1>
            <h5>
              <i className="fa-solid fa-graduation-cap"></i> &nbsp;&nbsp;
              <b style={{ color : "rgb(120, 220, 178)"}}>{courseView && courseView.author && courseView.author.fname + " " + courseView.author.lname}</b>
            </h5> 
            <span 
              className='btn btn-outline-dark mt-3'
              style={{
                borderRadius : "50px",
                padding : "5px"
              }}
              >{courseView && courseView.courseDetails && courseView.courseDetails.category}
            </span>
            <p className='mt-3' style={{ color : "black"}}>{courseView && courseView.courseDetails && courseView.courseDetails.description}</p>
            <h5 className='mt-4'>
            <i className="fa-solid fa-align-justify"></i> &nbsp;&nbsp;
              <b>{courseView && courseView.courseDetails.lessons && courseView.courseDetails.lessons.length} Lessons</b>
            </h5> 
            <h5>
            <i class="fa-solid fa-users"></i> &nbsp;
              <b>{courseView && courseView.courseDetails && courseView.courseDetails.studentsCount} Students</b>
            </h5> 
            <div className="mt-5">
              <h3 style={{ fontSize : "30px", fontWeight : "bold", color : "green"}}>
                {
                  courseView && courseView.courseDetails && courseView.courseDetails.paid
                  ? `Price : ₹${ courseView && courseView.courseDetails && courseView.courseDetails.price }`
                  : "Free"
                }
              </h3>
            </div>
          </Col>
          <Col md={12} lg={3}>
            <div className="card-box shadow mb-5 bg-white rounded p-5">
              <h3>CheckOut : </h3>
              <div className="mt-5">
                {
                  courseView && courseView.courseDetails && courseView.courseDetails.paid ?
                  <>
                    <LinkContainer to={`/add-to-wishlist/${courseView && courseView.courseDetails.slug}`}>
                      <span className="btn btn-outline-dark btn-block w-100"><i className="fa-solid fa-heart"></i> Add to Wishlist</span>
                    </LinkContainer>
                    <span onClick={handleAddtoCart} className="btn btn-outline-success btn-block mt-3 w-100"><i className="fa-solid fa-cart-shopping"></i> Add to Cart</span> 
                  </> : 
                  <>
                    {
                      enrolled && enrolled.status ?
                      <LinkContainer to='/my-courses'>
                        <span className="btn btn-outline-primary btn-block w-100"><i className="fa-solid fa-bullseye-arrow"></i> Go To Your Courses</span>
                      </LinkContainer>  :
                      <span onClick={handleFreeEnrollment} className="btn btn-outline-success btn-block w-100"><i className="fa-solid fa-check"></i> Enroll Course</span>
                    }
                  </>
                }
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12} lg={6} className=" d-flex justify-content-center">
            <div className="lessons-card mt-5 rounded shadow p-3">
              <div className="d-flex justify-content-center">
                <h1>Course Lessons</h1>
              </div>
              <div className="container-fluid">
              <Accordion>
                {
                  courseView && courseView.courseDetails && courseView.courseDetails.lessons && courseView.courseDetails.lessons.map( ( lesson, index ) => (
                  <Accordion.Item eventKey={index}>
                    <Accordion.Header><Avatar>{index+1}</Avatar> &nbsp; &nbsp;{lesson.name}</Accordion.Header>
                    <Accordion.Body>{lesson.content}</Accordion.Body>
                  </Accordion.Item>
                  ))
                }
              </Accordion>
              </div>
            </div>
          </Col>
          <Col md={12} lg={6}></Col>
        </Row>
      </div>
    </div>
    </>
    // <>
    // <div className='courseDetailsTitleBox mt-2'>
    // <Container>
    // <Row>
    //     <Col className='d-flex justify-content-center p-3' md={6}>
    //       {
    //         courseView && courseView.courseDetails && courseView.courseDetails.lessons[0] && courseView.courseDetails.lessons[0].free_preview ?
    //         <ReactPlayer 
    //         url={ courseView.courseDetails.lessons[0].video} 
    //         playing ={ true}
    //         light={courseView.courseDetails.image}
    //         controls
    //         /> :
    //      <img src={courseView && courseView.courseDetails && courseView.courseDetails.image} alt=""/>
    //       }
    //     </Col>
    //     <Col md={6} className="p-2">
    //       <h1>{courseView && courseView.courseDetails && courseView.courseDetails.title}</h1>
    //       <h3 className='text-light'>{courseView && courseView.courseDetails && courseView.courseDetails.category}</h3>
    //       <p>Author : &nbsp;{courseView && courseView.author && courseView.author.fname}</p>
    //       <p>{courseView && courseView.courseDetails && courseView.courseDetails.lessons && courseView.courseDetails.lessons.length} Lessons</p>
    //       <p>Students : &nbsp; {courseView && courseView.courseDetails && courseView.courseDetails.students && courseView.courseDetails.students.length}0</p>
    //       <h2 style={{ color : "white"}}> Price :  &nbsp;{courseView && courseView.courseDetails && courseView.courseDetails.paid ? "₹ "+courseView.courseDetails.price : "Free"}</h2>
    //     </Col>
    // </Row>  
    // </Container>
    // </div>
    // <Container>
    //   <Row className='courseDetailsBox mt-2'>
    //     <Col md={8} className="p-5"> 
    //       <Card className='DescriptionBox p-5'>
    //         <h4>Description :</h4>
    //         <span>{courseView && courseView.courseDetails && courseView.courseDetails.description}</span>
    //       </Card>
    //       <Card className='lessonlistbox p-3 mt-3'>
    //         <h4 className='mb-4'>{courseView && courseView.courseDetails && courseView.courseDetails.lessons && courseView.courseDetails.lessons.length } Lessons Included</h4>
    //         <div>
    //           {
    //             courseView && courseView.courseDetails && courseView.courseDetails.lessons.map( (lesson, index )=> (
    //               <>
    //               <h5>{index+1}.&nbsp;&nbsp;&nbsp;{lesson.name}</h5>
    //                 <hr style={{ color : "black"}} />
    //               </>
    //             ))
    //           }
    //         </div>
    //       </Card>
    //     </Col>
    //     <Col md={4} className="p-4">
    //       {
    //         courseView && courseView.courseDetails && courseView.courseDetails.paid ?
    //     <Card className='addtoCart p-5'>
    //         <Col sm={12} className="d-flex justify-content-center">
    //           <LinkContainer to={`/add-to-wishlist/${courseView && courseView.courseDetails.slug}`}>
    //             <span className="btn btn-outline-dark btn-block mt-3 w-100">Add to Wishlist</span>
    //           </LinkContainer>
    //         </Col>
    //         <Col sm={12} className="d-flex justify-content-center">

    //             <span onClick={handleAddtoCart} className="btn btn-outline-success btn-block mt-3 w-100">Add to Cart</span>
              
    //         </Col>
    //       </Card> :
    //       <Card className='addtoCart p-5'>
    //       <Col sm={12} className="d-flex justify-content-center">
    //           {
    //             enrolled && enrolled.status ?<LinkContainer to='/my-courses'><span className="btn btn-outline-primary btn-block mt-3 w-100">Go To Your Courses</span></LinkContainer>  :
    //             <span onClick={handleFreeEnrollment} className="btn btn-outline-dark btn-block mt-3 w-100">Enroll Course</span>
    //           }
    //       </Col>
    //     </Card>
    //       }
    //     </Col>
    //   </Row>
    // </Container>
    // <pre>{JSON.stringify(courseView, null, 4)}</pre>
    // </>
  )
}

export default CourseView