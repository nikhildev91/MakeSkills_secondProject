import React from 'react'
import { Tab, Row, Col, Nav } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Dashboard = () => {
  return (
    <main className='p-5'>
    <Tab.Container id="left-tabs-example" defaultActiveKey="dashboard">
            <Row>
                <Col sm={2}>
                <Nav variant="pills" className="flex-column">
                    <Nav.Item>
                        <LinkContainer to='/admin'>
                            <Nav.Link eventKey="dashboard">Dashboard</Nav.Link>
                        </LinkContainer>
                    </Nav.Item>
                    <Nav.Item>
                      <LinkContainer to='/admin/manage-courses'>
                    <Nav.Link eventKey="manageCourses">Manage Courses</Nav.Link>
                    </LinkContainer>
                    </Nav.Item>
                    <Nav.Item>
                      <LinkContainer to='/admin/manage-instructors'>
                    <Nav.Link eventKey="manageInstructors">Manage Instructors</Nav.Link>
                    </LinkContainer>
                    </Nav.Item>
                    <Nav.Item>
                      <LinkContainer to='/admin/manage-students'>
                    <Nav.Link eventKey="manageStudents">Manage Students</Nav.Link>
                    </LinkContainer>
                    </Nav.Item>
                    <Nav.Item>
                        <LinkContainer to='/admin/sales-report'>
                            <Nav.Link eventKey="salesReport">Sales Report</Nav.Link>
                        </LinkContainer>
                    </Nav.Item>
                </Nav>
                </Col>
                <Col sm={10}>
                <Tab.Content>
                    <Tab.Pane eventKey="dashboard">
                      Dashboard
                        {/* <CourseCards courses = { courses && courses } /> */}
                    </Tab.Pane>
                </Tab.Content>
                </Col>
            </Row>
    </Tab.Container>
</main>
  )
}

export default Dashboard