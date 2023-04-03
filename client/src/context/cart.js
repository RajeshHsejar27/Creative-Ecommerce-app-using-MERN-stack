import { useState,createContext,useContext,useEffect } from "react";



const CartContext =createContext(); //creating context

//we are destructuring as children components/props,all the components are recieved here and context will be wrapping the entire app
const CartProvider=({children})=>{
    const [cart,setCart]=useState([]);

    //on mounting check fr anything abt cart in localstorage
    useEffect(()=>{
        let existingCart=localStorage.getItem("cart");
        if (existingCart) setCart(JSON.parse(existingCart));
    },[])



     //need provider as well
return( //we provide auth,setAuth as value to the provider to make all the entire app access this state
    <CartContext.Provider value={[cart,setCart]}>
        {children}
    </CartContext.Provider>
);
};

const useCart=()=>useContext(CartContext);
//exporting useAuth (our own hook) which returns the context using useContext , fr accessing auth,setAuth
//exporting the provider to wrap the entire app
export {useCart,CartProvider};