import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'

import FormContainer from '../Components/FormContainer'
import Message from '../Components/Message'
import { login } from '../Actions/UserActions'

const Login = () => {
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const { error, userInfo } = userLogin

    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
        }
    },[ navigate, userInfo, redirect ])


    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }
  return (
        <FormContainer>
            <h1>Sign In</h1>
            { error && <Message variant="danger">{error}</Message>}
        <Form onSubmit={handleSubmit}>
            <Form.Group className='mt-3'>
                <Form.Label>Email</Form.Label>
                <Form.Control type='text' placeholder='Enter Email' value={email} onChange={ e => setEmail(e.target.value) }/>
            </Form.Group>
            <Form.Group className='mt-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Enter Password' value={password} onChange={ e => setPassword(e.target.value) }/>
            </Form.Group>
            <Button className='mt-3' type='submit'>Login</Button>
        </Form>
        <Row className='py-3'>
            <Col>
            New Customer ? { ' '} 
            <Link to={ redirect ? `/register?redirect=${redirect}` : '/register'} > Register </Link>
            </Col>
        </Row>
        </FormContainer>
  )
}

export default Login