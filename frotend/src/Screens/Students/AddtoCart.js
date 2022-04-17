import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { addtocartAction } from '../../Actions/StudentActions/CourseActions'

const AddtoCart = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { slug } = useParams()
  const userLogin = useSelector( state => state.userLogin )
  const { userInfo } = userLogin

  useEffect(() => {
    if(!userInfo && !userInfo.isStudent) {
      navigate('/')
    }

    dispatch(addtocartAction(slug))
  }, [ userInfo, dispatch ])
  return (
    <div>AddtoCart</div>
  )
}

export default AddtoCart