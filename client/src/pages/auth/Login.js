import { useState } from "react";
import axios from "axios"; //http client
import toast from "react-hot-toast"; //fr toast notifications
import Jumbotron from "../../components/cards/Jumbotron";
//using jumbotron as intro card
import { useAuth } from "../../context/auth";
import { useNavigate,useLocation } from "react-router-dom";
import ".//style.css";


export default function Login() {
  //state
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');

  //hook
  const [auth,setAuth]=useAuth();
  const navigate=useNavigate();
  const location=useLocation();

  const handleSubmit= async(e)=>{
    e.preventDefault();
    try {
      //making http request using axios
      //using destructuring to get the propeties using 'data'
      // const {data}=await axios.post(`${process.env.REACT_APP_API}/login`,
      //modifying the above line since we configured axios globally
      const {data}=await axios.post(`/login`,
    
      {
        email,
        password,
      });
      //here '?' is used so that the error property can be accessed only when the data exists
      // console.log(data);
      if(data?.error){
        toast.error(data.error);
      }else{
        //using localstorage to save the user session so that when they hit reload, the context will not be cleared and as till the token expire,
        //the user stays logged in the web application; here setItem used to set any name to the property we want to save .
        //the property will be saved in the user's browser localstorage
        //here we pass data as the value
        //whenever we store anything in the localstorage we save it in json format..ie a rule
        localStorage.setItem('auth',JSON.stringify(data));
        setAuth({...auth,token:data.token,user:data.user});
        toast.success("Entered the Mayhem!");
        navigate(location.state || `/dashboard/${data?.user?.role === 1?"admin":"user"}`);
      }
    } catch (err) {
      console.log(err);
      toast.error("Potion isn't working. Try again!");
    }
  }
    return (  //login page creation
      <div>
        <Jumbotron title="Enter the Mayhem!" 
        subtitle="Get ready to venture the insanity!" 
        className="container-fluid jumbotron-login" />

       <div>
              <div class="row-full">
                <p>The Mayhem is a place made out of Void and complete insanity. The Mayhem can be accessed via this portal. Mayhem is a place 
                  where you can find a lot of places satisfying your curiosities. There will be a place for you stay which is "CORE insanity".
                  Ofcourse, you should be very insane to enter this place. And that much insane level can be obtained by drinking a special potion 
                  from the 'Apothecary'. Make sure to go there and get the potion. You can drink the potion infront of here to verify 
                  your insanity and enter the Mayhem. 
                </p>
            </div>
        

        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <form onSubmit={handleSubmit}>

                  
                  <input type="email" className="form-control mb-4 p-2"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} />

                  <input type="password" className="form-control mb-4 p-2"
                  placeholder="Enter your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} />
              
                  <button className="btn btn-primary" type="submit">
                    Drink the Potion and Enter!
                  </button>
              </form>
              </div>
              <div class="row-full">
                <p>For a good user experience, use the desktop version in browser or use a desktop since Mayhem Cart is not optimized for mobile 
                  viewing yet!
                </p>
            </div>
          </div>
        </div>

        </div>
      
      </div>
    );
  }
  



