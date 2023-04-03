import Jumbotron from "../components/cards/Jumbotron";
import axios from "axios";
import { useState,useEffect } from "react";
import ProductCard from "../components/cards/ProductCard";
import { useAuth
 } from "../context/auth";
import ".//style.css";

export default function Home() {

  const [products,setProducts]=useState([]);
  const [auth,setAuth]=useAuth();
  const [total,setTotal]=useState(0);
  const [page,setPage]=useState(1);
  const [loading,setLoading]=useState(false);


  useEffect(() => {
    loadProducts();
    getTotal();
  }, []);

  //execute loadMore button when page changes & page is set to dependency
  //normally the useeffect runs when the components mount (default) and also when page changes
  //and we dont want to do that since we already have the above code
  //Now, with this,only if the page value changes it will run 
  useEffect(()=>{
    if(page === 1) return;
    loadMore();
  },[page])

  const getTotal=async()=>{
    try{
      const {data}=await axios.get("/products-count");
      setTotal(data);
    }catch(err){
      console.log(err);
    }
  }

  const loadProducts=async ()=>{
    try{
      const {data}=await axios.get(`/list-products/${page}`);
      setProducts(data);

    }catch(err){
      console.log(err)
    }
  };

//to execute when page changes each time, also to keep the old page when new page loads
  const loadMore=async ()=>{
    try{
      setLoading(true);
      const {data}=await axios.get(`/list-products/${page}`);
      //keeping the old ones and append new ones using ...
      setProducts([...products,...data]);
      setLoading(false)

    }catch(err){
      console.log(err);
      setLoading(false)
    }
  };






    return (
      <div>
        <Jumbotron title={`Heya ${auth?.user?.name || 'Shopper'}!`}  
        subtitle="Welcome to the Mayhem Cart!" className="container-fluid jumbotron-intro" />

<div>
      <div class="row-full justify-content-between">
     <p>A little summary about Mayhem: "Mayhem is a kind of place where no human would ever dare to venture.
      Those who do, would end up in a river and in a state that you can't fathom to see. Only way to venture into the 
      Mayhem and come back alive is described in "Enter Mayhem". In Mayhem, you can find a lot of ancient places to 
      visit and artifacts to obtain by trade. To show a glimpse of the items, you can see the below artifacts sorted by 
      most recent ones. Not only trade is going in those places of Mayhem. But a lot more darkness surrounded places are there. 
      It wouldn't be interesting to say it in words. You can only understand it when you see..""
     </p>
</div>



    <div className="row">
          <div className="col-md-12 col-sm-12 col-xs-12 col-lg-12">

          <h2 className="p-3 mt-2 mb-2 h4 bg-light text-center intro">New Artifact Arrivals</h2>

                <div className="row">
                {products?.map(p => (
                        <div className="p-1 col-md-3 col-sm-6 col-xs-6 col-lg-3" key={p._id}>
                        <ProductCard p={p} />
                        </div>
                ))}

                </div>

          </div>
       
    </div>
    </div>

        <div className="container text-center">

            {products && products.length<total && (
              <button className="btn btn-lg col-md-6 mb-2"
              style={{color:"white",backdropFilter:"blur",borderColor:"white",
            borderRadius:"20px white",
            backdropFilter: "blur(90px)"}}
              disabled={loading}
              onClick={e=>{
                e.preventDefault();
                setPage(page+1);
              }}>
              {loading? "Loading...":"Load more"}

              </button>
            )}  

              </div>
    
      </div> 
    );
  }
  