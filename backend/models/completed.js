import mongoose from "mongoose";

const completedSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    course : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Course"
    },
    lessons : [{
        lesson : '',
        notes : ''
    }]
}, { timestamps : true})

const Completed = mongoose.model('Completed', completedSchema)

export default Completed