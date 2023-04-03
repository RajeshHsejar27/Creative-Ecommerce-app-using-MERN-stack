import moment from 'moment';
import { useCart } from '../../context/cart';
import ".//style.css"

//passing the props remove to remove the button in the order history
export default function ProductCardHorizontal({p,remove=true}){

    //context
    const [cart,setCart]=useCart();

    const removeFromCart=(productId)=>{
        //spread out all items from cart context
        //then go through the array and find the index of the item we need to remove
        let myCart=[...cart];
        let index=myCart.findIndex((item)=> item._id === productId);
        myCart.splice(index,1);
        setCart(myCart);
            localStorage.setItem('cart',JSON.stringify(myCart));
            }


    return(

        <div 
        className="card mb-3" 
        // style={{maxWidth:540}}
        > 
        
        <div className="row g-0">
            <div className="col-md-4 pic" >
                <img src={`${process.env.REACT_APP_API}/product/photo/${p._id}`}
                alt={p.name}
                style={{height:'150px',
                width:'180px',
                objectFit:"cover",
                marginLeft:"-12px",
                borderRadius:"30px"}}
                />
            </div>
            <div className="col-md-8">

                <div className="card-body pcard">

                    <h2 className="card-title">{p.name}{"   "}
                    {p?.price?.toLocaleString("INR",{
                        style:'currency',
                        currency:'INR'
                    })}</h2>
                    <p className="card-text">
                        {`${p?.description?.substring(
                            0,100
                            )}..`}                                           
                    </p>
                   

                    </div>

                </div>

                <div className="d-flex justify-content-between">
                <p className="card-text">
                       <h4 className="text-muted">
                        Listed {moment(p.createdAt).fromNow()}
                        </h4>                                         
                    </p>
                       
                       {/* //using conditional rendering to hide the reomve button on order screen
                       //and it will show by default on cart screen */}
                       { remove && (
                             <p className="text-danger mb-2 pointer" 
                             // passing only the id of the product to remove it
                             onClick={()=> removeFromCart(p._id)}>
                                 Remove
                             </p>

                       )

                       }

                    </div>
           </div>     

        </div>
    )
}