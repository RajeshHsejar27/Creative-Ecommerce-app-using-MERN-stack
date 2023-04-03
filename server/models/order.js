import mongoose from "mongoose";

const {Schema}=mongoose;
const {ObjectId}=mongoose.Schema;


const orderSchema=new mongoose.Schema({
    //product will be in array and also we need its id fr reference
    products:[{type:ObjectId,ref:"Product"}],
    
    //we use object fr payment which can contain any type of payment info
    payment:{},

    //set buyer object fr storing buyers info
    buyer:{type:ObjectId, ref:"User"},

    //status fr the order, default value Not processed
    //enum contains the list of status types we can assign to the order
    status:{type:String, default:"Not processed",
    enum:["Not processed","Processing","Shipped","Delivered","Cancelled"],
    }

},{timestamps:true});

export default mongoose.model("Order",orderSchema);