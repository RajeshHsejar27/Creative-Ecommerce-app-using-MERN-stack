import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart";
import { useEffect,useState } from "react";
import axios from "axios";
import toast from 'react-hot-toast';
import ".//style.css";
import QR from '../images/qrcode.jpeg';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function UserCartSidebar(){

    //context
    const [auth,setAuth]=useAuth();
    const [cart,setCart]=useCart();

    //state
    const [loading,setLoading]=useState(false);
    const [show, setShow] = useState(false);
   

    //hooks 
    const navigate=useNavigate();

    //functions in modal
    const handleClose = () => setShow(false);
     const handleShow = () => setShow(true);

    const cartTotal=()=>{

        let total=0;
        cart.map((item)=>{
            total+=item.price;
            
        });
        return total.toLocaleString("INR",{
            style:"currency",
            currency:"INR",
        });
       
    }
    


        const handleBuy=async()=>{
        try{
            setLoading(true);
            const {data}=await axios.post('/payment',{cart,});
            setLoading(false);
            //clearing the cache in localstorage abt on cart items
            localStorage.removeItem("cart");
            setCart([]);
            navigate('/dashboard/user/orders');
            toast.success("Payment successful!");
        }catch(err){
            console.log(err);
            setLoading(false);
        }
    }

    return(
                

             <div className="col-md-4 mb-5 carti">
                    <h4 style={{color:"white"}}>Your Cart inventory:</h4>
                   <h6 style={{color:"white"}}>Total gold / Address / Trade Options</h6> 
                    <hr style={{color:"white"}} />
                    <h6 style={{color:"white"}}>Total gold required: {cartTotal()}</h6>

                    {auth?.user?.address? (
                        <>
                        <div className="mb-3">
                            <hr />
                            <h4 style={{color:"white"}}> Delivery Address: </h4>
                            <h5 style={{color:"white"}}>{auth?.user?.address}</h5>

                        </div>
                        <button
                        className="btn btn-outline-light"
                        onClick={()=> navigate("/dashboard/user/profile")}>
                            Update Address
                        </button>
                        </>
                    ) :(
                        <div className="mb-3">
                            {/* if the user did not have address,
                            1.user should login and add the address
                            2.or we ask to  login to checkout */}
                            {auth?.token ? (
                                <button className="btn btn-outline-light"
                                onClick={()=> navigate("/dashboard/user/profile")}
                                >Add a delivery address</button>
                            ):(
                                <button className="btn btn-outline-light mt-3"
                                onClick={()=> navigate("/login",
                                {state:"/cart",}
                                )}
                                >Enter Mayhem to finish trade!</button>  
                            )}
                        </div>
                    )}

                             
                                    <div className="mt-3">
                                    {!auth?.user || !cart?.length ? '': <>
                                    <h4 style={{color:"white"}}>Update the address before proceeding to trade!</h4><hr  style={{color:"white"}}></hr>
                                    <p style={{color:"white",fontSize:"15px"}}>Compare the availability of the artifact in stock and selected count 
                                     before proceeding payment. Since the stock isn't updated until a purchase has been made,
                                   you can add infinite items. But don't be stupid like that since you will get only the available stock 
                                   and a refund for the remaining quantity.</p>
                                    <h4 style={{color:"white"}}>Tap the below button to finish the trade!</h4>
                                    <button className="btn btn-outline-light mt-3"
                                        onClick={handleShow}
                                        disabled={!auth?.user?.address || loading}
                                        >{loading ? "Processing..." : "Let's trade!"}</button>  

                                    <Modal
                                            show={show}
                                            onHide={handleClose}
                                            backdrop="static"
                                            keyboard={false}
                                        >
                                            <Modal.Header closeButton>
                                            <Modal.Title>Trading on Artifacts</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                           <img src={QR} style={{display:"block",marginLeft:"auto",marginRight:"auto",width:"50%"}} alt="qr code" /><hr></hr>
                                           <h5 style={{color:"black"}}> <u> <b> Trading instructions: </b> </u> </h5>
                                           <h6 style={{color:"black"}}>
                                            <ul>
                                            <li> Scan the QR code from your GPAY to finish the trade and make sure to enter the
                                           correct amount of the purchase which is clearly shown in the cart total.</li>
                                           <li>After the successful payment, YOU MUST CLICK 
                                           THE "TRADE DONE!" button so that it will invoke some functions and the Merchant can update the stocks and also update your order and post the 
                                           status of your order through mail (Given that the email is correct).</li> 
                                           <li>Your order will be processed,shipped and delivered through the Wagon of Mayhem.</li> 
                                            </ul>
                                           <hr></hr>
                                            Incase if you want to pay later and just stalking, click the "Will trade by later!" button.
                                            <hr></hr>
                                            If you give "Trade done!" when u actually didnt and mess up with my program logic,believe me,I will know,I will find u and kick ur ass.Thank you,have a nice day!
                                            </h6>
                                            </Modal.Body>
                                            <Modal.Footer>
                                            <Button variant="secondary" onClick={handleClose}>
                                                Will trade by later!
                                            </Button>
                                            <Button variant="primary" onClick={handleBuy}>Trade done!</Button>
                                            </Modal.Footer>
                                        </Modal>




                                        </>}
                                    </div>

                                  
                    </div>

    )
}
