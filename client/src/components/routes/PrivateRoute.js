import { useEffect,useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth";
import Loading from "./Loading";
import axios from "axios";

export default function PrivateRoute(){
    //context
    const [auth,setAuth]=useAuth();
    
    //state ,by default user is not logged in
    const [ok,setOk]=useState(false);

    //used to test the dashboard access a server response
    useEffect(()=>{
        const authCheck=async()=>{

            // const {data}=await axios.get(`${process.env.REACT_APP_API}/auth-check`,
            // {
            //     headers:{
            //         Authorization:auth?.token
            //     },
            // });
            //Now,since we have configured axios globally in auth context,we can just remove the headers code

            const {data}=await axios.get(`/auth-check`);
            if(data.ok){
                setOk(true);
            }else{
                setOk(false);
            }
        };
        //checking for token before authCheck
       if(auth?.token) authCheck();
    },[auth?.token]);

    return ok?<Outlet /> : <Loading />;
}
