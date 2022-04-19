import asyncHandler from 'express-async-handler'
import Course from '../../models/courseModel.js'
import User from '../../models/userModels.js'
import AddtoCart from '../../models/addtocartModel.js'
import mongoose from 'mongoose'


// @desc Get Courses for listing in Students page
// @router /api/students/courses
// @access PRIVATE

const listCourses = asyncHandler( async (req, res) => {
    const courses = await Course.find({ published : true }).limit(6).exec()
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

const checkEnrollment = asyncHandler( async (req, res) => {
    const { courseid } = req.params
    // find couseres of the currently logged in user
    const user = await User.findById(req.student._id).exec()

    // check if course id is found in user courses array
    let ids = []
    for(let i = 0; i < user.courses.length; i++){
        ids.push(user.courses[i].toString())
    }
    res.json({
        status : ids.includes(courseid),
        course : await Course.findById(courseid).exec()
    })
})

export {
    listCourses,
    courseDetails,
    addtocart,
    cartList,
    cartItemRemove,
    checkEnrollment
}