import React from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'
import FormContainer from './FormContainer'

const CreateCourseForm = (props) => {
  console.log(props.title);
  return (
    <FormContainer>
      <h1 className='text-center'>Create Course</h1>
      <Form onSubmit={props.handleSubmit}>
        <Form.Group className='mt-3'>
          <Form.Label>Title</Form.Label>
          <Form.Control type='text' placeholder='Enter Course Title' value={props.title} onChange={ e => props.setTitle(e.target.value)} />
        </Form.Group>
        <Form.Group className='mt-3'>
          <Form.Label>Desctiption</Form.Label>
          <Form.Control type='text' as='textarea' placeholder='Enter Course Description' />
        </Form.Group>
        <Form.Group className='mt-3'>
          <Form.Label>Category</Form.Label>
          <Form.Control type='text' placeholder='Enter Course Category' />
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
              <Form.Control type='text' placeholder='Enter Price'/>
            </Col>                 
          </Row>
        </Form.Group>
        <Form.Group className='mt-3'>
          <Row>
          <Col sm={12}>
              Image
            </Col>
              <Form.Label className='btn btn-outline-success btn-block'>
                Upload Image
                <Form.Control type='files' accept='image/jpg'  hidden/>
              </Form.Label>
          </Row>
        </Form.Group>
        <Button type='submit'>Save</Button>
      </Form>
    </FormContainer>
  )
}

export default CreateCourseForm