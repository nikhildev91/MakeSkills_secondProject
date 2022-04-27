import React, { useEffect, useState, createElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col} from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Menu, Avatar } from 'antd'
import { 
  MenuFoldOutlined, 
  MenuUnfoldOutlined,
  CheckSquareFilled,
  MinusSquareFilled
} from '@ant-design/icons'
import ReactPlayer from 'react-player'
import { 
  listCourseCompleteAction, 
  markLessonCompleteAction, 
  provideCertificateAction, 
  startCourseAction 
} from '../../Actions/StudentActions/CourseActions'
const { Item } = Menu


const Course = () => {
  const [ clicked, setClicked ] = useState(0)
  const [ collapsed, setCollapsed ] = useState(false)
  const [played, setPlayed] = useState(0);
  const [ Listcompleted, setListCompleted ] = useState([])
  const [ certificateDownload, setCertificateDownload ] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { slug } = useParams()
  
  const userLogin = useSelector( state => state.userLogin )
  const { userInfo } = userLogin

  const startCourse = useSelector( state => state.startCourse )
  const { course } = startCourse

  const listCompleted = useSelector( state => state.listCompleted )
  const { completedList } = listCompleted

  const provideCertificate = useSelector( state => state.provideCertificate)
  const { certificate } = provideCertificate

  // if(completedList){
  //       console.log("setConmplews");
  //       setListCompleted(completedList)
  //     }

  useEffect(() => {
    if(!userInfo){
      navigate('/login')
    }
    dispatch(startCourseAction(slug))
    
  }, [ userInfo, dispatch ])

  useEffect(()=>{
    if(course){
      dispatch(listCourseCompleteAction(course.courseDetails && course.courseDetails._id))
    }
  }, [ course ])

  useEffect(()=>{
    if(completedList){
      setListCompleted(completedList)
      dispatch(provideCertificateAction(course && course.courseDetails && course.courseDetails._id))
      
    }
  }, [ completedList, dispatch ])

  useEffect(() => {
    if( certificate && certificate.completed ){
      setCertificateDownload(true)
      
    }
  }, [ certificate, dispatch ])

  

  const markCompleted = (lessonId, clicked) => {
    const courseId = course && course.courseDetails && course.courseDetails._id
    dispatch(markLessonCompleteAction( courseId, lessonId ))
    setClicked(clicked+1)
  }

  const downloadCertificate = () => {
    navigate(`/course-certificate/${course && course.courseDetails && course.courseDetails.slug}`)
  }
  return (
      <div className="container-fluid">
       
        {/* <pre>{JSON.stringify(certificate, null, 4)}</pre> */}
        <div className="row">
          <div style={{ maxWidth : "320px"}}>
            <div className=''>
            <Button 
            onClick={() => setCollapsed(!collapsed)}
            style={{ maxWidth : "320px"}}
            className='text-primary mt-1 btn-block mb-2'>
              { createElement ( collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
              {!collapsed && "Lessons"}
            </Button>
            </div>
            <Menu
              defaultSelectedKeys={{ clicked }}
              inlineCollapsed={collapsed}
              style={{ height: '80vh', overflow: 'scroll'}}
            >
              { course && course.courseDetails && course.courseDetails.lessons && course.courseDetails.lessons.map( (lesson, index) => (
                  <Item onClick={() => setClicked(index)} key={index} icon={ <Avatar>{index + 1 }</Avatar>}>&nbsp;&nbsp;&nbsp;{ lesson.name.substring(0, 30)} { Listcompleted.includes(lesson._id) ? 
                    (
                      <CheckSquareFilled className='float-right text-primary ms-auto'
                      style={{ marginTop : "13px"}}/>
                    ) : (
                      <MinusSquareFilled className='float-right text-danger ms-2'
                      style={{ marginTop : "13px"}}/>
                    ) }</Item>
              )) }
            </Menu>
          </div>

          <div className="col">
            {/* {JSON.stringify(played.toFixed())} */}
            <>
                { course && course.courseDetails && course.courseDetails.lessons && (
                  <div>
                    <span className='text-light h1'>{course.courseDetails.lessons[clicked].name}</span>
                    { certificateDownload && (
                    <div className="btn btn-success" style={{ float : "right", margin : "10px"}} onClick={downloadCertificate}>Download Certificate</div>
                    )}
                  </div>
                )}
            </>
            { course && course.courseDetails && course.courseDetails.lessons[clicked].video && (
              <>
              <div className='wrapper p-3'>
                <ReactPlayer
                  className='player'
                  url={course.courseDetails.lessons[clicked].video}
                  width="100%"
                  height="40%"
                  controls
                  onStart={() => console.log("video start")}
                  onEnded={() => markCompleted(course.courseDetails.lessons[clicked]._id, clicked)}
                  onProgress={(progress) => {
                    setPlayed(progress.playedSeconds);
                  }}
                />
              </div>
                </>
            )}
            {
              course && course.courseDetails && (
                <p>{course.courseDetails.description} "id" : {course.courseDetails.lessons[clicked]._id}</p>
              )
            }
          </div>
        </div>
      </div>
  )
}

export default Course