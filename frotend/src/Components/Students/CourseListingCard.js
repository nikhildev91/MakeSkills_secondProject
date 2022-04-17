import React from 'react'
import './CourseListCard.css'
import { LinkContainer } from 'react-router-bootstrap'

const CourseListingCard = (props) => {
  return (
          <>
                {
                        props.courses && props.courses.map( course => (
                                <div className="card p-0 m-1"style={{ width: "18rem"}}>
                                  <LinkContainer to={`/${course.slug}`}>
                                <img className="card-img-top" src={course.image} alt="Card image cap" />
                                </LinkContainer>
                                <div className="card-body">
                                  <h5 className="card-title">{course.title}</h5>
                                  <p className="card-text">{course.description}</p>
                                  <LinkContainer to={`/${course.slug}`}>
                                  <a href="#" className="btn btn-primary">Learn More</a>
                                  </LinkContainer>
                                </div>
                              </div>
                                ))
                }
         
          </>
        
  )
}

export default CourseListingCard