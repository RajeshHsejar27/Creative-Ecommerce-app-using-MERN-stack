import { useState,useEffect } from "react";
import Jumbotron from "../components/cards/Jumbotron";
import axios from "axios";
import ProductCard from "../components/cards/ProductCard";
import Checkbox from "antd/es/checkbox/Checkbox";
import { prices } from "../prices";
import { Radio } from "antd";
import ".//style.css";

export default function Shop(){
    const [categories,setCategories]=useState([]);
    const [products,setProducts]=useState([]);
    const [checked,setChecked]=useState([]);
    const [radio,setRadio]=useState([]);



    useEffect(()=>{
        if(!checked.length || !radio.length)  loadProducts();
      },[])

      
    //whenever we have a change in the checked and radio,
    //we need to load the products
    //they dont run at start,only with the condition if that they have length
    useEffect(()=>{
        if(checked.length || radio.length) loadFilteredProducts();
    },[checked,radio])


const loadFilteredProducts=async()=>{
    try{
        const {data}= await axios.post("/filtered-products",{
            checked,radio,
        });
        console.log("filtered products=> ",data);
        setProducts(data);
    }catch(err){
        console.log(err);
    }


}


const loadProducts=async()=>{
    try{
        const {data}=await axios.get("/products");
        setProducts(data);

    }catch(err){
        console.log(err);
    }
};

useEffect(()=>{
    loadCategories();

},[]);

const loadCategories=async()=>{
    try{
        const {data}=await axios.get("/categories");
        setCategories(data);
    }catch(err){
        console.log(err);
    }
}

const handleCheck=(value,id)=>{
    let all=[...checked];
    if(value){
        all.push(id);
    }else{
        all=all.filter((c)=> c!== id);
    }
    setChecked(all);
}

return (
    <>
    <Jumbotron title="The Artifact Marketplace!" subtitle="Have a look at the available Artifacts!"
    className="container-fluid jumbotron-artifact"></Jumbotron>

    {/* <pre>{JSON.stringify(checked,null,4)}</pre> */}

    <div className="container-fluid">

    <div class="row-full justify-content-between">
     <p>The Artifact Marketplace is a special place in Mayhem where you can find the artifacts which might interest you.
        You can get to know more about an artifact by going to "View Artifact" and add it to your cart list if you want by "Add to Cart".
        The Marketplace has a wide variety of artifacts to exchange with gold coins.So what are you waiting for?!
     </p>
</div>

    <div className="row">
    <div className="col-md-3">
    <h2 className="p-3 mt-2 mb-2 h4 bg-light text-center category">
         Look by the Categories
         </h2>
         <div className="row blureff">
        {categories?.map((c)=>(
          <Checkbox key={c._id} className="blure"
          onChange={e => handleCheck(e.target.checked,c._id)} >
                {c.name}
            </Checkbox>  
        )
        )}          
    </div>    

        <h2 className="p-3 mt-2 mb-2 h4 bg-light text-center gold">
         Look by the cost of Gold
         </h2>
         <div className="row blureff">
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {prices?.map(p=>(
                    <div key={p._id} style={{marginLeft:"10px"}}>
                        <Radio value={p.array}>
                            {p.name}
                        </Radio>
                    </div>
                ))}              
                </Radio.Group> 
    </div>    

    <div className="p-5 pt-0">
        <button className="btn btn-outline-light col-12"
        onClick={()=> window.location.reload()}>
            Reset
        </button>
    </div>

    </div>  
    <div className="col-md-9 col-sm-12">
        <h2 className="p-3 mt-2 mb-2 h4 bg-light text-center artifact">
            {products?.length} Artifacts
            </h2>
    <div className="row" style={{height:"100vh",overflow:"scroll"}}>
        {products?.map((p)=>(
            <div className="col-md-3 col-sm-4 p-2" key={p._id}>
                <ProductCard p={p} />
                    
            </div>  
        )
        )}
                    
    </div>        
    </div>    
    </div>
    </div>
    
    
    </>
)
}