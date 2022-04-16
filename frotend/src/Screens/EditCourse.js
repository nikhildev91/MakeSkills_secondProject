import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, Col, Row, Button, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { toast, ToastContainer } from 'react-toastify'
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import storage from '../firebase'
import axios from 'axios'
import { List, Avatar, Badge, Tooltip } from 'antd'
import Item from "antd/lib/list/Item";
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import {courseUpdateAction} from '../Actions/CourseActions'
import { COURSE_UPDATE_RESET } from '../Constants/CourseConstants'
import { LESSON_UPDATE_RESET } from '../Constants/CourseConstants'
import EditLessonForm from '../Components/InstructorComponents/Modal/EditLessonForm'
import { updateLessonAction } from '../Actions/CourseActions'


const EditCourse = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { slug } = useParams()

    let courseId;

    const loadCourse = async () => {
      const config = {
          headers : {
              Authorization : `Bearer ${userInfo.token}`
          }
      }
      const { data } = await axios.get(`/api/instructors/course-view/${slug}`, config)
      setTitle(data.title)
      setDescription(data.description)
      setCategory(data.category)
      setPreview(data.image)
      setPaid(data.paid)
      setPrice(data.price)
      setImage(data.image)
      setLessons(data.lessons)
      courseId = data._id
  }

    const userLogin = useSelector( state => state.userLogin )
    const { userInfo } = userLogin

    const [ title, setTitle ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ paid, setPaid ] = useState('false')
    const [ price, setPrice ] = useState('')
    const [ image, setImage ] = useState({})
    const [ category, setCategory ] = useState('')
    const [ preview, setPreview ] = useState('')
    const [ UploadButtonText, setUploadButtonText ] = useState('Upload Image')


    // edit lesson
    const [ editForm, setEditForm ] = useState(false)
    const [ current, setCurrent ] = useState({})
    const [ uploading, setUploading ] = useState(false)
    const [ progress, setProgress ] = useState(0)
    const [ videoUploadButtonText, setVideoUploadButtonText ] = useState('Upload Content (only MP4 video)')

    const handleVideo = async (e) => {

        setUploading(true)
      // remove previous
      if( current && current.video) {
        const desertRef = ref(storage, current.video);
        deleteObject(desertRef).then(() => {
        setCurrent({ ...current, video : ''})
        

        // upload new video to firebase
        let file = e.target.files[0]
        let fileName = new Date().getTime() + file.name
        setVideoUploadButtonText("Uploading......")
    
        const storageRef = ref(
          storage, `/lessons/${fileName}`
        )
          
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const uploaded = Math.floor(
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
              setProgress(uploaded);
          },
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              setCurrent({...current, video : url})
              setVideoUploadButtonText(file.name)
              setUploading(false)
            })
          }
        )

        }).catch((error) => {
        console.log(error);
        });
      }
    }

    const handleLessonSubmit = (e) => {
      e.preventDefault()
      dispatch(updateLessonAction(current, slug ))
    }

    // rearrange lessons
    const [ lessons, setLessons ] = useState([])
    const [ reloadCourse, setReloadCourse ] = useState('')

    const handleDrag = (e, index) => {
      e.dataTransfer.setData('itemIndex', index)
    }

    const handleDrop =  async (e, index) => {
      const movingItemIndex = e.dataTransfer.getData('itemIndex');
      const targetItemIndex = index
      let allLesssons =  lessons;
      let movingItem = allLesssons[movingItemIndex] // clicked or draged item to re-order
      allLesssons.splice(movingItemIndex, 1) //remove i item form the given index
      allLesssons.splice(targetItemIndex, 0,  movingItem) // push item after target item index
      setLessons([...allLesssons])
      // save the new lessons order to database
      const config ={ 
        headers :{
            'Content-Type' : 'application/json',
            Authorization: `Bearer ${userInfo.token}`,
        }   
      }
      const { data } = await axios.put(`/api/instructors/update-course/${slug}`, { title, description, category, paid, price, image, lessons }, config)
      toast("Lessons Rearranged Successfully")
    }

    const handleDelete = (index) => {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async(result) => {
        if (result.isConfirmed) {
          let allLesssons = lessons
         let removed = allLesssons.splice(index, 1)
         setLessons(allLesssons)
         // send request to server
         setReloadCourse("2")
         const { data } = await axios.put(`/api/instructors/update-course/${slug}/${removed[0]._id}`)
         setReloadCourse("3")
        }
      })    
    }
    /************************************************/



    const courseUpdate = useSelector( state => state.courseUpdate )
    const {
            error : errorCreate,
            success : successCreate
          } = courseUpdate

    const lessonUpdate = useSelector( state => state.lessonUpdate )
    const {
            success : successUpdate
          } = lessonUpdate
 
    useEffect(() => {
      dispatch({ type : COURSE_UPDATE_RESET })
      dispatch({ type : LESSON_UPDATE_RESET})
        if( userInfo && !userInfo.isInstructor ){
            navigate('/login')
        }
        loadCourse()
        if(successCreate){
          navigate(`/instructor/course-view/${slug}`)
        }
        if(successUpdate){
          navigate(`/instructor/course-view/${slug}`)
        }
    }, [ dispatch, userInfo, successCreate, reloadCourse, successUpdate])

 

    const handleRemoveImage = () => {
      const desertRef = ref(storage, image);
      deleteObject(desertRef).then(() => {
      setPreview('')
      setImage('')
      setUploadButtonText("Upload Another Image")
      }).catch((error) => {
        console.log(error);
      });
    }
    
    const handleImage = (e) => {
        let file = e.target.files[0]
      setUploadButtonText(file.name)
      const fileName = new Date().getTime() + file.name
      const storageRef = ref(storage, `/thumbnails/${fileName}`)
      const uploadTask = uploadBytesResumable(storageRef, file)
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const uploaded = Math.floor(
            (snapshot.bytesTransferred / snapshot.totalBytes ) * 100
          )
          setProgress(uploaded)
        },
        (error)=> {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            setImage(url)
            setPreview(url)
            setUploadButtonText(file.name)
          })
        }
      )
    }

    const handleEditCourseSubmit = (e) => {
        e.preventDefault()
        dispatch(courseUpdateAction(title, description, category, paid, price, image, slug ))
    }
  return (
    <Row>
        <h1 className='text-center'>Edit Course</h1>
      <Col md={6}>
      <Container className='w-75'>
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
    </Container>
      </Col>
      <Col md={6}>
      <Container className='w-75 mt-3'>
      <Row className='pb-5'>
        <Col className='lesson-list'>
           <h4>{lessons.length} Lessons</h4>
             <List style={{size: "50px"}}
                  onDragOver ={ ( e ) => e.preventDefault()}
                  itemLayout='horizontal'
                  dataSource={lessons}
                  renderItem={(item, index) => (
                    <Item 
                     draggable 
                     onDragStart={ e => handleDrag(e, index)}
                     onDrop={ e => handleDrop(e, index)}
                     >
                      <Item.Meta
                        avatar={<Avatar>{index + 1}</Avatar>}
                        title={item.name}
                      ></Item.Meta>
                      <Tooltip title='Delete Lesson'>
                      <DeleteOutlined onClick={ () => handleDelete(index)} className="text-danger float-right"/>
                      </Tooltip>
                      <Tooltip title='Edit Lesson'>
                      <EditOutlined onClick={() => { setCurrent(item); setEditForm(true)}} className='ms-5'/>
                      </Tooltip>
                    </Item>
                  )}
                ></List>
        </Col>
      </Row>
      <EditLessonForm
        show = {editForm}
        onHide = { () => setEditForm(false) }
        videoUploadButtonText = { videoUploadButtonText }
        handleLessonSubmit = { handleLessonSubmit }
        current = { current }
        setCurrent = { setCurrent }
        handleVideo = { handleVideo }
        uploading = {uploading}
      />
      </Container>
      </Col>
    </Row>
    
  )
}

export default EditCourse