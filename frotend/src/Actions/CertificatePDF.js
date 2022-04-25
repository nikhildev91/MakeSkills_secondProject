import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { jsPDF } from 'jspdf'
import { provideCertificateAction, studentCourseViewAction } from './StudentActions/CourseActions'

const CertificatePDF = () => {
  const { slug } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const userLogin = useSelector( state => state.userLogin )
  const { userInfo } = userLogin

  const studentCourseView = useSelector( state => state.studentCourseView )
  const { courseView } = studentCourseView

  const provideCertificate = useSelector( state => state.provideCertificate)
  const { certificate } = provideCertificate

  useEffect(()=>{
    if(!userInfo){
      navigate('/')
    }
    dispatch(studentCourseViewAction( slug ))
    if(courseView){
      dispatch(provideCertificateAction(courseView.courseDetails && courseView.courseDetails._id))
    }
    if(certificate && !certificate.completed){
      navigate('/')
    }
  }, [ userInfo ])

  // useEffect(() => {
   
  // }, [ ])

  const pdfDownload = e => {
    e.preventDefault()
    let doc = new jsPDF("landscape", 'pt', 'A4');
    doc.html(document.getElementById('pdf-view'), {
      callback: () => {
        doc.save('test.pdf');
      }
    });
}
  return (
    <div className='container mt-5'>
      <div className="row">
      <div className="col-sm-6">
        <h1>MakeSkills Certificate</h1>
      </div>
      <div className="col-sm-6">
      <span className='btn btn-success' style={{ float : "right", padding : "10px"}} onClick={pdfDownload}>Download Certificate</span>
      </div>
      </div>
        <div id="pdf-view" className='p-5 row' style={{ backgroundColor : "white", minHeight : "80vh"}}>
          <div style={{ border : "solid 2px black", width : "770px", padding : "10px"}} className="col-sm-9">
          <h1 className='text-center' style={{color: '#33959a', marginTop : "20px"}}><b>Certificate of Completion</b></h1>
          <div className="mt-5">
            <p className='text-center' style={{color: 'black', fontSize : "20px"}}>This is to certify that <b> {userInfo.fname + " " + userInfo.lname}</b> successfully </p>
            <p className='text-center' style={{color: 'black', fontSize : "20px"}}>completed <b>{courseView && courseView.courseDetails && courseView.courseDetails.title} </b></p>
            <p className='text-center' style={{color: 'black', fontSize : "20px"}}>online Course from <b>MakeSkills</b></p>
          </div>
           <div className='mt-5 p-5'>
            <span style={{color: '#33959a'}}><u>Instructor : &nbsp; {courseView && courseView.author && courseView.author.fname + " " + courseView.author.lname}</u></span>
            <span style={{color: '#33959a', marginTop : "20px", float : "right"}}><b>MakeSkills</b></span>
           </div>
          </div>
          <div className="col-sm-3 d-flex align-items-center">
            <img src="/congra.png" alt="Congratulations" style={{ maxWidth : "30em"}}/>
          </div>
        </div>
        {/* <pre>{JSON.stringify(courseView, null, 4)}</pre> */}
      </div>
  )
}

export default CertificatePDF