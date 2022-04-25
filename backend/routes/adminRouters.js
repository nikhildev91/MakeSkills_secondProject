import express from "express";
import { adminProtect } from '../middlewares/authMiddlewares.js'
import { 
    listInstructors, 
    listStudents 
} from '../controllers/AdminControllers/adminControllers.js'

const router = express.Router()

router.get('/get-all-instructors', adminProtect, listInstructors)
router.get('/get-all-students', adminProtect, listStudents)


export default router