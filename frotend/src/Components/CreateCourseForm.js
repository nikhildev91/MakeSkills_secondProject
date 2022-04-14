import React from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import { ToastContainer } from 'react-toastify'
import { Spin } from 'antd'
import { useSelector } from 'react-redux'
import FormContainer from './FormContainer'
import Message from './Message'

const CreateCourseForm = (props) => {
  const courseCreate =  useSelector( state => state.courseCreate)
  const { error } = courseCreate
  return (
    <FormContainer>
      <ToastContainer />
      <h1 className='text-center'>Create Course</h1>
      { error && <Message variant='danger'>{error}</Message>}
      <Form onSubmit={props.handleSubmit}>
        <Form.Group className='mt-3'>
          <Form.Label>Title</Form.Label>
          <Form.Control type='text' placeholder='Enter Course Title' value={props.title} onChange={ e => props.setTitle(e.target.value)} />
        </Form.Group>
        <Form.Group className='mt-3'>
          <Form.Label>Desctiption</Form.Label>
          <Form.Control type='text' as='textarea' placeholder='Enter Course Description' value={props.description} onChange={ e => props.setDescription(e.target.value)} />
        </Form.Group>
        <Form.Group className='mt-3'>
          <Form.Label>Category</Form.Label>
          <Form.Control type='text' placeholder='Enter Course Category' value={props.category} onChange={ e => props.setCategory(e.target.value)} />
        </Form.Group>
        <Form.Group className='mt-3'>
          <Row>
            <Col>
              <Form.Select>
                <option value={true}>Paid</option>
                <option value={false}>Free</option>
              </Form.Select>
            </Col>
            <Col md={6}>
              <Form.Control type='text' placeholder='Enter Price' value={props.price} onChange={ e => props.setPrice(e.target.value)}/>
            </Col>                 
          </Row>
        </Form.Group>
        <Form.Group className='mt-3'>
          <Row>
              {props.preview && 
              <>
              <img src={props.preview} alt={props.UploadButtonText} className="justify-content-center"/>
              <Form.Label className='btn btn-outline-danger mt-3' onClick={props.handleImageRemove} >Remove Image</Form.Label>
              </>}
           
              <Form.Label className='btn btn-outline-success btn-block btn-block' >
                  {props.loading ? <Spin /> : props.UploadButtonText}
                <Form.Control type='file' accept='image/jpg' onChange={props.handleImage}  hidden/>
              </Form.Label>
          </Row>
        </Form.Group>
        <Button type='submit'>Save</Button>
      </Form>
    </FormContainer>
  )
}

export default CreateCourseForm