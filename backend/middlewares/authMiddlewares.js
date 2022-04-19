import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import User from '../models/userModels.js'

const instructorProtect = asyncHandler( async ( req, res, next ) => {
    let token
    console.log(req.headers);
    console.log(req.headers.authorization, " &&", req.headers.authorization.startsWith('Bearer '));
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

export { instructorProtect, studentProtect }