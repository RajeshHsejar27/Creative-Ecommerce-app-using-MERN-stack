import { useState } from "react";
import axios from "axios"; //http client
import toast from "react-hot-toast"; //fr toast notifications
import Jumbotron from "../../components/cards/Jumbotron";
//using jumbotron as intro card
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import ".//style.css";


export default function Register() {
  //state
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');

  //hook fr putting the response in the context
  const [auth,setAuth]=useAuth();
  const navigate=useNavigate();


  const handleSubmit= async(e)=>{
    e.preventDefault();
    try {
      //making http request using axios
      //using destructuring to get the propeties using 'data'
      // const {data}=await axios.post(`${process.env.REACT_APP_API}/register`,
      //  //modifying the above line since we configured axios globally
       
       const {data}=await axios.post(`/register`,
       {
        name,
        email,
        password,
      });
      //here '?' is used so that the error property can be accessed only when the data exists
      console.log(data);
      if(data?.error){
        toast.error(data.error);
      }else{
        localStorage.setItem('auth',JSON.stringify(data));
        setAuth({...auth,token:data.token,user:data.user});
        toast.success("Registration successful! Entering Mayhem...");
        navigate("/dashboard/user");
      }
    } catch (err) {
      console.log(err);
      toast.error("Registration failed. Try again!");
    }
  }
    return (
      <div>
        <Jumbotron title="Register Now for Mayhem Cart!" 
        subtitle="One potion away from entering insanity!"
        className="container-fluid jumbotron-register" />

          <div>
          <div class="row-full">
                <p>Welcome to the 'Apothecary'. Here, I have all kinds of Potions,known and unknown ones! 
                  And I know which one you want! I'll create that potion just for you right now! All you 
                  have to do is answer some questions about you! Come on Now, don't be shy!
                </p>
            </div>

        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <form onSubmit={handleSubmit}>

                  <input type="text" className="form-control mb-4 p-2"
                  placeholder="What's your Name?!"
                  value={name}
                  onChange={(e) => setName(e.target.value)} />

                  <input type="email" className="form-control mb-4 p-2"
                  placeholder="What's your Email?!"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} />

                  <input type="password" className="form-control mb-4 p-2"
                  placeholder="What's gonna be your Password?!"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} />
              
                  <button className="btn btn-primary" type="submit">
                    Create the insanity Potion!
                  </button>
              </form>
              </div>
          </div>
        </div>

        </div>
      
      </div>
    );
  }
  



