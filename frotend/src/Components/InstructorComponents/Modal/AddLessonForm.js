import React from 'react'
import { Button, Form, Modal, Row } from 'react-bootstrap'
import ReactPlayer from 'react-player'

const AddLessonForm = (props) => {
  return (
    <Modal
    {...props}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        + Add Lesson
      </Modal.Title>
    </Modal.Header>
    <Modal.Body className='p-5'>
            {
              props.preview && (
                  <Row className='d-flex justify-content-center'>
                      <p onClick={props.deleteVideo} className="btn btn-outline-danger w-25 ms-auto">Delete Video</p>
                      {/* <iframe className="embed-responsive-item" src={props.preview} width='100%' height="auto"></iframe> */}
                      <div className='d-flex justify-content-center'>
                            <ReactPlayer 
                                url={props.preview}
                                width = "420px"
                                height= "240px"
                                controls
                            />
                      </div>
                  </Row>
              )
            }
      <Form onSubmit={props.handleSubmit}>
        <Form.Group className='mt-2'>
            <Form.Label>Title</Form.Label>
            <Form.Control type='text' placeholder='Enter Title' value={props.name} onChange={ e => props.setName(e.target.value)} />
        </Form.Group>
        <Form.Group className='mt-2'>
            <Form.Label>Description</Form.Label>
            <Form.Control type='text' placeholder='Content...' value={props.content} as='textarea' rows={7} cols={7} onChange={ e => props.setContent(e.target.value)} />
        </Form.Group>
        <Form.Group className='mt-2 d-flex justify-content-center'>
            <Form.Label className='btn btn-outline-success w-100'>
                    { props.uploadButtonText }
                <Form.Control type='file' accept='video/mp4' onChange={props.handleVideo} hidden/>
            </Form.Label>
        </Form.Group>
        <Button type='submit'>Save</Button>
      </Form>
    </Modal.Body>
  </Modal>
  )
}

export default AddLessonForm