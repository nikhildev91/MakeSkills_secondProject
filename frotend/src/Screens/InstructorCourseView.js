import React, { useEffect, useState } from 'react'
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import storage from '../firebase'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { List, Avatar } from 'antd'
import Item from "antd/lib/list/Item";
import { Container, Row, Col, Button } from 'react-bootstrap'
import { courseViewAction, createLessonAction } from '../Actions/CourseActions'
import AddLessonForm from '../Components/InstructorComponents/Modal/AddLessonForm'
import { LESSON_CREATE_RESET } from '../Constants/CourseConstants'

const InstructorCourseView = () => {
    const { slug } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // Add Lesson Form
    const [ showForm, setShowForm ] = useState(false)
    const [ name, setName ] = useState('')
    const [ content, setContent ] = useState('')
    const [ video, setVideo ] = useState('')
    const [ preview, setPreview ] = useState('')
    const [ uploadButtonText, setUploadButtonText ] = useState('Upload Content (only MP4 videos)')
    const [ progress, setProgress ] = useState('')

    // handleVideo
    const handleVideo = async (e) => {
        const file = e.target.files[0]
        const fileName = new Date().getTime() + file.name
        const storageRef = ref( storage, `/lessons/${fileName}` )
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const uploaded = Math.floor(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                )
                setProgress(uploaded)
            },
            (error) => {
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    setVideo(url)
                    setPreview(url)
                    setUploadButtonText(file.name)
                })
            }
        )
    }

    // delete video
    const deleteVideo = async () => {
        const desertRef = ref(storage, video);
        deleteObject(desertRef).then(() => {
        setPreview('')
        setVideo('')
        setUploadButtonText("Upload Another Video")
        }).catch((error) => {
        console.log(error);
        });
    }

    // handle Form submit
    const handleSubmit = (e) => {
        e.preventDefault()
        if(video){
            dispatch(createLessonAction(name, content, video, slug ))
        }
    }

    /***********************************************/

    const userLogin = useSelector( state => state.userLogin )
    const { userInfo } = userLogin

    const courseViewDetails = useSelector( state => state.courseViewDetails )
    const { courseDetails } = courseViewDetails

    const lessonCreate = useSelector( state => state.lessonCreate )
    const {
        success : successCreate
    } = lessonCreate

    useEffect(() => {
        dispatch({
            type : LESSON_CREATE_RESET
        })
        if(userInfo && !userInfo.isInstructor ){
            navigate('/login')
        }
        dispatch(courseViewAction(slug))
            console.log(successCreate);
        if(successCreate) {
            setShowForm(false)
            setPreview('')
            setVideo({})
            setName('')
            setContent('')
            setUploadButtonText('Upload Content (only MP4 videos)')
            navigate(`/instructor/course-view/${slug}`)
        }
    }, [ userInfo, dispatch, successCreate ])

    const handleEdit = () => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          })
          
          swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You go to edit course!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, edit it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                navigate(`/instructor/edit-course/${slug}`)
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
              )
            }
          })
       
    }

  return (
    <Container>
        <Row>
            <Col sm={12}>
                <div className="courseTitleBox mt-3 card" style={{ backgroundColor : "black"}}>
                    <Row className='p-5'>
                        <Col md={6} style={{ color : "white"}}>
                            <h2 className='mt-3' style={{ color : "white"}}>{courseDetails && courseDetails.title}</h2>
                            <h4 className='mt-3' style={{ color : "white"}}>{courseDetails && courseDetails.category}</h4>
                            <p className='mt-3' style={{ color : "white"}}>{courseDetails && courseDetails.lessons && courseDetails.lessons.length} Lessons</p>
                            <h1 className='mt-3' style={{ color : "white"}}>₹ {courseDetails && courseDetails.price}</h1>
                        </Col>
                        <Col md={6} style={{ color : "white"}} >
                            <img src={courseDetails && courseDetails.image } alt={courseDetails && courseDetails.title} className="w-100 d-flex justify-content-center"/>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
            
        <hr />
        <Row>
            <Col md={8}>
                <h4>Description</h4>
                <p>{courseDetails && courseDetails.description}</p>
            </Col>
            <Col md={4}>
                <Row>
                    <Col md={6}><i className="fa-solid fa-pen-to-square" style={{ fontSize : "30px"}} onClick={ handleEdit }></i></Col>
                    <Col md={6}><i className="fa-solid fa-check" style={{ fontSize : "30px"}}></i></Col>
                </Row>
                <Button className='w-100 rounded-pill mt-3' onClick={() => setShowForm(true)}><i className="fa-solid fa-plus" ></i>&nbsp; Add Lesson</Button>
            </Col>
        </Row>
        <AddLessonForm
            show ={showForm}
            onHide = {() => setShowForm(false)}
            name = {name}
            setName = {setName}
            content = {content}
            setContent = {setContent}
            preview = {preview}
            handleSubmit = {handleSubmit}
            handleVideo = {handleVideo}
            uploadButtonText = {uploadButtonText}
            deleteVideo = {deleteVideo}
        />
        <Row className='pb-5'>
        <Col className='lesson-list'>
          <h4>{courseDetails && courseDetails.lessons && courseDetails.lessons.length } Lessons</h4>
          <List 
                  itemLayout='horizontal'
                  dataSource={courseDetails && courseDetails.lessons}
                  renderItem={(item, index) => (
                    <Item>
                      <Item.Meta avatar={<Avatar>{index + 1}</Avatar>} title={item.name} ></Item.Meta>
                    </Item>
                  )}
                ></List>
        </Col>
      </Row>
    </Container>
  )
}

export default InstructorCourseView