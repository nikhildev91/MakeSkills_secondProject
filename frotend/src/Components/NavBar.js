import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../Actions/UserActions'

const NavBar = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector( state => state.userLogin )
  const { userInfo } = userLogin
  const handlelogout = () => {
    dispatch(logout())
  }
  return (
    <Navbar bg="light" expand="lg" style={{ position: "sticky", top: "0", zIndex: "500"}}>
    <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="me-auto">
    <NavDropdown title="Category" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>
    <Nav.Link href="#link">Forum</Nav.Link>
    { userInfo && !userInfo.isPremiumStudent && <Nav.Link href="#home">Pricing</Nav.Link> }
    { !userInfo && <Nav.Link href="#home">Pricing</Nav.Link>}
      </Nav>
      {/* {
        userInfo && userInfo.isStudent &&
      <Nav className="me-auto">
        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      } */}
      {
        userInfo && userInfo.isInstructor &&
        <Nav className="me-auto">
        <Nav.Link href="#home">Forum</Nav.Link>
        <LinkContainer to='/instructor/create-course'>
        <Nav.Link>Create Course</Nav.Link>
        </LinkContainer>
      </Nav>
      }
      { 
        !userInfo && 
        <Nav className="ms-auto">
        <LinkContainer to='/login'>
        <Nav.Link>Sign In</Nav.Link>
        </LinkContainer>
        <LinkContainer to='/register'>
        <Button className='btn btn-outline btn-block'>Try For Free</Button>
        </LinkContainer>
      </Nav> 
      }
      
      {
        userInfo && userInfo.isStudent &&
      <Nav className="ms-auto">
        <Nav.Link href="#home">Cart</Nav.Link>
        <NavDropdown title={userInfo.fname} id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={handlelogout}>Logout</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      }
      {
        userInfo && userInfo.isInstructor &&
      <Nav className="ms-auto">
        <NavDropdown title={userInfo.fname} id="basic-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={handlelogout}>Logout</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      }
    </Navbar.Collapse>
</Navbar>
  )
}

export default NavBar