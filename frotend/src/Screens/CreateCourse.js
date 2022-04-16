import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import storage from '../firebase'
import CreateCourseForm from '../Components/CreateCourseForm'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { COURSE_CREATE_RESET } from '../Constants/CourseConstants'
import { createCourseAction } from '../Actions/CourseActions'


const CreateCourse = () => {
  const dispatch = useDispatch()
  const naviagate = useNavigate()

  const [ title, setTitle ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ category, setCategory ] = useState('')
  const [ paid, setPaid ] = useState(false)
  const [ price, setPrice ] = useState('')
  const [ image, setImage ] = useState('')

  const [ UploadButtonText, setUploadButtonText ] = useState('Upload Thumbnail')
  const [ preview, setPreview ] = useState('')
  const [ loading, setLoading ] = useState(false)
  const [ progress, setProgress ] = useState(0)

  const userLogin = useSelector( state => state.userLogin)
  const { userInfo } = userLogin

  const courseCreate = useSelector( state => state.courseCreate)
  const {
    error : errorCreate,
    success : successCreate
  } = courseCreate

  useEffect(() => {
    dispatch( { type : COURSE_CREATE_RESET })
    if(!userInfo.isInstructor){
      naviagate('/login')
    }

    if(successCreate) {
      naviagate('/')
    }

  }, [ dispatch, userInfo, successCreate ])


  // create course Thumbnail handle
  const handleImage = (e) => {
    let file = e.target.files[0]
    let fileName = new Date().getTime() + file.name
    setUploadButtonText(file.name)
    setLoading(true)

    const storageRef = ref(
      storage, `/thumbnails/${fileName}`
    )
      
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploaded = Math.floor(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
          setProgress(uploaded);
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImage(url)
          setPreview(url)
          setLoading(false)
        })
      }
    )
  }

  // Remove Course Thumbnail
  const handleImageRemove = async () => {
    const desertRef = ref(storage, image);
    deleteObject(desertRef).then(() => {
    setPreview('')
    setImage('')
    setUploadButtonText("Upload Another Image")
    }).catch((error) => {
      console.log(error);
    });
  }

  // create course Form Submit
  const handleSubmit = (e) => {
    e.preventDefault()
    if(!paid){
      setPrice("0")
    }
    dispatch(createCourseAction( title, description, category, paid, price, image ))
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