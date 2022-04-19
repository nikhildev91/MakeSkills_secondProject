import React from 'react'
import './CourseCard.css'
import { LinkContainer } from 'react-router-bootstrap'

const CourseCards = (props) => {
  return (     
    <div id="cards_landscape_wrap-2">
        <div class="container">
                <h1>Manage Courses</h1>
            <div class="row">
                    {
                        props.courses && props.courses.map( course => (
                            <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                                <LinkContainer to={`/instructor/course-view/${course.slug}`}>
                                    <a href="">
                                    <div class="card-flyer">
                                        <div class="text-box">
                                            <div class="image-box">
                                                <img src={course.image && course.image} alt={course.title} />
                                            </div>
                                            <div class="text-container">
                                                <h6>{course.title}</h6>
                                                <p>{course.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                    </a>
                                </LinkContainer>
                            
                            </div>
                        ))
                    }
            </div>
        </div>
    </div>
  )
}

export default CourseCards