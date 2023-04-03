import Product from "../models/product.js";
import fs from "fs";
import slugify from "slugify";
import dotenv from 'dotenv';
import Order from "../models/order.js";


dotenv.config();


export const create= async(req,res)=>{
    try{
    // console.log(req.fields);
    // console.log(req.files);
    //starting destructure
    const {name,description,price,category,quantity,shipping}=req.fields;
    //the name photo should be same as that on the post request
    const {photo}=req.files;

    //validation of product details before saving it in database
    switch(true){
        case !name.trim():
        return    res.json({error:"Name is required!"});
        case !description.trim():
        return    res.json({error:"Description is required!"});
        case !price.trim():
        return    res.json({error:"Price is required!"});
        case !category.trim():
        return    res.json({error:"Category is required!"});
        case !quantity.trim():
        return    res.json({error:"Quantity is required!"});
        case !shipping.trim():
        return    res.json({error:"Shipping is required!"});
        case photo && photo.size>1048576:
        return    res.json({error:"Image should be less than 1MB in size!"});
              
    }

    //create product
    const product=new Product({...req.fields,slug:slugify(name)});

    if(photo){
        //using filesystem to read the photo synchronously to get the path info
        //sync is used since the photo should be retrieved fully inorder to access data
        product.photo.data=fs.readFileSync(photo.path);
        product.photo.contentType=photo.type;
    }

    await product.save();
    res.json(product);
        
    }
    catch(err)
    {
        console.log(err);
            return res.status(400).json(err.message);
        
    }
};



export const list=async(req,res)=>{
    try{
        //to make the search of the product faster,we use productid to find the photo
        //here select is used to find every info except photo
        //limiting the search product query to 12
        const products=await Product.find({})
        .populate("category")   //we saved the objectId so that now we can populate
        .select("-photo")
        .limit(12)
        .sort({createdAt:-1});

        res.json(products);
    }catch(err){
        console.log(err);
    }
}

export const read= async(req,res)=>{
    try{
        const product=await Product.findOne({slug:req.params.slug})
        .select('-photo')
        .populate("category");

        res.json(product)

    }
    catch(err){
        console.log(err)
    }
}


export const photo= async(req,res)=>{
    try{
        const product=await Product.findById(req.params.productId)
        .select('photo');
       //checking if there is a photo fr the product
        if(product.photo.data){
            //response sent with respect to the content type
            res.set('Content-Type',product.photo.contentType);
            return res.send(product.photo.data);    
        }
        res.json(product)

    }
    catch(err){
        console.log(err)
    }
}

export const remove= async(req,res)=>{
    try{
        const product=await Product.findByIdAndDelete(req.params.productId)
        .select('-photo');
        res.json(product)

    }
    catch(err){
        console.log(err)
    }
}

export const update= async(req,res)=>{
    try{

    //starting destructure
    const {name,description,price,category,quantity,shipping}=req.fields;
    //the name photo should be same as that on the post request
    const {photo}=req.files;

    //validation of product details before saving it in database
    switch(true){
        case !name.trim():
            res.json({error:"Name is required!"});
        case !description.trim():
            res.json({error:"Description is required!"});
        case !price.trim():
            res.json({error:"Price is required!"});
        case !category.trim():
            res.json({error:"Category is required!"});
        case !quantity.trim():
            res.json({error:"Quantity is required!"});
        case !shipping.trim():
            res.json({error:"Shipping is required!"});
        case photo && photo.size>1048576:
            res.json({error:"Image should be less than 1 MB in size!"});
              
    }

    //update product
    const product=await Product.findByIdAndUpdate(req.params.productId,{
        ...req.fields,slug:slugify(name),
    },
    {
        new:true    //to send back to client
    });


    if(photo){
        //using filesystem to read the photo synchronously to get the path info
        //sync is used since the photo should be retrieved fully inorder to access data
        product.photo.data=fs.readFileSync(photo.path);
        product.photo.contentType=photo.type;
    }
    //saving with the updations
    await product.save();
    res.json(product);
        
    }
    catch(err)
    {
        console.log(err);
            return res.status(400).json(err.message);
        
    }
};

export const filteredProducts=async (req,res)=>{
    try{
        const {checked,radio}=req.body;
        //here we are getting the input from body .ie.theh checked and radio
        //and then based on that we make args object,based on the  obj we are trying to find the product
        let args={};
        if(checked.length>0) args.category=checked;
        if(radio.length) args.price={$gte:radio[0],$lte:radio[1]};
        console.log(args);

        const products=await Product.find(args);
        // console.log('products found in  filtered products query ',products.length)
        res.json(products)

    }catch(err){
        console.log(err)

}
}

export const productsCount=async (req,res)=>{
    try{
        //here we are getting the products count from server side inorder to pagination to load more products
        //there is a func called estimated doc count, which can be used to fetch the no. of docs from database
        const total=await Product.find({}).estimatedDocumentCount();
        res.json(total);

    }catch(err){
console.log(err)
    }
}

//can be tested via http://localhost:8000/api/list-products/1
export const listProducts=async (req,res)=>{
    try{
        //deciding how many products we want to send as a response 
        const perPage=4;
        const page=req.params.page? req.params.page:1;
        //here each time u make a req it skips 6 (or count mentioned in perPage) products and limits 6 each time and even sort as well based on date
        const products=await Product.find({})
        .skip((page-1)*perPage)
        .limit(perPage)
        .select('-photo')
        .sort({createdAt:-1});    

        res.json(products);
    }catch(err){
      console.log(err)  
    }
}


export const productsSearch=async(req,res)=>{
    try{
        //finding keyword in the name or description
        const {keyword}=req.params;
        //using a mongodb special query function to find by name or description
        //also using regex to ignore uppercase or lowercase
        //we are making sure to exclude photo since it takes a lot of time to load the img array buffer
        const results=await Product.find({
            $or:[
                {name:{$regex:keyword,$options:"i"}},
                {description:{$regex:keyword,$options:"i"}}
            ],
        }).select("-photo");

        res.json(results);
    }catch(err){
        console.log(err)
    }
}

export const relatedProducts=async(req,res)=>{
    try{
const {productId,categoryId}=req.params;
const related = await Product.find({
    //
    category:categoryId,
    // this productid will not be included,function by mongoose
    _id:{$ne:productId},
}).select("-photo").populate('category').limit(3);
res.json(related);
    }catch(err){
        console.log(err)
    }
}





export const processPayment=async(req,res)=>{
    try{
                            const {cart}=req.body;
                            let total=0;
                            //mapping through cart since it has more than one items
                            cart.map((i)=>{
                                total += i.price;

                            }
                            );

                            const result={success:true};
                                    const order=new Order({
                                        products:cart,
                                        payment:result,
                                        buyer:req.user._id,
                                    }).save();

                                    //using a function to update the stock to decrease the quantity
                                    decrementQuantity(cart);

                                        res.json({ok:true})
       
    }catch(err){
        console.log(err)
    }

}


const decrementQuantity=async(cart)=>{
    try{
        //build mongodb query
        //putting a complicated query in a variable
        //map through cart and update each of them using filter function
        //and update quantity and sold
        //increment sold and decrement quantity
            const bulkOps=cart.map((item)=>{
                return{
                    updateOne:{
                        filter:{_id:item._id},
                        update:{$inc:{quantity:-1,sold:+1}},
                    },
                };
            });

            //writing the bulk updations to the database
           const updated=await Product.bulkWrite(bulkOps,{});
        //    console.log("bulk updated",updated) ;

    }catch(err){
        console.log(err);
    }
}

export const orderStatus=async(req,res)=>{
    try{
        //populating buyer's mail  and name here inorder to send the mail regarding shipping
        const {orderId}=req.params;
        const {status}=req.body;
        const order=await Order.findByIdAndUpdate(orderId,{status},
            {new:true}).populate(
            'buyer','email name');

        
        res.json(order);
    }catch(err){
        console.log(err);
    }
}