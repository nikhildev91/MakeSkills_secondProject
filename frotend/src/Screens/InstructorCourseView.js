import React, { useEffect, useState } from 'react'
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import storage from '../firebase'
import { toast, ToastContainer } from 'react-toastify'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { List, Avatar } from 'antd'
import Item from "antd/lib/list/Item";
import { Container, Row, Col, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { courseViewAction, createLessonAction, publishCourseAction, unpublishCourseAction } from '../Actions/CourseActions'
import AddLessonForm from '../Components/InstructorComponents/Modal/AddLessonForm'
import { LESSON_CREATE_RESET, PUBLISH_COURSE_RESET, UNPUBLISH_COURSE_RESET } from '../Constants/CourseConstants'

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

    const publishCourse = useSelector( state => state.publishCourse )
    const { published } = publishCourse

    const unpublishCourse = useSelector( state => state.unpublishCourse )
    const { unpublished } = unpublishCourse

    useEffect(() => {
        dispatch({
            type : LESSON_CREATE_RESET
        })
        dispatch({
            type : PUBLISH_COURSE_RESET
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

        if(published){
            toast("Your Course Now on Live")
        }
            
        
    }, [ userInfo, dispatch, successCreate, published ])

    useEffect(()=>{

        dispatch({
            type : UNPUBLISH_COURSE_RESET
        })
        if(unpublished){
            dispatch(courseViewAction(slug))
            toast("Your Course is Successfully Unpublished")
        }
    }, [unpublished])

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

    const handlePublish = (e, courseId) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          })
          
          swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You go to publish course!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, publish it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(publishCourseAction(courseId))
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

    const handleUnpublish = ( e, courseId ) => {
        dispatch(unpublishCourseAction(courseId))
    }

  return (
    <Container>
        <ToastContainer />
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
                <h4 style={{ color : "white "}}>Description</h4>
                <p>{courseDetails && courseDetails.description}</p>
            </Col>
            <Col md={4}>
                <Row>
                    <Col md={6}><i className="fa-solid fa-pen-to-square" style={{ fontSize : "30px"}} onClick={ handleEdit }></i></Col>
                    <Col md={6}>
                        {   
                            courseDetails && courseDetails.lessons && courseDetails.lessons.length <= 5 ? 
                                <OverlayTrigger overlay={
                                    <Tooltip>Have Minimum 5 Lessons to Publish</Tooltip>
                                }>
                                    <i className="fa-solid fa-circle-exclamation" style={{ fontSize : "30px", color : "yellow" }}></i>
                                </OverlayTrigger> 
                            : courseDetails && courseDetails.published === true ? <i onClick={ (e) => handleUnpublish(e, courseDetails._id)} className ="fa-solid fa-xmark" style={{ fontSize : "30px", color : "red" }}></i> : 
                                <OverlayTrigger overlay={
                                    <Tooltip>Publish</Tooltip>
                                }> 
                                <i onClick={ (e) => handlePublish(e, courseDetails._id)} className="fa-solid fa-check" style={{ fontSize : "30px", color : "green" }}></i>
                                </OverlayTrigger>
                        }
                        
                    </Col>
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
          <h4 style={{ color : "white "}}>{courseDetails && courseDetails.lessons && courseDetails.lessons.length } Lessons</h4>
          <List     color='white'
                  itemLayout='horizontal'
                  dataSource={courseDetails && courseDetails.lessons}
                  renderItem={(item, index) => (
                    <Item>
                      <Item.Meta className='Lessons_List' avatar={<Avatar>{index + 1}</Avatar>} title={item.name} ></Item.Meta>
                    </Item>
                  )}
                ></List>
        </Col>
      </Row>
    </Container>
  )
}

export default InstructorCourseView