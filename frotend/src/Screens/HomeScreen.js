import React from 'react'
import { useSelector } from 'react-redux'
import InstructorDashboard from './InstructorDashboard'
import MainHomepage from './MainHomepage'
import HomePage from './Students/HomePage'
import Dashboard from './Admin/Dashboard'


const HomeScreen = () => {
  const userLogin = useSelector( state => state.userLogin )
  const { userInfo } = userLogin
  
  return (
    <>
      
      {
        !userInfo && <MainHomepage />
      }
      {
        userInfo && userInfo.isInstructor && <InstructorDashboard />
      }
      {
        userInfo && userInfo.isStudent && <HomePage />
      }
      {
        userInfo && userInfo.isAdmin && <Dashboard />
      }
        
    </>
  )
}

export default HomeScreen