import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, Col, Row, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../Components/FormContainer'
import { toast, ToastContainer } from 'react-toastify'
import Resizer from 'react-image-file-resizer'
import axios from 'axios'
import {courseUpdateAction} from '../Actions/CourseActions'
import { COURSE_UPDATE_RESET } from '../Constants/CourseConstants'

const EditCourse = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { slug } = useParams()

    const [ title, setTitle ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ paid, setPaid ] = useState('false')
    const [ price, setPrice ] = useState('')
    const [ image, setImage ] = useState({})
    const [ category, setCategory ] = useState('')
    const [ preview, setPreview ] = useState('')
    const [ UploadButtonText, setUploadButtonText ] = useState('Upload Image')

    const userLogin = useSelector( state => state.userLogin )
    const { userInfo } = userLogin

    const courseUpdate = useSelector( state => state.courseUpdate )
    const {
            error : errorCreate,
            success : successCreate
          } = courseUpdate
 
    useEffect(() => {
      dispatch({ type : COURSE_UPDATE_RESET })
        if( userInfo && !userInfo.isInstructor ){
            navigate('/login')
        }
        loadCourse()
        if(successCreate){
          navigate(`/instructor/course-view/${slug}`)
        }
    }, [ dispatch, userInfo, successCreate ])

    const loadCourse = async () => {
        const config = {
            headers : {
                Authorization : `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/instructors/course-view/${slug}`, config)
        console.log(data);
        setTitle(data.title)
        setDescription(data.description)
        setCategory(data.category)
        setPreview(data.image && data.image.Location)
        setPaid(data.paid)
        setPrice(data.price)
        setImage(data.image)
    }

    const handleRemoveImage = async () => {
        try{
            await axios.post('/api/instructors/course/remove-image', { image })
            setImage({})
            setPreview('')
            toast("Image Deleted!")
          } catch (error) {
            console.log(error);
            setUploadButtonText("Upload Thumbnail")
            toast("Image Delete Failed. Try Again!....")
          }
    }
    
    const handleImage = (e) => {
        let file = e.target.files[0]
    setUploadButtonText(file.name)
    Resizer.imageFileResizer(file, 720, 500, 'JPEG', 100, 0, async (uri) => {
      try{
        const { data } = await axios.post('/api/instructors/course/upload-image', {
          image : uri
        })
        toast("Successfully Thumnail Uploaded....")
        setPreview(data.Location)
        setImage(data)

      } catch (error) {
          console.log(error);
          setUploadButtonText("Upload Thumbnail")
          toast("Image Upload failed!...")
      }
    })
    }

    const handleEditCourseSubmit = (e) => {
        e.preventDefault()
        dispatch(courseUpdateAction(title, description, category, paid, price, image, slug ))
    }
  return (
    <FormContainer>
        <h1 className='text-center'>Edit Course</h1>
        <ToastContainer />
         <Form onSubmit={handleEditCourseSubmit}>
        <Form.Group className='mt-3'>
          <Form.Label>Title</Form.Label>
          <Form.Control type='text' placeholder='Enter Course Title' value={title} onChange={ e => setTitle(e.target.value)} />
        </Form.Group>
        <Form.Group className='mt-3'>
          <Form.Label>Desctiption</Form.Label>
          <Form.Control type='text' as='textarea' placeholder='Enter Course Description' value={description} onChange={ e => setDescription(e.target.value)} />
        </Form.Group>
        <Form.Group className='mt-3'>
          <Form.Label>Category</Form.Label>
          <Form.Control type='text' placeholder='Enter Course Category' value={category} onChange={ e => setCategory(e.target.value)} />
        </Form.Group>
        <Form.Group className='mt-3'>
          <Row>
            <Col>
              <Form.Select value={paid} onChange= { e => setPaid(e.target.value)}>
                <option value={true}>Paid</option>
                <option value={false}>Free</option>
              </Form.Select>
            </Col>
            {
              paid === "true" && 
              <Col md={6}>
                <Form.Control type='text' placeholder='Enter Price' value={price} onChange={ e => setPrice(e.target.value)}/>
              </Col>
            }
                             
          </Row>
        </Form.Group>
        <Form.Group className='mt-3'>
          <Row>
              {preview && 
              <>
              <img src={preview} alt={UploadButtonText} className="justify-content-center"/>
              <Form.Label className='btn btn-outline-danger mt-3' onClick={handleRemoveImage} >Remove Image</Form.Label>
              </>}
           
              <Form.Label className='btn btn-outline-success btn-block btn-block' >
                  {UploadButtonText}
                <Form.Control type='file' accept='image/jpg' onChange={handleImage}  hidden/>
              </Form.Label>
          </Row>
        </Form.Group>
        <Button type='submit'>Save</Button>
      </Form>
    </FormContainer>
  )
}

export default EditCourse