import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import { cartListAction,removeCartItemAction } from '../../Actions/StudentActions/CourseActions'

const AddtoCart = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userLogin = useSelector( state => state.userLogin )
  const { userInfo } = userLogin

  const cartLists = useSelector( state => state.cartLists )
  const { courses } = cartLists

  useEffect(() => {
    if(!userInfo && !userInfo.isStudent) {
      navigate('/')
    }
    dispatch(cartListAction())
  }, [ dispatch, userInfo ])

  return (
    <div style={{ minHeight : "75vh", backgroundColor: "rgb(227, 242, 237)"}}>
    <div className='container-fluid'>
      <Row>
        <h1 className='mt-5'>My Cart</h1>
        <Col md={8}>
         
          <Row >
            {
              courses && courses.Items && courses.Items.length === 0 ?
              <Row >
              <Col className='d-flex justify-content-center p-5'> <h1 className='mt-5'>Cart Empty</h1></Col>
            </Row> :

            
              courses && courses.Items && courses.Items.map( course => (

                <div className="col-md-12 col-sm-12 col-lg-2 d-flex justify-content-center">
                <LinkContainer to={`/course-details/${course.slug}`}>
                <div className="card shadow mb-5 bg-white rounded">
                  <img className="card-img-top" src={course.image} alt={course.title} />
                  <div className="card-body">
                      <h5 className="mt-3 instructorNameCard"><i className="fa-solid fa-graduation-cap"></i>&nbsp;&nbsp;<b style={{ color : "rgb(120, 220, 178)"}}>{course.instructorId.fname + " " + course.instructorId.lname}</b></h5>
                      <h3 className="card-title mt-3" style={{ fontWeight : "bold"}}>{course.title}</h3>
                      <p className="card-text mt-4">{course.description}</p>
                      <span className='proCardContent' style={{ fontWeight : "bold"}}><i className="fa-solid fa-align-justify"></i> {course.lessons && course.lessons.length} Lessons</span>
                    <div className="mt-3">
                        <span className='proCardContent' style={{ fontWeight : "bold"}}><i className="fa-solid fa-user-group"></i> {course.studentsCount} Students</span>
                        {
                          <span className='sellingPrice' style={{ float : "right"}}>₹ {course.paid ? course.price : "Free"}</span>
                        }
                    </div> 
                  </div>
                </div>
                </LinkContainer>
                </div>
              ))
            
            }
          </Row>
        </Col>
        <Col md={4}>
          <div className='card m-4 p-4'>
           <h4>Checkout: </h4>
           {
             courses && courses.Items.map( course => (
                <Row className='d-flex justify-content-center'>
                  <Col sm={6}><p>{ course.title }</p></Col>
                  <Col sm={6}><p>{ course.price }</p></Col>
                </Row>
             ))
           }
           <hr />
            <Row>
              <Col sm={6}><h6>Total Amount : </h6></Col>
              <Col sm={6}><h5>₹{ courses && courses.totalAmount }</h5></Col>
            </Row>
            <Row>
              <Col className='d-flex justify-content-center'><span className='btn btn-outline-success btn-block w-100 mt-3'>
                {courses && courses.totalAmount === 0 ? "Enroll" : "Checkout"}
                </span></Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
    </div>
  )
}

export default AddtoCart