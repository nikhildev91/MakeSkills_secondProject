import React, { useEffect } from 'react'
import { Tab, Row, Col, Nav, } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { courseListAction } from '../Actions/CourseActions'
import CourseCards from '../Components/InstructorComponents/CourseCards'

const ManageCourses = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userLogin = useSelector( state => state.userLogin )
    const { userInfo } = userLogin
    const courseList = useSelector( state => state.courseList )
    const { courses } = courseList

    useEffect(() => {
        if(!userInfo.isInstructor){
            navigate('/login')
        }
        dispatch(courseListAction())
    }, [ userInfo, dispatch ])


  return (
        <main className='p-5'>
            <Tab.Container id="left-tabs-example" defaultActiveKey="manageCourses">
                    <Row>
                        <Col sm={2}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <LinkContainer to='/instructor'>
                                    <Nav.Link eventKey="dashboard">Dashboard</Nav.Link>
                                </LinkContainer>
                            </Nav.Item>
                            <Nav.Item>
                            <Nav.Link eventKey="manageCourses">Manage Courses</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <LinkContainer to='/instructor/published-courses'>
                                    <Nav.Link eventKey="PublishedCourses">Published Courses</Nav.Link>
                                </LinkContainer>
                            </Nav.Item>
                        </Nav>
                        </Col>
                        <Col sm={10}>
                        <Tab.Content>
                            <Tab.Pane eventKey="manageCourses">
                                <CourseCards courses = { courses && courses } />
                            </Tab.Pane>
                        </Tab.Content>
                        </Col>
                    </Row>
            </Tab.Container>
        </main>
  )
}

export default ManageCourses