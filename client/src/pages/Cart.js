import { useCart } from "../context/cart";
import Jumbotron from "../components/cards/Jumbotron";
import { useAuth } from "../context/auth";
import { json, useNavigate } from "react-router-dom";
import UserCartSidebar from "../components/cards/UserCartSidebar";
import ProductCardHorizontal from "../components/cards/ProductCardHorizontal";
import ".//style.css";

export default function Cart(){
    //context
    const [cart,setCart]=useCart();
    const [auth,setAuth]=useAuth();

    //hooks
    const navigate=useNavigate();

   


      



    return(
        <>
        <Jumbotron title={`Came to see your cart, ${auth?.token && auth?.user?.name || 'Shopper'}?!`}
        subtitle={cart?.length?`You have ${cart?.length} items in the cart. ${auth?.token?'':'Enter the Mayhem to purchase the Artifacts'}`
        :"Your cart is empty"} 
        className="container-fluid jumbotron-cart"/>


        <div className="container-fluid">
        <div class="row-full justify-content-between">
     <p>The Cart is a special place in Mayhem cart where your cart items are listed. Look through carefully on your selected list of artifacts and the total gold coins 
        needed for the trade since you definitely would not want to waste your gold on buying more than needed. When you are ready, finish the trade with the options provided. 
        You need to be inside the Mayhem inorder to finish the trade!
     </p>
    </div>

            <div className="row">
                <div className="col-md-12">
                    <div className="p-3 mt-2 mb-2 h4 bg-light text-center cart">
                        {cart?.length ? ( 'My Cart'):( 
                        <div className="text-center">
                            <button className="btn btn-primary"
                            onClick={()=> navigate("/")}>
                                Continue looking for Artifacts!
                            </button>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>

        {cart?.length && (
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <div className="row">
                        {cart?.map ((p,index)=>(
                           <ProductCardHorizontal key={index} p={p} />
                        ))}
                        </div>
                    </div>
                   <UserCartSidebar />
                </div>
            </div>
        )
        
        
        }
        
        </>
    )
}