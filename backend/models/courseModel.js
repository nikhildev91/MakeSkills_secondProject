import mongoose from 'mongoose'

const reviewSchema = mongoose.Schema(
    {
        name : { type : String, required : true },
        rating : { type : Number, required : true},
        comment : { type : String, required : true},
        user : {
            type : mongoose.Schema.Types.ObjectId,
            required : true,
            ref : 'User'
        }
    },
    {
        timestamps : true
    }
)

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
    lessons: [ lessonSchema ],
    studentsCount :{
        type : Number,
        default : 0
    },
    reviews : [ reviewSchema ],
    rating : {
        type : Number,
        required : true,
        default : 0
    },
    numReviews : {
        type : Number,
        required : true,
        default : 0
    }
}, {timestamps : true})




const Course = mongoose.model('Course', courseSchema)

export default Course