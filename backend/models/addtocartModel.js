import mongoose from "mongoose";

const addToCartSchema = mongoose.Schema({
    userId : {
        type : mongoose.Types.ObjectId,
        required : true
    },
    user :{},
    Items : [],
    totalAmount : {
        type : Number,
        default : 0
    }

}, { timestamps : true })

const AddtoCart = mongoose.model('AddtoCart', addToCartSchema)

export default AddtoCart