import express from "express";                      //server
import { register, login, secret,updateProfile,getOrders,allOrders } from "../controllers/auth.js"; //controllers

const router=express.Router();

//middlewares
import { requireSignin, isAdmin } from "../middlewares/auth.js";
router.post('/register',register);
router.post('/login',login);
router.post('/secret',requireSignin,isAdmin,secret);
router.get('/auth-check',requireSignin,(req,res)=>{
    res.json({ok:true});
});
//checking for admin in the route check for log in
router.get('/admin-check',requireSignin,isAdmin,(req,res)=>{
    res.json({ok:true});
});
router.put('/profile',requireSignin,updateProfile);


//testing routes
//requireSignin is used here to acces req.user
//we can get the user info since we used requireSignin middleware
//if we have another route and dont have this middleware, we cant get the req.user info
router.get('/secret',requireSignin,isAdmin,secret);

//orders
router.get('/orders',requireSignin,getOrders);
router.get('/all-orders',requireSignin,isAdmin,allOrders);

export default router;