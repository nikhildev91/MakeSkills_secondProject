import React from 'react'
import { Tab, Row, Col, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const PublishedCourses = () => {
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
                            puclsisdfnasd
                            </Tab.Pane>
                        </Tab.Content>
                        </Col>
                    </Row>
            </Tab.Container>
        </main>
  )
}

export default PublishedCourses