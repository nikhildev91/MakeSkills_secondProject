import React from 'react'
import { useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'

const CourseListingCard = ({ courses }) => {
  return (
    <>
    {/* <pre>{JSON.stringify(courses, null, 4 )}</pre> */}
    {
      courses && courses.map(course => (
      <div className="col-md-6 col-sm-12 col-lg-3 d-flex justify-content-center">
        <LinkContainer to={`/course-details/${course.slug}`}>
        <div className="card shadow mb-5 bg-white rounded">
          <img className="card-img-top" src={course.image} alt={course.title} />
          <div className="card-body">
              <h5 className="mt-3 instructorNameCard"><i className="fa-solid fa-graduation-cap"></i>&nbsp;&nbsp;<b style={{ color : "rgb(120, 220, 178)"}}>{course.instructorId.fname + " " + course.instructorId.lname}</b></h5>
              <h3 className="card-title mt-3" style={{ fontWeight : "bold"}}>{course.title}</h3>
              <p className="card-text mt-4">{course.description}</p>
              <span className='proCardContent' style={{ fontWeight : "bold"}}><i className="fa-solid fa-align-justify"></i> {course.lessons && course.lessons.length} Lessons</span><span className='realPrice' style={{ float : "right"}}><s>{course.paid && "₹ " + course.price}</s></span> <br />
            <div className="mt-3">
                <span className='proCardContent' style={{ fontWeight : "bold"}}><i className="fa-solid fa-user-group"></i> {course.studentsCount} Students</span><span className='sellingPrice' style={{ float : "right"}}>₹ {course.paid ? course.price : "Free"}</span>
            </div>
          </div>
        </div>
        </LinkContainer>
      </div>
      ))
    }
    </>
  )
}

export default CourseListingCard