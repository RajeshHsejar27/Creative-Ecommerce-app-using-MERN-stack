import mongoose from "mongoose"; //fr creating product schema
const {ObjectId}=mongoose.Schema; //to destructure objectid from mongoose schema

//creating contents=new product schema model
const productSchema=new mongoose.Schema({
    name:{  
        type:String,
        trim:true,
        required:true,
        maxlength:160,
    },
    slug:{  //used for searching products via url in friendly way
        type:String,
        lowercase:true,
    },
    description:{
        type:{},
        required:true,
        maxlength:2000,
    },
    price:{
        type:Number,
        trim:true,
        required:true,
    },
    category:{  //now we have to save category id by destructuring it from mongoose
        //each product must have a category
        //since we used type and reference here about the category,we can use populate later
        type:ObjectId,
        ref:"Category",
        required:true,
    },
    quantity:{
        type:Number,
    },
    sold:{
        type:Number,
        default:0,
    },
    photo:{
        //saved as binary data in mongodb - upto 16mb can be saved
        //other options are aws s3,cloudinary where we upload the image and we get an
        //url to use and save it in the database.
        data:Buffer,
        contentType:String,
    },
    shipping:{
        required:false,
        type:Boolean,
    },   
},{timestamps:true}
);

export default mongoose.model("Product",productSchema);