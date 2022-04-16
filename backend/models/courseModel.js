import mongoose from 'mongoose'

const lessonSchema = mongoose.Schema({
    name : {
        type : String,
        trim : true,
        minlength : 3,
        maxlength : 320,
        required : true
    },
    slug : {
        type : String,
        lowercase : true
    },
    content : {
        type : String,
        minlength : 5,
    },
    video : String,
    free_preview : {
        type : Boolean,
        default : false
    }
})

const courseSchema = mongoose.Schema({
    title : {
        type: String,
        trim : true,
        maxlength: 300,
        required : true
    },
    slug : {
        type : String,
        lowercase : true
    },
    description : {
        type : String,
        minlength: 2,
        required : true
    },
    price : {
        type : Number,
        default : 499,
        required : true
    },
    image : String,
    category : String,
    published : {
        type : Boolean,
        default : false,
        required :true
    },
    paid : {
        type : Boolean,
        default : true,
        required : true
    },
    instructorId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    lessons: [ lessonSchema ]
}, {timestamps : true})


const Course = mongoose.model('Course', courseSchema)

export default Course