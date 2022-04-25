import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const SalesReport = () => {
    const navigate = useNavigate()
    const userLogin = useSelector( state => state.userLogin )
    const { userInfo } = userLogin

    useEffect(() => {
        if( !userInfo || !userInfo.isAdmin) {
            navigate('/')
        }
    }, [ userInfo ])
  return (
    <div>SalesReport</div>
  )
}

export default SalesReport