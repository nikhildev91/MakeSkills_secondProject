import React, { useEffect } from 'react'
import { Tab, Row, Col, Nav } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { publishedCoursesListAction } from '../Actions/CourseActions'

const PublishedCourses = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userLogin = useSelector( state => state.userLogin )
    const { userInfo } = userLogin

    const publishedCoursesList = useSelector( state => state.publishedCoursesList )
    const { courses } = publishedCoursesList
    useEffect(()=> {
        if(!userInfo || !userInfo.isInstructor){
            navigate('/')
        }
        dispatch(publishedCoursesListAction())
    }, [ userInfo ])
  return (
    <main className='p-5'>
            <Tab.Container id="left-tabs-example" defaultActiveKey="PublishedCourses">
                    <Row>
                        <Col sm={2}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <LinkContainer to='/instructor'>
                                    <Nav.Link eventKey="dashboard">Dashboard</Nav.Link>
                                </LinkContainer>
                            </Nav.Item>
                            <Nav.Item>
                                <LinkContainer to='/instructor/manage-courses'>
                            <Nav.Link eventKey="manageCourses">Manage Courses</Nav.Link>
                            </LinkContainer>
                            </Nav.Item>
                            <Nav.Item>
                            <Nav.Link eventKey="PublishedCourses">Published Courses</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        </Col>
                        <Col sm={10}>
                        <Tab.Content>
                            <Tab.Pane eventKey="PublishedCourses">
                                <div className="container-fluid">
                                    <h1>Published Courses</h1>
                                    <div className="row">
                                       
                                        {
                                        courses && courses.map( course => (
                                            <div className="col-md-4">
                                            <div className="card" style={{width: "18rem"}}>
                                        <img src={course.image} className="card-img-top" alt="..." />
                                        <div className="card-body">
                                            <h5 className="card-title">{course.title}</h5>
                                            <span className='btn btn-outline-info rounded-pill' style={{ height : '30px', fontSize : '10px'}}>{course.category}</span>
                                            <p className="card-text text-dark">Lessons : {course.lessons && course.lessons.length}</p>
                                            <p className="card-text text-dark">Enrolled Students : {course.studentsCount}</p>
                                            <p className="card-text text-dark">{course.description}</p>
                                            <a href="#" className="btn btn-primary">Go somewhere</a>
                                        </div>
                                    </div>
                                    </div>
                                        ))
                                    }
                                        </div>
                                    
                                    <pre>{JSON.stringify(courses, null, 4)}</pre>
                                </div>
                            </Tab.Pane>
                        </Tab.Content>
                        </Col>
                    </Row>
            </Tab.Container>
        </main>
  )
}

export default PublishedCourses