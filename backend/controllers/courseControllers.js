import asyncHandler from 'express-async-handler'
import slugify from 'slugify'
import Course from '../models/courseModel.js'




/// @desc Create Course and upload to database
// @router /api/instructors/create-course
// @access PRIVATE

const createCourse = asyncHandler( async ( req, res ) => {
    const { title, description, category, paid, price, image } = req.body
    const instructorId = req.instr._id

    // is course already existed and create course to database
    const alreadyExist = await Course.findOne({
        slug : slugify(req.body.title.toLowerCase())
    })
    if(alreadyExist){
        res.status(400)
         throw new Error ("Title Already Exists!..") 
    } else{
        const  course = await Course.create({
            title, 
            description, 
            category,
            slug : slugify(title),
            paid, 
            price, 
            image,
            instructorId
        })

        if(course) {
            console.log(course);
            res.json({
                _id : course._id,
                title : course.title, 
                description : course.description, 
                category : course.category, 
                paid : course.paid, 
                price : course.price, 
                image : course.image,
                instructor : course.instructor
            })
        } else {
            res.status(400)
            throw new Error ("Create Course Failed. Try it later")
        }
    }

})



/// @desc Instructors courses List
// @router /api/instructors/courses
// @access PRIVATE

const courseLists = asyncHandler( async ( req, res ) => {
    const instructorId = req.instr._id
    const courses = await Course.find({ instructorId }).sort({ createdAt : -1 })
    if(courses){
        res.json(courses)
    } else {
        res.status(400)
        throw new Error('Course Listed Failed!..')
    }
})

/// @desc Instructors courses Details
// @router /api/instructors/course-view/:slug
// @access PRIVATE

const viewCourse = asyncHandler( async ( req, res ) => {
    let course = await Course.findOne({ slug : req.params.slug })
    res.json(course)
})


/// @desc Instructors courses Details
// @router /api/instructors/course-view/:slug
// @access PRIVATE

const updateCourse = asyncHandler( async (req, res) => {
    const { slug } = req.params
    const course = await Course.findOne({ slug })
    const courseInstructorId = toString(course.instructor)
    const loggedInInstructorId = toString(req.instr._id)
            
    if(courseInstructorId !== loggedInInstructorId){
        res.status(400)
        throw new Error ("Unauthorized")
    }
    const updated = await Course.findOneAndUpdate( { slug }, req.body, { new : true }).exec();
    if(updated){
        res.json(updated)
    }else{
        res.status(400)
        throw new Error('Course Updated Failed!..')
    }       
})



// @desc Add Lesson to Database
// @router /api/instructors/add-lesson/:slug
// @access PRIVATE

const addLesson = asyncHandler( async ( req, res ) => {
    const { slug } = req.params
    const { name, content, video } = req.body
    const course = await Course.findOne({ slug : slug })
    const authorId = toString(course.instructor)
    const loggedInUser = toString(req.instr._id)

    if( loggedInUser != authorId ) {
        return res.status(400).send("Unauthoried")
    }

    const updated = await Course.findOneAndUpdate({slug : slug }, 
    {
        $push: { lessons : { name, content, video, slug : slugify(name)}}
    },
    { new : true }).exec();

    if(updated){
        res.json(updated)
    } else {
        res.status(400)
            throw new Error("Add Lesson Failed!..")
    }

})



// @desc Revmove Lesson from Database
// @router /api/instructors/remove-lesson/:slug
// @access PRIVATE

const removeLesson = asyncHandler( async (req, res) => {
    const { slug, lessonid } = req.params
    const course = await Course.findOne( { slug }).exec();
       const deleteCourse = await Course.findByIdAndUpdate( course._id, {
            $pull: { lessons : { _id : lessonid }}
        }).exec();
        res.json({ ok : true })

})



// @desc Update Lesson =
// @router /api/instructors/upfdate-lesson/:slug
// @access PRIVATE

const updateLesson = asyncHandler( async ( req, res ) => {
    const slug = req.params.slug
    console.log(req.body);
    const { current } = req.body
    const { _id, name, content, video, free_preview } = current
    const course = await Course.findOne({ slug }).exec()
    const authorId = JSON.stringify(course.instructorId)
    const loggedUser = JSON.stringify(req.instr._id)
    if( authorId != loggedUser){
        res.status(404)
        throw new Error("Unauthorized User")
    }else{
        const updated = await Course.updateOne( { "lessons._id" : _id }, 
            { $set : {
                "lessons.$.name" : name,
                "lessons.$.content" : content,
                "lessons.$.video" : video,
                "lessons.$.free_preview" : free_preview,
                    }
            },
            { new : true }
        ).exec();
        if(updated) {
            res.json( { ok : true })
        }else{
            res.status(404)
            throw new Error("Update Lesson Failed!...")
        }
    }
})

export { 
    createCourse, 
    courseLists, 
    viewCourse, 
    updateCourse,
    addLesson,
    removeLesson,
    updateLesson

        }