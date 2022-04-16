import React from 'react'
import { Button, Form, Modal, Row } from 'react-bootstrap'
import ReactPlayer from 'react-player'
import { Switch } from 'antd'

const EditLessonForm = ({
    onHide,
    show,
    current,
    setCurrent,
    handleLessonSubmit,
    videoUploadButtonText,
    handleVideo,
    uploading,

    setName,
    setContent
}) => {
  return (
    <Modal
    onHide={onHide}
    show = {show}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title id="contained-modal-title-vcenter">
        + Update Lesson
      </Modal.Title>
    </Modal.Header>
    <Modal.Body className='p-5'>
        {/* {JSON.stringify(current)} */}
            {
              !uploading && current.video && (
                  <Row className='d-flex justify-content-center'>
                      {/* <p onClick={deleteVideo} className="btn btn-outline-danger w-25 ms-/auto">Delete Video</p> */}
                      {/* <iframe className="embed-responsive-item" src={current.video.Location} width='100%' height="auto"></iframe> */}
                      <div className='d-flex justify-content-center'>
                            <ReactPlayer 
                                url={current.video}
                                width = "420px"
                                height= "240px"
                                controls
                            />
                      </div>
                  </Row>
              )
            }
      <Form onSubmit={handleLessonSubmit}>
        <Form.Group className='mt-2'>
            <Form.Label>Title</Form.Label>
            <Form.Control type='text' placeholder='Enter Title' value={current.name} onChange={ e => setCurrent( { ...current, name : e.target.value } ) }/>
        </Form.Group>
        <Form.Group className='mt-2'>
            <Form.Label>Description</Form.Label>
            <Form.Control type='text' placeholder='Content...' value={current.content} as='textarea' rows={7} cols={7} onChange={ e => setCurrent( { ...current, content : e.target.value } ) }/>
        </Form.Group>
        <Form.Group className='mt-2 d-flex justify-content-center'>
            <Form.Label className='btn btn-outline-success w-100'>
                    { videoUploadButtonText }
                <Form.Control type='file' accept='video/mp4' onChange={handleVideo} hidden/>
            </Form.Label>
        </Form.Group>
        <div className='d-flex justify-content-between'>
            <span className='pt-3 bold'>Preview</span>
            <Switch 
                className='float-right mt-2' 
                disabled = {uploading} 
                defaultChecked={current.free_preview}
                name = "free_preview"
                onChange={ v => setCurrent({...current, free_preview : v} )}
                />
        </div>
        <Button type='submit' className='mt-3'>Save</Button>
      </Form>
    </Modal.Body>
  </Modal>
  )
}

export default EditLessonForm