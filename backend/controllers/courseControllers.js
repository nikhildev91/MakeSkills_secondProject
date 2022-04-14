import asyncHandler from 'express-async-handler'
import AWS from 'aws-sdk'
import { nanoid } from 'nanoid'
import { readFileSync} from 'fs'
import slugify from 'slugify'
import Course from '../models/courseModel.js'

const awsConfig = {
// /pasteid
}
const S3 = new AWS.S3(awsConfig)

// @desc Course Thumbnail Upload to S3
// @router /api/instructors/course/upload-image
// @access PRIVATE

const uploadCourseImage = async ( req, res ) => {
   try{
    const { image } = req.body
    if(!image) return res.status(400).send("no image")

    // Prepare The Imaage
    const base64Data = new Buffer.from(image.replace(/^data:image\/\w+;base64,/, ""), "base64" );
    const type = image.split(';')[0].split("/")[1];

    // Image Params
    const params = {
        Bucket : "makeskills-bucket",
        Key : `${nanoid()}.${type}`,
        Body : base64Data,
        ACL: 'public-read',
        ContentEncoding : "base64",
        ContentType: `image/${type}`
    }

    // Upload to S3
    S3.upload(params, ( err, data )=>{
        if(err){
            console.log(err);
            return res.sendStatus(400)
        }else{
            res.send(data);
        }
    })
   } catch(error){
       console.log(error);
   }
}


// @desc Course Thumbnail Remove from S3
// @router /api/instructors/course/remove-image
// @access PRIVATE

const removeCourseImage = async ( req, res ) => {
    try{
        const { image } = req.body
        const params ={
            Bucket : image.Bucket,
            Key : image.Key
        }

        // send remove request to S3
        S3.deleteObject(params, (err, data )=>{
            if(err){
                console.log(err);
                res.sendStatus(400)
            }else{
                res.send({ Ok : true })
            }
        })
    }catch (error) {
        console.log(error);
    }
} 


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


const uploadVideo = async (req, res ) => {
    try{
        const { video } = req.files
        if(!video) return  res.status(400).send("No Video")

        // video params
        const params = {
             Bucket : "makeskills-bucket",
             Key : `${nanoid()}.${video.type.split("/")[1]}`, // video/mp4
             Body : readFileSync(video.path),
             ACL: 'public-read',
             ContentType: video.type
        }

        // upload video to S3

        S3.upload(params, (err, data) => {
            if(err){
                console.log(err);
                res.sendStatus(400)
            }
            // console.log(data);
            res.send(data)
        })

     } catch(error){
         console.log(error);
     }
}

const removeVideo = async ( req, res ) => {
    try{
        const  video  = req.filess
        console.log(video, "na;sdvaksvanavnlda,gvaa");
        if(!video) return  res.status(400).send("No Video")

        // video params
        const params = {
             Bucket : "makeskills-bucket",
             Key : video.Key
        }

        // remove video from S3
        S3.deleteObject(params, (err, data) => {
            if(err){
                console.log(err);
                res.sendStatus(400)
            }
            console.log(data);
            res.send({ ok : true})
        })

     } catch(error){
         console.log(error);
     }
}
export { uploadCourseImage, removeCourseImage, createCourse, courseLists, viewCourse, updateCourse, uploadVideo, removeVideo }