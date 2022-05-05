import React, { useEffect, useState, createElement } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Tab, Tabs } from 'react-bootstrap'
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
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertFromHTML, convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
const { Item } = Menu


const Course = () => {
  const [ clicked, setClicked ] = useState(0)
  const [ collapsed, setCollapsed ] = useState(false)
  const [played, setPlayed] = useState(0);
  const [ Listcompleted, setListCompleted ] = useState([])
  const [ certificateDownload, setCertificateDownload ] = useState(false)
  const [key, setKey] = useState('description');


  console.log("CompletedList: ", Listcompleted);
  // Text editor states and config

  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty()
  );
  const  [convertedContent, setConvertedContent] = useState(null);
  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  }
  const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  }
  
 
  const createMarkup = (html) => {
    return  {
      __html: DOMPurify.sanitize(html)
    }
  }

  ////////////////////////////////////////////////////

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
      console.log("notes: ", completedList && completedList.note && completedList.note[1].notes);
      dispatch(provideCertificateAction(course && course.courseDetails && course.courseDetails._id))
      if(completedList){
        // setConvertedContent(completedList)
      }
    }
  }, [ completedList, dispatch ])

  useEffect(() => {
    if( certificate && certificate.completed ){
      setCertificateDownload(true)
      
    }
  }, [ certificate, dispatch ])



  let newArry = Listcompleted.filter(
    (el) => el.lesson === course && course.courseDetails && course.courseDetails.lessons[clicked]._id
  )
  // clicked lesson id
  useEffect(() => {
    console.log("cliked");
    console.log("clicked :",course && course.courseDetails && course.courseDetails.lessons[clicked]._id);

    console.log(newArry);
  }, [clicked])
///////////////////////////////////////////////////////////////////////////



  const markCompleted = (lessonId, clicked) => {
    const courseId = course && course.courseDetails && course.courseDetails._id
    dispatch(markLessonCompleteAction( courseId, lessonId, convertedContent))
    setClicked(clicked+1)
    }

  const downloadCertificate = () => {
    navigate(`/course-certificate/${course && course.courseDetails && course.courseDetails.slug}`)
  }
  return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6">
          <h1>{course && course.courseDetails && course.courseDetails.title}</h1>
          </div>
          <div className="col-sm-6">
          { certificateDownload && (
                    <div className="btn btn-success" style={{ float : "right", margin : "10px"}} onClick={downloadCertificate}>Download Certificate</div>
                    )}
          </div>
          <div className="col-md-12 col-lg-9 d-flex align-items-center" style={{minHeight : "75vh", maxHeight : "75vh", backgroundColor : "black"}}>
          { course && course.courseDetails && course.courseDetails.lessons[clicked].video && (
                <ReactPlayer
                  url={course.courseDetails.lessons[clicked].video}
                  width ="100%"
                  height="98%"
                  controls
                  onStart={() => console.log("video start")}
                  onEnded={() => markCompleted(course.courseDetails.lessons[clicked]._id, clicked)}
                  onProgress={(progress) => {
                    setPlayed(progress.playedSeconds);
                  }}
                />
            )}
          </div>
          <div className="col-lg-3 p-2 pt-0">
            <div style={{ border : "black solid 1px", minHeight : "75vh", borderRadius : "5px"}} className='p-4'>
              <div className='btn btn-outline-dark w-100'>
                <span style={{ float : "left"}}>Lessons</span>
                <span style={{ float : "right"}}>X</span>
              </div>
              <Menu
                className='mt-2'
                 defaultSelectedKeys={{ clicked }}
              >
                { course && course.courseDetails && course.courseDetails.lessons && course.courseDetails.lessons.map( (lesson, index) => (
                  <Item onClick={() => setClicked(index)} key={index}> {Listcompleted && Listcompleted.lesson &&  Listcompleted.lesson.includes(lesson._id) ? 
                    (
                      <CheckSquareFilled className='float-right text-primary'
                      style={{ marginTop : "13px"}}/>
                    ) : (
                      <MinusSquareFilled className='float-right text-danger'
                      style={{ marginTop : "13px"}}/>
                    ) } &nbsp;&nbsp;&nbsp;{ lesson.name.substring(0, 30)}</Item>)) 
                }
              </Menu>
            </div>
          </div>

        </div>
        <div className='p-5 pt-0 border border-dark' style={{ minHeight : "50vh"}}>
        <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3 w-100"
    >
      <Tab eventKey="description" title="Description" className='p-2'>
        dsfasdf
      </Tab>
      <Tab eventKey="note" title="Prepare Note">
      <div className="">
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName="wrapper-class"
        editorClassName="editor-class"
        toolbarClassName="toolbar-class"
      />
      {/* <div className="preview" dangerouslySetInnerHTML={createMarkup(convertedContent)}></div> */}
      <pre>{convertedContent}</pre>
    </div>
      </Tab>
    </Tabs>
        </div>
       
        {/* <pre>{JSON.stringify(certificate, null, 4)}</pre> */}
        {/* <div className="row">
          <div className='col' style={{ maxWidth : "320px"}}>
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
        </div> */}
      </div>
  )
}

export default Course