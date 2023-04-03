import jwt from "jsonwebtoken";
import User from "../models/user.js"



export const requireSignin=(req,res,next)=>{

    //verifying the authorization and token
    //decoded will have the info abt the user's id,token duration
    try{
        const decoded=jwt.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
            );
        
        //if token is verified we can will recieve info in req.user
        req.user= decoded;
        next();
    }catch(err){
        //sending error response when encounter error
        //401-unauthorized request
        return res.status(401).json(err);
    }

    // // console.log("REQ headers => ",req.headers);
    // next();
    // //if we dont use next then the code with get req will not execute
}

export const isAdmin=async(req,res,next)=>{
    //trying to find the role of the user from the db, is it Admin or not
    try{
        const user=await User.findById(req.user._id);
        if(user.role!==1){
            return res.status(401).send('Unauthorized!');
        }else{
            next();
        }
    }catch(err){
        console.log(err);
    }
}

//u can copy the token from the postman post request and can paste it in 
//the headers section in the get request and use the req.headers function to
//see the token in the headers