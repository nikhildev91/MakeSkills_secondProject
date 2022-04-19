import express from "express";
const router = express.Router()
import { studentProtect } from '../middlewares/authMiddlewares.js'
import { 
    listCourses,
    courseDetails,
    addtocart,
    cartList,
    cartItemRemove,
    checkEnrollment
 } from '../controllers/studentsControllers/courseControllers.js'


 router.get('/courses', studentProtect, listCourses )
 router.get('/course-view/:slug', studentProtect, courseDetails)
 router.post('/add-to-cart/:userId/:slug', addtocart)
 router.get('/add-to-cart/:userId', studentProtect, cartList)
 router.post('/remove-cart-item/:userid/:itemid/:cartid', cartItemRemove)

 router.get('/check-enrollment/:courseid', studentProtect, checkEnrollment )

export default router