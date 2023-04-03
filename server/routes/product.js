import express from "express";    
import formidable from "express-formidable";


const router=express.Router();

//middlewares
import { requireSignin, isAdmin } from "../middlewares/auth.js";

//controllers
import {create,
    list,
    read,
    photo,
    remove,
    update,
    filteredProducts,
    productsCount,
    listProducts,
    productsSearch,
    relatedProducts,processPayment,
    orderStatus,} from "../controllers/product.js";

//crud operations on product
//formidable applied as middleware
router.post('/product',requireSignin,isAdmin,formidable(),create);
router.get('/products',list);
router.get('/product/:slug',read); //public route-so no more middleware
router.get('/product/photo/:productId',photo); //get the product's photo
router.delete('/product/:productId',requireSignin,isAdmin,remove); //delete a product
router.put('/product/:productId',requireSignin,isAdmin,formidable(),update); 
router.post('/filtered-products',filteredProducts); 
router.get('/products-count',productsCount); 
router.get('/list-products/:page',listProducts);
router.get('/products/search/:keyword',productsSearch);
router.get('/related-products/:productId/:categoryId',relatedProducts);


//to update a product,make sure to use formidable,else not works asintended

//updating order status and fetching from db
router.put('/order-status/:orderId',requireSignin,isAdmin,orderStatus);
router.post('/payment',requireSignin,processPayment);

export default router;