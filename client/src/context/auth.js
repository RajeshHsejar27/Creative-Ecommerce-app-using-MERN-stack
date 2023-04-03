import { useState,createContext,useContext,useEffect } from "react";
import axios from "axios";


const AuthContext =createContext(); //creating context
//we are destructuring as children components/props,all the components are recieved here and context will be wrapping the entire app
const AuthProvider=({children})=>{
    const [auth,setAuth]=useState({
        user:null,
        token:"",
    });


    //axios config
    axios.defaults.baseURL=process.env.REACT_APP_API;
    //send value of authorization if available
    //since we are doing this in the auth context, it will work
    //we can remove the url from all other requests since we are checking globally here
    axios.defaults.headers.common["Authorization"]=auth?.token;

    //using useEffect to check if there is any auth data present in the local storage and populating our context with it
    //using this hook when the app mounts and components mounts
    //this takes function as argument
    //first argument=arrow function,second argument=dependency arrays which we leave to default
    useEffect(()=>{
        //accessing localstorage to fetch the data
        const data=localStorage.getItem('auth');
        //if the auth data exists, we will grab it and put it in the state
        if(data){
            const parsed=JSON.parse(data);
            setAuth({...auth,user:parsed.user,token:parsed.token});
        }
    },[]
    
    )
     //need provider as well
return( //we provide auth,setAuth as value to the provider to make all the entire app access this state
    <AuthContext.Provider value={[auth,setAuth]}>
        {children}
    </AuthContext.Provider>
);
};

const useAuth=()=>useContext(AuthContext);
//exporting useAuth (our own hook) which returns the context using useContext , fr accessing auth,setAuth
//exporting the provider to wrap the entire app
export {useAuth,AuthProvider};