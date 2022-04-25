import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Tab, Row, Col, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const InstructorDashboard = () => {
  const navigate = useNavigate()

  const userLogin = useSelector( state => state.userLogin )
  const { userInfo } = userLogin

  useEffect(() => {
    if(!userInfo || !userInfo.isInstructor ){
      navigate('/')
    }
  },[ userInfo ])
  return (
    <main className='p-5'>
    <Tab.Container id="left-tabs-example" defaultActiveKey="dashboard">
            <Row>
                <Col sm={2}>
                <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                    <Nav.Link eventKey="dashboard">Dashboard</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <LinkContainer to='/instructor/manage-courses'>
                    <Nav.Link eventKey="manageCourses">Manage Courses</Nav.Link>
                    </LinkContainer>
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
                    <Tab.Pane eventKey="dashboard">
                            dash board
                    </Tab.Pane>
                </Tab.Content>
                </Col>
            </Row>
    </Tab.Container>
</main>
  )
}

export default InstructorDashboard