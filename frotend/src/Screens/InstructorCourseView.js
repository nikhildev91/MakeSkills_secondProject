import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { courseViewAction } from '../Actions/CourseActions'
import AddLessonForm from '../Components/InstructorComponents/Modal/AddLessonForm'

const InstructorCourseView = () => {
    const { slug } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // Add Lesson Form
    const [ showForm, setShowForm ] = useState(false)
    const [ name, setName ] = useState('')
    const [ content, setContent ] = useState('')
    const [ video, setVideo ] = useState({})
    const [ preview, setPreview ] = useState('')
    const [ uploadButtonText, setUploadButtonText ] = useState('Upload Content (only MP4 videos)')
    const [ progress, setProgress ] = useState('')

    // handleVideo
    const handleVideo = async (e) => {
        try{
            const file = e.target.files[0]
            
            // send video to backend using form data
            // save progress bar
            setUploadButtonText("Uploading.....")
            const videoData = new FormData()
            videoData.append('video', file)
            const { data } = await axios.post('/api/instructors/upload-video', videoData, {
                onUploadProgress:(e) => {
                    setProgress(Math.round((100 * e.loaded)/ e.total))
                }
            })

            // once response in recevied
            console.log(data);
            setVideo(data)
            setPreview(data.Location)
            setUploadButtonText(file.name)
            
        } catch(error){
            console.log(error);
            console.log("Video upload failed");
          
        }
    }

    // delete video
    const deleteVideo = async () => {
        try{
            await axios.post('/api/instructors/remove-video', video);
            setProgress(0)
            setVideo({})
            console.log(video);
            setUploadButtonText('Upload another video')
          } catch ( error ) {
            console.log(error);
          }
    }

    // handle Form submit
    const handleSubmit = (e) => {
        e.preventDefault()
    }

    /***********************************************/

    const userLogin = useSelector( state => state.userLogin )
    const { userInfo } = userLogin

    const courseViewDetails = useSelector( state => state.courseViewDetails )
    const { courseDetails } = courseViewDetails

    useEffect(() => {
        if(userInfo && !userInfo.isInstructor ){
            navigate('/login')
        }
        dispatch(courseViewAction(slug))
    }, [ userInfo, dispatch ])

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
            //   swalWithBootstrapButtons.fire(
            //     'Deleted!',
            //     'Your file has been deleted.',
            //     'success'
            //   )
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
                            <img src={courseDetails && courseDetails.image && courseDetails.image.Location } alt={courseDetails && courseDetails.title} className="w-100 d-flex justify-content-center"/>
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
    </Container>
  )
}

export default InstructorCourseView