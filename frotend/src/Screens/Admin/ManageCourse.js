import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


const AdminManageCourse = () => {
    const navigate = useNavigate()

    const userLogin = useSelector( state => state.userLogin )
    const { userInfo } = userLogin

    useEffect(() => {
        if( !userInfo || !userInfo.isAdmin){
            navigate('/')
        }
    }, [ userInfo ])
  return (
    <div>ManageCourse</div>
  )
}

export default AdminManageCourse