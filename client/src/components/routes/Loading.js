import { useEffect,useState } from "react";
import { useNavigate ,useLocation} from "react-router-dom";
import LoadingGIF from "../images/small.gif";
import './loading.css';


//setting the default path value as login since we need to make some changes on the non default case
export default function Loading({path="/"}){
    //state
    const [count,setCount]=useState(3);

    //hooks
    const navigate=useNavigate();
    const location=useLocation();



    useEffect(()=>{
        //creating a count down and redirecting user when count hits zero
        //whenever the state changes this function runs

        const interval=setInterval(()=>{

            //decrementing count value every second
            setCount((currentCount) => --currentCount);
        },1000);

        //redirect once count is equal to 0
        count === 0 && navigate(`${path}`,{
            state:location.pathname,
        });

        //cleanup the interval after redirecting
        return ()=>clearInterval(interval);
    },[count]);

return <div id="loading" className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundImage: `url(${LoadingGIF})` }}>
        <h1 color="white">You shouldn't be here!</h1><br></br>
        <h1 color="white">The Void is Redirecting you in {count} seconds</h1>
    
    {/* <img src={LoadingGIF}  alt="loading" /> */}
    </div>


}

