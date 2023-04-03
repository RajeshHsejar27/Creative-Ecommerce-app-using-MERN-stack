import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";
import { useEffect,useState } from "react";
import axios from "axios";
import ProductCardHorizontal from "../../components/cards/ProductCardHorizontal";
import moment from "moment";
import {Select} from 'antd';

//destructuring Option from Select to use it easily
const {Option}=Select;

export default function AdminOrders(){
   //context
   const [auth,setAuth]=useAuth();

   //state
   const [orders,setOrders]=useState([]);
   const [status,setStatus]=useState([
    "Not processed","Processing","Shipped","Delivered","Cancelled"
   ]);

   const [changedStatus,setChangedStatus]=useState("");

   useEffect(()=>{
    if (auth?.token) getOrders();
   },[auth?.token]);

   const getOrders=async()=>{
    try{
        const {data}=await axios.get("/all-orders");
        setOrders(data);
    }catch(err){
        console.log(err);
    }
   }

   //updating the status first and then requesting to backend to update
   const handleChange=async(orderId,value)=>{
    setChangedStatus(value);
    try{
        const {data}= await axios.put(`/order-status/${orderId}`,{status:value,});

        //once the status has been updated we make another req to refetch all the orders
        //to make them visible
        getOrders();
    }catch(err){
        console.log(err);
    }
   }

   return(
    <>
        <Jumbotron subtitle="All Orders" />
        
        <div className="container-fluid">
            <div className="row">
            <div className="col-md-3">
                <AdminMenu />
                </div>
                <div className="col-md-9">
                <div className="p-3 mt-2 mb-2 h4 bg-light">Orders</div>
                    <h3 style={{color:"white"}}>All Order History...</h3>
                   

                    {orders?.map((o,i)=>{
                        return(
                            <div key={o._id} className="border shadow bg-light rounded-4 bg mb-5">


                            <table className="table">

                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Status</th>
                                        <th scope="col">Buyer</th>
                                        <th scope="col">Ordered</th>
                                        <th scope="col">Payment</th>
                                        <th scope="col">Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{i+1}</td>
                                        <td>
                                    {/* //here we find the order id and update the status using a function */}
                                    {/* //since we are mapping through the orders we have access to order id */}
                                            <Select
                                            bordered={false}
                                            onChange={(value)=> handleChange(o._id,value)}
                                            defaultValue={o?.status}
                                            >
                                                {status.map((s,i)=>(
                                                    <Option key={i} value={s}>
                                                        {s}
                                                    </Option>
                                                ))}

                                            </Select>
                                            
                                        </td>
                                        <td>{o?.buyer?.name}</td>
                                        <td>{moment(o?.createdAt).fromNow()}</td>
                                        <td>{o?.payment?.success ? 'Success':'Failed'}</td>
                                        <td>{o?.products?.length} products</td>
                                    </tr>

                                </tbody>
                                </table>

                             <div className="container">
                                <div className="row m-2">
                                {o?.products?.map((p,i)=>(
                                    <ProductCardHorizontal key={i} p={p} remove={false}/>
                                ))}
                                </div>
                              </div>

                            </div>
                        )
                    })}

                    
                    </div>
            </div>
        </div>
        </>
   )
}