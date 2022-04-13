import express from "express";
import { uploadCourseImage, removeCourseImage } from "../controllers/courseControllers.js";

const router = express.Router()



// Courses Routers

router.post('/course/upload-image', uploadCourseImage)
router.post('/course/remove-image', removeCourseImage)

export default router