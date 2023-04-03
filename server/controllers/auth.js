import User from "../models/user.js"
import {hashPassword, comparePassword} from "../helpers/auth.js";
    //using these two functions to hash the passwd
import jwt from "jsonwebtoken";
    //used to securely transmit data between parties as json object
import dotenv from "dotenv";
    //taking jwt from .env file
import Order from "../models/order.js";

dotenv.config();
/**
 * stuff to take care bfore saving user to db
 * add validation
 * email-unique or not & hash passwd
 */
//during async use try and catch blocks fr resolving errors
//here when u make req, it will create user, save it in db, send u back the saved user info

export const register= async(req,res)=>{

    try{
    //destructure name, email, passwd from req.body.stuff
     //validate,email uniqueness, hash passwd, register user,send response
    const {name, email, password}=req.body;
    if(!name.trim()){
        return res.json({error:"What's your name? Nobody?!"});
        //ending here with return in response and the code below will not be executed
    }
    if(!email){
        return res.json({error:"This Email is already taken or can't be used!"});
        //ending here with return in response and the code below will not be executed
    }
    if(!password || password.length<6){
        return res.json({error:"Password must be atleast 6 characters long!"});
        //ending here with return in response and the code below will not be executed
    }

    //try to find if the email matches an existing user
   const existingUser=await User.findOne({email:email});
    if(existingUser){
        return res.json({error:"This Email is already taken!"})
    }

    //hashing passwd-plain passwd is taken as input and hashed
    const hashedPassword= await hashPassword(password);

    //registering user-req.body.stuff not used here since we done destructuring and validation
    //await used to wait till the process is completed
    const user=await new User({
        name,
        email,
        password:hashedPassword
    }).save();

    //create signed jwt-while creating the token, this used the id info from the user
    //created at the before step & the data can be extracted later
    //setting the token here to last for 7 days
    const token=jwt.sign({_id:user._id},process.env.JWT_SECRET,
        {expiresIn:'7d'})

    //sending response except passwd
    res.json({
        user:{
            name:user.name,
            email:user.email,
            role:user.role,
            address:user.address,
        },
        token,
    });

    //    const user= await new User(req.body).save();
    //    //creating new instance of user and saving it, the info is fetched from body
    //     //u can find the parameter 'role:0' in the body after the post req which we gave fr the user
    //     //also the timestamp and mongodb id can be found in the body
    //     res.json(user);

    }catch(err){
        console.log(err);
    }
};

//using the above code with some modifications fr the login function
export const login= async(req,res)=>{

    try{
    //destructure  email, passwd from req.body.stuff
     //validate,email uniqueness, hash passwd, register user,send response
     //here no need fr checking name since we need only email and passwd fr checking login
    const { email, password}=req.body;

    if(!email){
        return res.json({error:"Email is taken!"});
        //ending here with return in response and the code below will not be executed
    }
    if(!password || password.length<6){
        return res.json({error:"Password must be atleast 6 characters long!"});
        //ending here with return in response and the code below will not be executed
    }

    //try to find if the email matches an existing user in database
   const user=await User.findOne({email:email});
    if(!user){
        return res.json({error:"You dont belong here now. Register first!"})
    }

    //if user is found, compare passwd this time
    //giving plain passwd and hashed one from the database as arguments
    const match= await comparePassword(password,user.password);
    if(!match){
        return res.json({error:"Wrong password! If forgot password, contact Hsejar!"});
    }

    //create signed jwt-while creating the token, this used the id info from the user
    //created at the before step & the data can be extracted later
    //setting the token here to last for 7 days
    const token=jwt.sign({_id:user._id},process.env.JWT_SECRET,
        {expiresIn:'7d'})

    //sending response except passwd
    res.json({
        user:{
            name:user.name,
            email:user.email,
            role:user.role,
            address:user.address,
        },
        token,
    });

    //    const user= await new User(req.body).save();
    //    //creating new instance of user and saving it, the info is fetched from body
    //     //u can find the parameter 'role:0' in the body after the post req which we gave fr the user
    //     //also the timestamp and mongodb id can be found in the body
    //     res.json(user);

    }catch(err){
        console.log(err);
    }
};

//u can get the req.user info since u used the requireSignin middleware in the router.get("/secret")
export const secret=async(req,res)=>{
    res.json({currentUser:req.user});
}

export const updateProfile=async(req,res)=>
{
    try{

        //none of the update fields is mandatory,but if we get
        //any new input data,we update it to the database


       const {name,password,address}=req.body;
       const user=await User.findById(req.user._id);
       //check password length if they type a password for updating profile
       if(password && password.length <6){
        return res.json({error:"Passowrd is required and should be minimum 6 characters long",})
       }
       //hash the password
       //if we get password , we await to hash the password..and if we dont get the password,we will set 
       //it as undefined and that will not saved in the database
       const hashedPassword=password? await hashPassword(password): undefined;

       //third argument new is used to get updated data
       const updated=await User.findByIdAndUpdate(req.user._id,{
        name:name || user.name,
        password:hashedPassword || user.password,
        address:address || user.address,
       },{new:true});

       //not sending the password to the database 
       updated.password=undefined;
       res.json(updated);

    }catch(err){
        console.log(err)
    }
}


export const getOrders=async (req,res)=>{
    try{
        //find orders from the databse specific to the buyer
        //that is got from the logged in user
        //populating the fields to get the info, except photo buffer
        //second populate used fr getting buyers info on the order and also only
        //showing their name
        const orders=await Order.find({buyer:req.user._id}).populate(
            "products",
            "-photo"
        ).populate("buyer","name");
        
        res.json(orders);

    }catch(err){
        console.log(err);
    }
}


export const allOrders=async (req,res)=>{
    try{
        //find all the orders from the database
        const orders=await Order.find({}).populate(
            "products",
            "-photo"
        ).populate("buyer","name")
        .sort({createdAt:"-1"});
        res.json(orders);
        

    }catch(err){
        console.log(err);
    }
}

