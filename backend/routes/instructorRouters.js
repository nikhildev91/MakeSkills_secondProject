import express from "express";
import { instructorProtect } from "../middlewares/authMiddlewares.js";
import {
    createCourse, 
    courseLists, 
    viewCourse,
    updateCourse,
    addLesson,
    removeLesson,
    updateLesson,
    publishCourse,
    publishedCoursesList,
    unPublishCourse
        } from "../controllers/courseControllers.js";

const router = express.Router()



// Courses Routers

router.post('/create-course',instructorProtect, createCourse)
router.get('/courses', instructorProtect, courseLists)
router.get('/course-view/:slug', instructorProtect, viewCourse)
router.post('/course-update/:slug', instructorProtect, updateCourse)
router.post('/add-lesson/:slug', instructorProtect, addLesson)
router.put('/update-course/:slug', instructorProtect, updateCourse)
router.put('/update-course/:slug/:lessonid', removeLesson)
router.put('/update-lesson/:slug/:lessonid', instructorProtect, updateLesson)
router.get('/published-courses', instructorProtect, publishedCoursesList)

// publish course

router.put('/publish/:courseid',instructorProtect, publishCourse)
router.put('/unpublish/:courseid', instructorProtect, unPublishCourse)

export default router