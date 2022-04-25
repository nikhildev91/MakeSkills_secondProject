import asynchandler from 'express-async-handler'
import generateToken from '../utility/generatorToken.js'
import User from '../models/userModels.js'



// @desc Auth user and get token
// @router /api/user/login
// @access PUBLIC

const authUser = asynchandler( async ( req, res ) => {
    const { email, password } = req.body
    const user = await User.findOne( { email })
    if( user && ( await user.matchPassword( password )) ){
        res.json({
            _id : user._id,
            fname : user.fname,
            lname : user.lname,
            email: user.email,
            isInstructor : user.isInstructor,
            isStudent : user.isStudent,
            isAdmin : user.isAdmin,
            token : generateToken(user._id)  
        })
    } else{
        res.status(400)
        throw Error("Invalid email and password")
    }

})


// @desc Register new user and get token
// @router /api/user/register
// @access PUBLIC

const registerUser = asynchandler( async ( req, res ) => {
    const { fname, lname, email, password, isInstructor, isStudent } = req.body
    const userExist = await User.findOne({email})

    if(userExist){
        res.status(400)
        throw new Error('User Already Exists')
    }

    const user = await User.create({
        fname,
        lname,
        email,
        password,
        isInstructor,
        isStudent
    })

    if(user){
        res.status(201).json({
            _id : user._id,
            fname : user.fname,
            lname : user.lname,
            email: user.email,
            isInstructor : user.isInstructor,
            isStudent : user.isStudent,
            isAdmin : user.isAdmin,
            token : generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('User not found')
    }
})

export { authUser, registerUser }