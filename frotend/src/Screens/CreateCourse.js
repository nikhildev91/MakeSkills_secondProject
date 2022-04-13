import React, { useState } from 'react'
import CreateCourseForm from '../Components/CreateCourseForm'

const CreateCourse = () => {
  const [ title, setTitle ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ category, setCategory ] = useState('')
  const [ paid, setPaid ] = useState(false)
  const [ price, setPrice ] = useState('')
  const [ image, setImage ] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(title);
  }
  return (
    <CreateCourseForm 
      title = {title}
      setTitle = {setTitle}
      description = {description}
      setDescription = {setDescription}
      category = {category}
      setCategory = {setCategory}
      paid = {paid}
      setPaid = {setPaid}
      setPrice = {setPrice}
      price = {price}
      image = { image}
      setImage = { setImage}   
      handleSubmit = {handleSubmit} 
      />
  )
}

export default CreateCourse