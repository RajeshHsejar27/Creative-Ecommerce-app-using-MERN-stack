import Category from "../models/category.js";
import slugify from "slugify";  //used to hyphenate spaced words in url
import Product from "../models/product.js";
//creating a category
export const create = async(req,res)=>{
    try{
        //destructuring name,valiadation
        const {name}=req.body;
        if(!name.trim()){
            return res.json({error:"Name is required!"});
        }
        //checking if there is an existing category with that name
        const existingCategory = await Category.findOne({name});
        if(existingCategory){
            return res.json({error:"Already exists!"});
        }
        //if not, creating the category and saving it in database
        //slug is used fr slugifying the name..ex: node js->node-js
        const category=await new Category({name,slug:slugify(name)}).save();
        //sending the response
        res.json(category);
    }
    catch(err)
    {
        console.log(err);
        return res.status(400).json(err);
    }
}

//updating a category
export const update=async(req,res)=>{
    try{
        const {name}=req.body;
        const {categoryId}=req.params;
        const category=await Category.findByIdAndUpdate(categoryId,{
            name,
            slug:slugify(name),
        },
        //new : true is used to send the updated category, if not used,
        //the response will be sent,but it will be of the unupdated previous category
        {new:true});
        res.json(category);
    }catch(err){
        console.log(err);
        return res.status(400).json(err.message);
    }
}

//removing a category
export const remove=async(req,res)=>{
    try{
        const removed=await Category.findByIdAndDelete(req.params.categoryId);
        res.json(removed);
    }catch(err){
        console.log(err);
        return res.status(400).json(err.message);
    }
}

//returning all the categories
export const list=async(req,res)=>{
    try{
        const all=await Category.find({});
        res.json(all);
    }catch(err){
        console.log(err);
        return res.status(400).json(err.message);
    }
}

export const read=async(req,res)=>{
    try{
        //returning a single category based on the slug name
        const category=await Category.findOne({slug:req.params.slug});
        res.json(category);
    }catch(err){
        console.log(err);
        return res.status(400).json(err.message);
    }
}

export const productsByCategory=async(req,res)=>{
    try{
        const category=await Category.findOne({slug:req.params.slug});
        const products=await Product.find({category}).populate("category");

        res.json({
            category,
            products,
        });

    }catch(err){
        console.log(err)
    }
}