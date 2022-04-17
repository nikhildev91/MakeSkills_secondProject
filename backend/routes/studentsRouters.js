import express from "express";
const router = express.Router()
import { studentProtect } from '../middlewares/authMiddlewares.js'
import { 
    listCourses,
    courseDetails,
    addtocart
 } from '../controllers/studentsControllers/courseControllers.js'


router.get('/courses', studentProtect, listCourses )
router.get('/course-view/:slug', studentProtect, courseDetails )
router.post('/add-to-cart/:slug', studentProtect, addtocart)

export default router