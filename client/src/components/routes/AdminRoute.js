import { useEffect,useState } from "react";
import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth";
import Loading from "./Loading";
import axios from "axios";

export default function AdminRoute(){
    //context
    const [auth,setAuth]=useAuth();
    
    //state ,by default user is not logged in
    const [ok,setOk]=useState(false);

    //used to test the dashboard access a server response
    useEffect(()=>{
        const adminCheck=async()=>{

            // const {data}=await axios.get(`${process.env.REACT_APP_API}/auth-check`,
            // {
            //     headers:{
            //         Authorization:auth?.token
            //     },
            // });
            //Now,since we have configured axios globally in auth context,we can just remove the headers code

            //here performing an admin check inorder to access an admin privileged page
            const {data}=await axios.get(`/admin-check`);
            if(data.ok){
                setOk(true);
            }else{
                setOk(false);
            }
        };
        //checking for token before authCheck
       if(auth?.token) adminCheck();
    },[auth?.token]);


    ///here we are passing home in path since user is not intended to access admin page and will be redirected
    
    return ok?<Outlet /> : <Loading path="home" />;
}
