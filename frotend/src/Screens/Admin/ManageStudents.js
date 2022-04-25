import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Table, Nav, Col, Row, Tab } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { loadAllStudents } from '../../Actions/AdminActions'

const ManageStudents = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userLogin = useSelector( state => state.userLogin )
    const { userInfo } = userLogin

    const studentsLists = useSelector( state => state.studentsLists )
    const { studentsList } = studentsLists

    useEffect(() => {
        if(!userInfo || !userInfo.isAdmin){
            navigate('/')
        }
        dispatch(loadAllStudents())
    }, [ userInfo ])
  return (
    <main className='p-5'>
      <pre>{JSON.stringify(studentsList, null, 4)}</pre>
    <Tab.Container id="left-tabs-example" defaultActiveKey="manageStudents">
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
                    <Tab.Pane eventKey="manageStudents">
                    <div className='container-fluid border p-4' style={{ minHeight : "80vh"}}>
                      <h1 className='text-dark'>Manage Students</h1>
                      <Table striped bordered hover responsive className='table-sm' >
                        <thead>
                          <tr>
                            <th className='text-center'>Name</th>
                            <th className='text-center'>Email</th>
                            <th className='text-center'>Status</th>
                            <th className='text-center'>Action</th>
                          </tr>
                          </thead>
                          {/* <tbody>
                            {
                              instructorsList && instructorsList.map( instructor => (
                            <tr>
                              <td>{instructor.fname + " " + instructor.lname}</td>
                              <td>{instructor.email}</td>
                              <td>{instructor.fname}</td>
                              <td>{instructor.fname}</td>
                            </tr>
                              ))
                            }
                          </tbody> */}
                      </Table>
                    </div>
                    </Tab.Pane>
                </Tab.Content>
                </Col>
            </Row>
    </Tab.Container>
</main>
  )
}

export default ManageStudents