import {Badge} from "antd";
import { Navigate, useNavigate } from "react-router-dom";
import {useCart} from '../../context/cart'
import toast from 'react-hot-toast';


export default function ProductCard({p}){
  //context
  const [cart,setCart]=useCart();
  
  //hooks

  const navigate=useNavigate();

    return(

        <div 
        className="card mb-3 hoverable"
        style={{borderRadius:"20px"}}>
          
          <Badge.Ribbon text={`${p?.sold} sold`} color="red">
            <Badge.Ribbon text={`${p?.quantity >=1 ? 
            `${p.quantity} In stock`:'Out of stock'}`} 
                        color="green" placement="start">
                        <img className="card-img-top"
                        src={`${process.env.REACT_APP_API}/product/photo/${p._id}`} alt={p.name}
                            style={{height:"275px",objectFit:"cover",borderRadius:"20px"}} />
            </Badge.Ribbon>
          </Badge.Ribbon>

             <div className="card-body">
                <h5>{p?.name}</h5>

                <h4 className="fw-bold">{p?.price?.toLocaleString("INR",{
                    style:'currency',
                    currency:'INR'
                })}</h4>


                <p className="card-text">{p?.description?.substring(0,100)}...</p>
             </div>

             <div className="d-flex justify-content-between">
                <button className="btn btn-primary col card-button"
                onClick={()=> navigate(`/product/${p.slug}`)}>
                    View Artifact
                </button>
                <button className="btn btn-outline-primary col card-button"
                onClick={()=> {


                  try{
                    if(p?.quantity>0){
                      setCart([...cart,p]);
                  localStorage.setItem("cart",JSON.stringify([...cart,p]))
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


    )
}