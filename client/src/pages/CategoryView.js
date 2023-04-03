import Jumbotron from "../components/cards/Jumbotron";
import { useState,useEffect } from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";
import ProductCard from "../components/cards/ProductCard";

//grab the value from route params that is the slug and make a req 
//to server to grab the categories




export default function CategoryView(){
    //state
    const [products,setProducts]=useState([]);
    const [category,setCategory]=useState({});
    //hooks
    const navigate=useNavigate();
    const params=useParams();

    useEffect(()=>{
        if(params?.slug) loadProductsByCategory();
    },[params?.slug]);

   const  loadProductsByCategory=async()=>{
    try{
        const {data}=await axios.get(`/products-by-category/${params.slug}`);
       
        setCategory(data.category);
        setProducts(data.products);
        // console.log(data)
       
      
    }catch(err){
        console.log(err)
    }
        
   }

    // console.log('params ',params)
    
    return(
        <>
       <Jumbotron title={category?.name}
        subtitle={`${products?.length} artifacts found in "${category?.name}"`}
        className="container-fluid jumbotron-category" />

        <div className="container-fluid">

        <div className="row mt-3 col-12">
            {products?.map((p)=>(
                <div key={p._id} className="col-md-3 col-sm-4 col-lg-3 col-xs-6">
                        <ProductCard p={p} />
                    </div>
            ))}

        </div>

        </div>
       </>
       )

}