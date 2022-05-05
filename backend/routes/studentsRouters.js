import express from "express";
const router = express.Router()
import { studentProtect, isEnrolled } from '../middlewares/authMiddlewares.js'
import { 
    listCourses,
    courseDetails,
    addtocart,
    cartList,
    cartItemRemove,
    checkEnrollment,
    freeEnrollment,
    myCourseslist,
    markCompleted,
    listCompleted,
    provideCertificate,
    createCourseReview
 } from '../controllers/studentsControllers/courseControllers.js'


 router.get('/courses', listCourses )
 router.get('/course-view/:slug', courseDetails)
 router.post('/add-to-cart/:userId/:slug', addtocart)
 router.get('/add-to-cart/:userId', studentProtect, cartList)
 router.post('/remove-cart-item/:userid/:itemid/:cartid', cartItemRemove)
 router.get('/mycourses/:userid', studentProtect, myCourseslist)

 router.get('/check-enrollment/:courseid', studentProtect, checkEnrollment )
 router.post('/free-enrollment/:courseid', studentProtect, freeEnrollment)
 
 // reuse controller for get course details
 router.get('/mycourses-details/:userid/:slug', studentProtect, isEnrolled, courseDetails)
 router.get('/start-course/:userid/:slug', studentProtect, isEnrolled, courseDetails)

 // mark completed
 router.post('/mark-completed-lesson', studentProtect, markCompleted)
 router.post('/list-completed', studentProtect, listCompleted)

 // provide certificate
 router.post('/provide-certificate', studentProtect, provideCertificate )

 // write reviews
 router.post('/course-review/:courseid', createCourseReview)

export default router