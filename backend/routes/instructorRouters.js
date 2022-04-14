import express from "express";
import formidable from 'express-formidable'
import { instructorProtect } from "../middlewares/authMiddlewares.js";
import { 
    uploadCourseImage, 
    removeCourseImage, 
    createCourse, 
    courseLists, 
    viewCourse,
    updateCourse,
    uploadVideo,
    removeVideo
        } from "../controllers/courseControllers.js";

const router = express.Router()



// Courses Routers

router.post('/course/upload-image', uploadCourseImage)
router.post('/course/remove-image', removeCourseImage)
router.post('/upload-video', formidable(), uploadVideo)
router.post('/remove-video', removeVideo)
router.post('/create-course',instructorProtect, createCourse)
router.get('/courses', instructorProtect, courseLists)
router.get('/course-view/:slug', instructorProtect, viewCourse)
router.post('/course-update/:slug', instructorProtect, updateCourse)

export default router