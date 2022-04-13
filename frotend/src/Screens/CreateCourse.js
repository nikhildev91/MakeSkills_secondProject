import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Resizer from 'react-image-file-resizer'
import CreateCourseForm from '../Components/CreateCourseForm'
import { useDispatch } from 'react-redux'


const CreateCourse = () => {
  const dispatch = useDispatch()

  const [ title, setTitle ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ category, setCategory ] = useState('')
  const [ paid, setPaid ] = useState(false)
  const [ price, setPrice ] = useState('')
  const [ image, setImage ] = useState({})

  const [ UploadButtonText, setUploadButtonText ] = useState('Upload Thumbnail')
  const [ preview, setPreview ] = useState('')
  const [ loading, setLoading ] = useState(false)


  // create course Thumbnail handle
  const handleImage = (e) => {
    let file = e.target.files[0]
    setUploadButtonText(file.name)
    setLoading(true)
    Resizer.imageFileResizer(file, 720, 500, 'JPEG', 100, 0, async (uri) => {
      try{
        const { data } = await axios.post('/api/instructors/course/upload-image', {
          image : uri
        })
        toast("Successfully Thumnail Uploaded....")
        setPreview(data.Location)
        setImage(data)
        setLoading(false)

      } catch (error) {
          console.log(error);
          setLoading(false)
          setUploadButtonText("Upload Thumbnail")
          toast("Image Upload failed!...")
      }
    })
  }

  // Remove Course Thumbnail
  const handleImageRemove = async () => {
    try{
      await axios.post('/api/instructors/course/remove-image', { image })
      setImage({})
      setPreview('')
      toast("Image Deleted!")
    } catch (error) {
      console.log(error);
      setUploadButtonText("Upload Thumbnail")
      toast("Image Delete Failed. Try Again!....")
    }
  }

  // create course Form Submit
  const handleSubmit = (e) => {
    e.preventDefault()
    // dispatch()
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
      handleImage = {handleImage}
      UploadButtonText = {UploadButtonText}
      toast = {toast}
      loading = {loading}
      preview = {preview}
    handleImageRemove = {handleImageRemove}
      />
  )
}

export default CreateCourse