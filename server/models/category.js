import mongoose from "mongoose";

const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        maxLength:32,
        unique:true,
    },
    slug:{
        //slug used to search the category in url easily
        //ex: instead of some 'random id', we can search by 'sci-fi' 
        type:String,
        unique:true,
        lowercase:true,

    }
});

export default mongoose.model("Category",categorySchema);