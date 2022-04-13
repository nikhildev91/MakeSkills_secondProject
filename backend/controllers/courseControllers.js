import asyncHandler from 'express-async-handler'
import AWS from 'aws-sdk'
import { nanoid } from 'nanoid'

const awsConfig = {
//   paster
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

export { uploadCourseImage, removeCourseImage }