import express from "express";
import { adminProtect } from '../middlewares/authMiddlewares.js'
import { 
    listInstructors, 
    listStudents,
    blockUser,
    unblockuser
} from '../controllers/AdminControllers/adminControllers.js'

const router = express.Router()

router.get('/get-all-instructors', adminProtect, listInstructors)
router.get('/get-all-students', adminProtect, listStudents)
router.post('/block-student', adminProtect, blockUser)
router.post('/unblock-student', adminProtect, unblockuser)


export default router