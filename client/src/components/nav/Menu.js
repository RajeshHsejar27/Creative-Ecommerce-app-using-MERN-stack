import { NavLink } from "react-router-dom";
import {useAuth} from "../../context/auth";
import { useNavigate } from "react-router-dom";
import Search from "../forms/Search";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import "./navbar.css";
export default function Menu(){
    //context
    const [auth,setAuth]=useAuth();
    const [cart,setCart]=useCart();
    //hooks
    const categories=useCategory();
    const navigate=useNavigate();

    // console.log('categories in menu ',categories);


    const logout=()=>{
        //removing user from context and localstorage
        setAuth({...auth,user:null,token:""});
        localStorage.removeItem('auth');
        navigate('/login');
    }

    return ( //here conditionally rendering the page according to their logged in status
    <>
    
    <ul className="nav d-flex justify-content-between shadow-sm mb-2 sticky-top " id="navbar">
    <li className="nav-item">
    <NavLink className="nav-link" aria-current="page" to="/">Intro</NavLink>
    </li>

    <li className="nav-item">
    <NavLink className="nav-link" aria-current="page" to="/shop">Marketplace</NavLink>
    </li>

    <div className="dropdown">

                    <li>
                        <a className="nav-link pointer dropdown-toggle"
                        data-bs-toggle="dropdown">
                        Categories</a>

                        <ul className="dropdown-menu"
                        style={{height:"300px",overflow:"scroll"}}>
                        
                        <li>
                            <NavLink className="nav-link" 
                            to={`/categories`}>All Categories</NavLink>
                            </li>

                        
                        {categories?.map((c)=>(

                            <li key={c._id}>
                            <NavLink className="nav-link" 
                            to={`/category/${c.slug}`}>{c.name}</NavLink>
                            </li>

                        ))}

                      
                        </ul>     
                    </li>
            </div>


            <li className="nav-item mt-1">
                            <Badge count={cart?.length>=1 ? cart.length:0|| 0} offset={[5,13]} showZero={true}>
                            <NavLink className="nav-link" aria-current="page" to="/cart">The Cart</NavLink>
                            </Badge>
               </li>


    
    <Search />
    

        {!auth?.user?( 
            <>
                <li className="nav-item">
                <NavLink className="nav-link" to="/login">Enter Mayhem</NavLink>
                </li>
                <li className="nav-item">
                <NavLink className="nav-link" to="/register">Apothecary</NavLink>
                </li>
            </>
        ):(

            <div className="dropdown">

                    <li>
                        <a className="nav-link pointer dropdown-toggle"
                        data-bs-toggle="dropdown">
                        {auth?.user?.name?.toUpperCase()}</a>

                        <ul className="dropdown-menu">
                        <li>
                        <NavLink className="nav-link" 
                        to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`}>CORE INSANITY</NavLink>
                        </li>

                        <li className="nav-item pointer">
                        <a onClick={logout} className="nav-link">Back to Sanity!</a>
                        </li>
                        </ul>     
                    </li>
            </div>
            
            )}
   
    
    </ul>

    </>
    );
    //nav-link gives active class name
}