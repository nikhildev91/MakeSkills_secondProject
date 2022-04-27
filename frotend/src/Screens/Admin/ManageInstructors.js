import React, { useEffect } from 'react'
import { Table, Nav, Col, Row, Tab } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { blockInstructorAction, loadAllInstructors, unBlockInstructorAction } from '../../Actions/AdminActions'


const ManageInstructors = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    

    const userLogin = useSelector( state => state.userLogin )
    const { userInfo } = userLogin

    const listInstructors = useSelector( state => state.listInstructors )
    const { instructorsList } = listInstructors

    useEffect(() => {
        if(!userInfo || !userInfo.isAdmin ){
            navigate('/')
        }
        dispatch(loadAllInstructors())
    },[ dispatch, userInfo ])

    const unBlockInstructor = (userId) => {
      dispatch(unBlockInstructorAction(userId))
    }

    const blockInstructor = (userId) => {
      dispatch(blockInstructorAction(userId))
    }
  return (
    <main className='p-5'>
      {/* <pre>{JSON.stringify(instructorsList, null, 4)}</pre> */}
    <Tab.Container id="left-tabs-example" defaultActiveKey="manageInstructors">
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
                    <Tab.Pane eventKey="manageInstructors">
                    <div className='container-fluid border p-4' style={{ minHeight : "80vh"}}>
                      <h1 className='text-dark'>Manage Instructors</h1>
                      <Table striped bordered hover responsive className='table-sm' >
                        <thead>
                          <tr>
                            <th className='text-center'>Name</th>
                            <th className='text-center'>Email</th>
                            <th className='text-center'>Status</th>
                            <th className='text-center'>Action</th>
                          </tr>
                          </thead>
                          <tbody>
                            {
                              instructorsList && instructorsList.map( instructor => (
                            <tr key={instructor._id}>
                              <td className='p-3'>{instructor.fname + " " + instructor.lname}</td>
                              <td className='p-3'>{instructor.email}</td>
                              <td className='p-3'>{instructor.isBlock ? "Blocked" : "unBlocked"}</td>
                              <td className='p-3'>{instructor.isBlock ? <span onClick={() => unBlockInstructor(instructor._id)} className='btn btn-success d-flex justify-content-center'>UnBlock</span>
                              : <span onClick={() => blockInstructor(instructor._id)} className='btn btn-danger d-flex justify-content-center'>Block</span>}</td>
                            </tr>
                              ))
                            }
                          </tbody>
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

export default ManageInstructors