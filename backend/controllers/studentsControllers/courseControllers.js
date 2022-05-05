import asyncHandler from 'express-async-handler'
import Course from '../../models/courseModel.js'
import User from '../../models/userModels.js'
import AddtoCart from '../../models/addtocartModel.js'
import mongoose from 'mongoose'
import Completed from '../../models/completed.js'


// @desc Get Courses for listing in Students page
// @router /api/students/courses
// @access PRIVATE

const listCourses = asyncHandler( async (req, res) => {
    const courses = await Course.find({ published : true }).populate("instructorId", '_id fname lname').limit(4).exec()
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


// @desc Add courses to Add to Cart
// @router /api/students/:userId/:slug
// @access PRIVATE

const addtocart = asyncHandler( async ( req, res ) => {
    const { slug, userId }= req.params

    // Get user with userId and course with slug
    const user = await User.findOne( { _id :  userId }).exec()
    const item = await Course.findOne({ slug }).exec()
    const amount = item.price
    // return console.log(item);
    // check course already exist and update push to database
    const existCart = await AddtoCart.findOne({ userId : user._id })
     if( existCart ) {
         // check if course is already in cart
         const existItem  = await AddtoCart.findOne({ Items : { $elemMatch : { _id : item._id } } })
         if(existItem){
            res.status(400)
            throw new Error (" Corse Already exist ")
         }
         const addItem = await AddtoCart.findOneAndUpdate({ userId : user._id},
            {
                $push : { Items : item }
            },
            { new : true }).exec()
        const increment = await AddtoCart.updateOne({ userId : userId },
            {
                $inc : { totalAmount : item.price }
            }).exec()

         if(addItem){
             res.json({ ok : true })
         }
     } else {
         // if not exist course in database, here create new cart in database
        const addToCart = await AddtoCart.create({
            userId : user._id,
            user : user,
            Items : item,
            totalAmount : item.price
        })
        if(addToCart) {
            res.json({ ok : true })
        }
    
     }
})


// @desc Get Cart Courses
// @router /api/students/add-to-cart/:userId
// @access PRIVATE

const cartList = asyncHandler( async ( req, res ) => {
    const user = req.student._id
    const items = await AddtoCart.findOne({ userId : user })
    if(items){
        res.json( items )
    }else{
        res.status(400)
        throw new Error("Cart Not Found!..")
    }
})



// @desc Remove Item from Cart
// @router /api/students/remove-cart-item/:userid/:itemid/:cartid
// @access PRIVATE

const cartItemRemove = asyncHandler( async ( req, res ) => {
    const { userid , itemid, cartid } = req.params
    const item = mongoose.Types.ObjectId(itemid)
    const user = mongoose.Types.ObjectId(userid)
    const cart = mongoose.Types.ObjectId(cartid)

    const course = await AddtoCart.findById(cart,
        {
            Items : { $elemMatch : { _id : item }}
        }).exec()

        const coursePrice = course.Items[0].price
    
    const decrementtotalAmount = await AddtoCart.findByIdAndUpdate(cart ,
        {
            $inc : {
                totalAmount : - coursePrice
            }
        }
        ).exec()
    const removeItem = await AddtoCart.findByIdAndUpdate( cart,
        {
            $pull : {
                Items : { _id : item }
            }
        }).exec()

        res.json({ ok : true })
    
})


// @desc Check the Enroll course before 
// @router /api/students/check-enrollment/:courseid
// @access PRIVATE

const checkEnrollment = asyncHandler( async (req, res) => {
    const { courseid } = req.params
    // find couseres of the currently logged in user
    const user = await User.findById(req.student._id).exec()

    // check if course id is found in user courses array
    let ids = []
    let length = user.myCourses && user.myCourses.length
    for(let i = 0; i < length; i++){
        ids.push(user.myCourses[i].toString())
    }
    res.json({
        status : ids.includes(courseid),
        course : await Course.findById(courseid).exec()
    })
})



// @desc Check the Course is Free or paid
// @router /api/students/free-enrollment/:courseid
// @access PRIVATE

const freeEnrollment = asyncHandler( async (req, res) => {
    // check if course is free or paid 
    const course = await Course.findById(req.params.courseid).exec()
    if(course.paid) return
    const result = await User.findByIdAndUpdate(req.student._id, {
        $addToSet : { myCourses : course._id }
    }, { new : true }).exec();

    // update studentsCount in course document
    const updateCourse = await Course.findByIdAndUpdate(course._id,
        {
            $inc : { studentsCount : 1 }
        })
        console.log(updateCourse);
    res.json({
        message : ("enrollment sucess"),
        course 
    })
})


// @desc Get all courses the user bought
// @router /api/students/mycourses/:userid
// @access PRIVATE

const myCourseslist = asyncHandler( async ( req, res ) => {
    const user = await User.findById(req.params.userid).exec()
    const courses = await Course.find({ _id : { $in : user.myCourses }})
    .populate("instructorId", "_id fname lname").exec()
    res.json(courses)
})


// @desc mark completed course and lessons
// @router /api/students/mark-lesson-completed
// @access PRIVATE

const markCompleted = asyncHandler( async ( req, res ) => {
    const { courseId, lessonId, note } = req.body

    // find if user with that course is already created
    const existing = await Completed.findOne({
        user : req.student._id,
        course : courseId
    }).exec();

    if(existing){
        // check already lesson completed or not
        var found = false;
        for(let i = 0; i < existing.lessons.length; i++){
            if(existing.lessons[i].lesson === lessonId ){
                found = true;
            }
        }

        if(found){
            res.json({ok : true})
        }else{
        // update 
        const updated = await Completed.findOneAndUpdate({
            user : req.student._id, course : courseId
        },{
            $push : { lessons : {
                lesson : lessonId,
                notes : note
            } }
        }).exec()
        res.json({ ok : true })
    }
    }else{
        // create
        const created = await Completed.create({
            user : req.student._id,
            course : courseId,
            lessons : {
                lesson : lessonId,
                notes : note
            }
        })
        res.json({ ok : true })
    }
})


// @desc list completed course and lessons
// @router /api/students/list-completed
// @access PRIVATE

const listCompleted = asyncHandler( async ( req, res ) => {
    const { courseId } = req.body
    const lessons = []
    const list = await Completed.findOne({ 
        user : req.student._id,
        course : courseId
     }).exec();
     if(list){
        for(let i = 0; i < list.lessons.length; i++){
            lessons.push(list.lessons[i].lesson)
        }
     }
    res.json({ lesson : lessons ,  note : list.lessons})
})



// @desc If the course is completed. Provide Cerificate to student
// @router /api/students/provide-certificate
// @access PRIVATE

const provideCertificate = asyncHandler( async ( req, res ) => {
    const { courseId } = req.body
    const userId = req.student._id

    // find course and length of lessons array
    const course = await Course.findById(courseId).exec()
    const numberOfLessons = course.lessons.length

    // find the course in completes collection and length of completed lessons array length
    const completedCourse = await Completed.findOne( { user : userId, course : courseId }).exec()
    const numberOfCompletedLessons = completedCourse.lessons.length

    if(numberOfCompletedLessons === numberOfLessons ){
        res.json({
            completed : true
        })
    }else{
        res.json({
            completed : false
        })
    }
})


// @desc If Create new Review
// @router POST /api/students/course-review/:courseid
// @access PRIVATE

const createCourseReview = asyncHandler( async ( req, res ) => {
    const { rating , comment } = req.body
    const course = await Course.findById( req.params.courseid )
    if(course){
        const alreadyReviewed = course.reviews.find( r => r.user.toString() === "6256d256e7f41f16950ae7ee")
        if(alreadyReviewed){
            res.status(400)
            throw new Error("Course Already Reviewed")
        }

        const review ={
            name : "jihu",
            rating : Number(rating),
            comment : comment,
            user : "6256d256e7f41f16950ae7ee"
        }
        course.reviews.push(review)
        course.numReviews = course.reviews.length
        course.rating = course.reviews.reduce(( acc, item ) => item.rating + acc, 0)
        / course.reviews.length

        await course.save()
        res.status(201).json({ message : "Review Added"})
    }else{
        res.status(400)
        throw new Error("Course not found")
    }
})

export {
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
}