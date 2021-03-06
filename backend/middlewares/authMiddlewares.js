import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import Course from '../models/courseModel.js'
import User from '../models/userModels.js'

const adminProtect = asyncHandler( async ( req, res, next ) => {
    let token
    if ( req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        console.log("yes");
        try{
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.instr = await User.findById(decoded.id).select('-password')
            if(req.instr.isAdmin === true){
                next()
            }else{
                res.status(401)
                throw new Error ('Not Authorized, token failed')
            }
           
        } catch (error ){
            console.log(error);
            res.status(401)
            throw new Error ('Not Authorized, token failed')
        }
    }

    if(!token) {
        res.status(401)
        throw new Error ('Not Authorized, token failed')
    }
})

const instructorProtect = asyncHandler( async ( req, res, next ) => {
    let token
    if ( req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        console.log("yes");
        try{
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.instr = await User.findById(decoded.id).select('-password')
            if(req.instr.isInstructor=== true){
                next()
            }else{
                res.status(401)
                throw new Error ('Not Authorized, token failed')
            }
           
        } catch (error ){
            console.log(error);
            res.status(401)
            throw new Error ('Not Authorized, token failed')
        }
    }

    if(!token) {
        res.status(401)
        throw new Error ('Not Authorized, token failed')
    }
})

const studentProtect = asyncHandler( async ( req, res, next ) => {
    let token
    if ( req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        console.log("yes");
        try{
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.student = await User.findById(decoded.id).select('-password')
            if(req.student.isStudent === true){
                return next()
            }else{
                res.status(401)
                throw new Error ('Not Authorized, token failed')
            }z
           
        } catch (error ){
            console.log(error);
            res.status(401)
            throw new Error ('Not Authorized, token failed')
        }
    }

    if(!token) {
        res.status(401)
        throw new Error ('Not Authorized, token failed')
    }
})

const isEnrolled = asyncHandler( async ( req, res, next)=>{
    const user = await User.findById(req.student._id).exec()
    const course = await Course.findOne({ slug : req.params.slug }).exec()

    // check if the course id is found in user's mycourses array
    let ids = [];
    for(let i = 0; i < user.myCourses.length; i++) {
        ids.push(user.myCourses[i].toString())
    }

    if(!ids.includes(course._id.toString())){
        res.status(403)
        throw new Error("Unauthorized")
    }else{
        next()
    }
})

export { instructorProtect, studentProtect, isEnrolled, adminProtect }