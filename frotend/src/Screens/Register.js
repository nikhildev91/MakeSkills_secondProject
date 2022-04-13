import React, { useState, useEffect } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Row, Col, Button } from 'react-bootstrap'
import FormContainer from '../Components/FormContainer'
import Message from '../Components/Message'
import { register } from '../Actions/UserActions'

const Register = () => {
    const [ fname, setFname ] = useState('')
    const [ lname, setLname ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ confirmPassword, setConfirmPassword ] = useState('')
    const [ isInstructor, setIsInstructor ] = useState(false)
    const [ isStudent, setIsStudent ] = useState(false)

    const [ message, setMessage ] = useState(null)

    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const redirect = location.search ? location.search.split('=')[1] : '/login'

    const userLogin = useSelector( state => state.userLogin )
    let { error, userInfo } = userLogin

    useEffect(()=>{
        if(userInfo){
            navigate('/')
        }else{
            navigate('/register')
        }
    },[ dispatch, navigate, userInfo ])

    const handleSubmit = (e) => {
        e.preventDefault()
        if( password === confirmPassword ){
            dispatch(register(fname, lname, email, isInstructor, isStudent, password))
        } else {
            setMessage("Password and Confirm Password Are Not Matched!")
        }
    }
  return (
    <FormContainer>
        <h1>Register New Customer</h1>
        { message && <Message variant='danger'>{message}</Message>}
        { error && <Message variant='danger'>{error}</Message>}
        <Form onSubmit={handleSubmit}>
            <Form.Group className='mt-3'>
                <Form.Label>First Name</Form.Label>
                <Form.Control type='text' placeholder='Enter First Name' value={fname} onChange={ e => setFname(e.target.value)} />
            </Form.Group>
            <Form.Group className='mt-3'>
                <Form.Label>Last Name</Form.Label>
                <Form.Control type='text' placeholder='Enter Last Name' value={lname} onChange={ e => setLname(e.target.value)} />
            </Form.Group>
            <Form.Group className='mt-3'>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' placeholder='Enter Email Address' value={email} onChange={ e => setEmail(e.target.value)} />
            </Form.Group>
            <Form.Group className='mt-3'>
                <Form.Label>Register As</Form.Label>
                <Form.Check className='ms-4' inline type='radio' label="Student"  name='accountType' value={true} onChange={ e => setIsStudent(e.target.value)} />
                <Form.Check inline type='radio' label="Instructor" name='accountType' value={true} onChange={ e => setIsInstructor(e.target.value)} />
        </Form.Group>
        <Row>
            <Col md={6}>
            <Form.Group className='mt-3'>
                <Form.Label>New Password</Form.Label>
                <Form.Control type='password' placeholder='Enter New Password' value={password} onChange={ e => setPassword(e.target.value)} />
            </Form.Group>
            </Col>
            <Col md={6}>
            <Form.Group className='mt-3'>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type='password' placeholder='Repeat Password' value={confirmPassword} onChange={ e => setConfirmPassword(e.target.value)} />
            </Form.Group>
            </Col>
        </Row>
        <Button className='ms-auto mt-3' type='submit'>Register</Button>
        </Form>
        <Row className='py-3'>
            <Col>
            Have Account ? { ' '} 
            <Link to={ redirect ? `/login?redirect=${redirect}` : '/login'} > Login </Link>
            </Col>
        </Row>
    </FormContainer>
  )
}

export default Register