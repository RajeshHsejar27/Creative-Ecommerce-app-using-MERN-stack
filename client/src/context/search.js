import { useState,createContext,useContext,useEffect } from "react";



const SearchContext =createContext(); //creating context

//we are destructuring as children components/props,all the components are recieved here and context will be wrapping the entire app
const SearchProvider=({children})=>{
    const [values,setValues]=useState({
        keyword:'',
        results:[],
    });



     //need provider as well
return( //we provide auth,setAuth as value to the provider to make all the entire app access this state
    <SearchContext.Provider value={[values,setValues]}>
        {children}
    </SearchContext.Provider>
);
};

const useSearch=()=>useContext(SearchContext);
//exporting useAuth (our own hook) which returns the context using useContext , fr accessing auth,setAuth
//exporting the provider to wrap the entire app
export {useSearch,SearchProvider};