import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const userSchema = mongoose.Schema({
    fname : {
        type : String,
        required : true
    },
    lname : {
        type : String,
        required : true
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    isInstructor : {
        type : Boolean,
        default : false,
        required : true
    },
    isStudent : {
        type : Boolean,
        default : false,
        required : true
    },
    isAdmin : {
        type : Boolean,
        default : false,
        required : true
    },
    isBlock : {
        type : Boolean,
        default : false
    },
    myCourses :[
        {
            type : mongoose.Schema.Types.ObjectId, 
            ref : "Course"
        }
    ]
}, { timestamps : true })

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})


const User = mongoose.model('User', userSchema)


export default User