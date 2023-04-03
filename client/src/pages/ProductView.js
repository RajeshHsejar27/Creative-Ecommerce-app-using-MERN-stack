import { useEffect,useState } from "react";
import moment from "moment";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Badge } from "antd";
import { FaRupeeSign,FaProjectDiagram,FaRegClock,FaCheck,FaTimes,
FaTruckMoving,FaWarehouse,FaRocket } from "react-icons/fa";
import ProductCard from "../components/cards/ProductCard";
import { toast } from "react-hot-toast";
import { useCart } from "../context/cart";

export default function ProductView(){
    //state
    const [product,setProduct]=useState({});
    const [related,setRelated]=useState([]);

    //context
    const [cart,setCart]=useCart();

    //hooks
    const params=useParams();

    useEffect(()=>{
        if(params?.slug) loadProduct();
    },[params?.slug])

    const loadProduct=async (req,res)=>{
        try{
            const {data}=await axios.get(`/product/${params.slug}`);
            setProduct(data);
            loadRelated(data._id,data.category._id);
        }catch(err){
            console.log(err)
        }
    }

    const loadRelated=async(productId,categoryId)=>{
        try{
            const {data}= await axios.get(
                `/related-products/${productId}/${categoryId}`
            );
            setRelated(data);
        }catch(err){
            console.log(err);
        }
    }

    return (

       <div className="container-fluid">
        <div className="row">
            <div className="col-md-9">

            <div 
        className="card mb-3"
        style={{borderRadius:"20px"}}>
          
          <Badge.Ribbon text={`${product?.sold} sold`} color="red">
            <Badge.Ribbon text={`${product?.quantity >=1 ? 
            `In stock`:'Out of stock'}`} 
                        color="green" placement="start">
                        <img className="card-img-top"
                        src={`${process.env.REACT_APP_API}/product/photo/${product._id}`} alt={product.name}
                            style={{height:"550px",width:"100%",objectFit:"cover",borderRadius:"20px"}} />
            </Badge.Ribbon>
          </Badge.Ribbon>

             <div className="card-body">
                <h1 className="fw-bold">{product?.name}</h1>

                <p className="card-text lead">{product?.description}</p>
             </div>

             <div className="d-flex justify-content-between lead p-5 bg-light fw-bold">
                <div>
                    <p>
                        <FaRupeeSign />{" "}
                        Gold needed:{" "}
                        {product?.price?.toLocaleString("INR",{
                    // style:'currency',
                    currency:'INR'
                     })}
                        </p>

                        <p><FaProjectDiagram />{" "}
                         Category:{" "}{product?.category?.name}

                        </p>
                        <p>
                            <FaRegClock />{" "}
                             Origin: {" "}{moment(product.createdAt).fromNow()}
                        </p>
                        <p>{" "}
                        {product?.quantity>0?<FaCheck />:<FaTimes />}
                        {" "}
                        {product?.quantity>0?"In stock":"Out of stock"}
                        </p>
                        <p>
                            <FaWarehouse /> {" "}Available {" "}{product?.quantity}
                        </p>
                        <p>
                            <FaRocket />{" "}Sold
                            {" "}{product.sold}
                        </p>
                </div>

             </div>

             
                <button className="btn btn-outline-primary col card-button"
                 onClick={()=> {
                    try{
                        if(product?.quantity>0){
                            setCart([...cart,product]);
                        toast.success("Added to Cart!")
                        }else{
                            toast.error("Artifact Out of Stock!");
                        }
                    }catch(err){
                        toast.error("Can't add to Cart. Try again!");
                    }
                    
                  }}>
                    Add to Cart
                </button>
          

      </div>


            </div>

            <div className="col-md-3">
                <h2 style={{color:"white"}}>Related Artifacts</h2>
                <hr  style={{color:"white"}}/>
                        {related?.length < 1 && <p style={{color:"white"}}> No similar artifacts found! </p>}
                        {related?.map((p)=>(
                            <ProductCard p={p} key={p._id} />
                        ))}

                {/* <pre>{JSON.stringify(related,null,4)}</pre> */}
            </div>
        </div>
       </div>
    )
}