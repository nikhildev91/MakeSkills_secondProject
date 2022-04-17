import asyncHandler from 'express-async-handler'
import Course from '../../models/courseModel.js'
import User from '../../models/userModels.js'


// @desc Get Courses for listing in Students page
// @router /api/students/courses
// @access PRIVATE

const listCourses = asyncHandler( async (req, res) => {
    const courses = await Course.find().limit(6).exec()
    if(!courses){
        res.status(400)
        throw new Error("Not Found Courses")
    }
    res.json(courses)
})


// @desc Get Courses for listing in Students page
// @router /api/students/courses
// @access PRIVATE

const courseDetails = asyncHandler( async ( req, res ) => {
    const { slug } = req.params
    const course = await Course.findOne({ slug }).exec()
    const instructor = await User.findOne({ _id : course.instructorId })
    course.author = instructor
    if(!course){
        res.status(400)
        throw new Error("Course Not Found. Try Another one")
    }
    res.json({
        courseDetails : course,
        author : course.author
    })
})


const addtocart = asyncHandler( async ( req , res ) => {
    console.log("ethi");
    return
    const { slug } = req.params
    const course = await Course.findOne({ slug }).exec()
    console.log(course);
})


export {
    listCourses,
    courseDetails,
    addtocart
}