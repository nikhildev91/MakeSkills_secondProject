import asyncHandler from 'express-async-handler'
import Course from '../../models/courseModel.js'
import User from '../../models/userModels.js'


/// @desc list all instructors to admin manage instructors
// @router /api/admin/get-all-instrutors
// @access PRIVATE

const listInstructors = asyncHandler( async ( req, res ) => {
    const instructors = await User.find({ isInstructor : true }).exec()
    res.json(instructors)
})


/// @desc list all students to admin manage students
// @router /api/admin/get-all-students
// @access PRIVATE

const listStudents = asyncHandler( async ( req, res ) => {
    const students = await User.find( { isStudent : true }).exec()
    res.json(students)
})
export {
    listInstructors,
    listStudents
}