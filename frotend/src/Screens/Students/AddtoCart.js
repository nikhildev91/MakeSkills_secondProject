import React, { useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
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
    <div className='mt-2 cartListBox'>
    <Container>
      <Row>
        <h1 className='mt-5'>My Cart</h1>
        <Col md={8}>
         
          <Row >
            {
              courses && courses.Items && courses.Items.length === 0 ?
              <Row >
              <Col className='d-flex justify-content-center p-5'> <h1 className='mt-5'>Cart Empty</h1></Col>
            </Row> :
              courses && courses.Items.map( course => (
                <Col md={4} className="d-flex justify-content-center mt-2">
                  <div className="card" style={{ width: "18rem"}}>
                    <img className="card-img-top" src={course && course.image} alt="Card image cap"/>
                    <div className="card-body">
                        <h5 className="card-title">{ course && course.title}</h5>
                        <p className="card-text" style={{ color : "black"}}>{course && course.description}</p>
                        <a onClick={() => { dispatch(removeCartItemAction(course && course._id, courses._id ))}} className="btn btn-primary ms-auto">Remove</a>
                    </div>
                  </div>
                </Col>
              ))
            }
          </Row>
        </Col>
        <Col md={4}>
          <div className='card m-4 p-3' style={{ color : "black"}}>
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
    </Container>
    </div>
  )
}

export default AddtoCart