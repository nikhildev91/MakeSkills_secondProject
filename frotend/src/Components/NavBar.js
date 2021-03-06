import React from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Navbar, Nav, NavDropdown, Button, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../Actions/UserActions'

// const toggleButton = document.getElementsByClassName('toggle-button')[0]
// const navbarLinks = document.getElementsByClassName('navbar-links')[0]

// toggleButton.addEventListener('click', () => {
//   navbarLinks.classList.toggle('active')
// })

const NavBar = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector( state => state.userLogin )
  const { userInfo } = userLogin
  const handlelogout = () => {
    dispatch(logout())
  }
  return (
    <Navbar variant='success' bg='light' expand="lg" style={{ position: "sticky", top: "0", zIndex: "500"}}>
      <Container>
    <Navbar.Brand><LinkContainer to='/' style={{ fontWeight : "bold"}}><h3 variant='light' >MakeSkills</h3></LinkContainer></Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" variant='light'/>
    <Navbar.Collapse id="basic-navbar-nav">
    
      {
        userInfo && userInfo.isStudent&&
        <Nav className="me-auto" >
        <NavDropdown title="Category" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
        <Nav.Link href="#link">Forum</Nav.Link>
        { userInfo && !userInfo.isPremiumStudent && <LinkContainer to = '/plans'><Nav.Link>Pricing</Nav.Link></LinkContainer> }
        { !userInfo && <LinkContainer to = '/plans'><Nav.Link>Pricing</Nav.Link></LinkContainer>}
          </Nav>
  
      /* {
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
        <>
        <Nav className="me-auto">
        <NavDropdown title="Category" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
        <Nav.Link href="#link">Forum</Nav.Link>
        { userInfo && !userInfo.isPremiumStudent &&  <LinkContainer to = '/plans'><Nav.Link>Pricing</Nav.Link></LinkContainer> }
        { !userInfo &&  <LinkContainer to = '/plans'><Nav.Link>Pricing</Nav.Link></LinkContainer>}
          </Nav>
        <Nav className="ms-auto">
        <LinkContainer to='/login'>
        <Nav.Link className='me-3'>Sign In</Nav.Link>
        </LinkContainer>
        <LinkContainer to='/register'>
        <Button className='btn btn-outline btn-block tryForFreeButton'>Try For Free</Button>
        </LinkContainer>
      </Nav> 
      </>
      }
      
      {
        userInfo && userInfo.isStudent &&
      <Nav className="ms-auto">
        <LinkContainer to ='/add-to-cart'>
        <Nav.Link>Cart</Nav.Link>
        </LinkContainer>
        <NavDropdown title={userInfo.fname} id="basic-nav-dropdown" className='' style={{ marginRight : "120px"}}>
          <LinkContainer to='/profile'><NavDropdown.Item>Profile</NavDropdown.Item></LinkContainer>
          <NavDropdown.Item href="#action/3.2"><LinkContainer to='/my-courses'><span>My Courses </span></LinkContainer></NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={handlelogout}>Logout</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      }
      {
        userInfo && userInfo.isInstructor &&
      <Nav className="ms-auto">
        <NavDropdown title={userInfo.fname} id="basic-nav-dropdown" style={{ marginRight : "120px"}}>
        <LinkContainer to='/profile'><NavDropdown.Item>Profile</NavDropdown.Item></LinkContainer>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={handlelogout}>Logout</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      }
      {
        userInfo && userInfo.isAdmin && 
        <Nav className="ms-auto">
        <NavDropdown title={userInfo.fname} id="basic-nav-dropdown" style={{ marginRight : "120px"}}>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={handlelogout}>Logout</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      }
    </Navbar.Collapse>
    </Container>
</Navbar>
  )
}

export default NavBar