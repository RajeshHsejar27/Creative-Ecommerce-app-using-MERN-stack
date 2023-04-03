import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import UserMenu from "../../components/nav/UserMenu";



export default function UserDashboard(){
   //context
   const [auth,setAuth]=useAuth();

   return(
    <>
        <Jumbotron
        title={`Heya ${auth?.user?.name}!`}
        subtitle="How you doin'?!" />
        
        <div className="container-fluid">
            <div className="row">
            <div className="col-md-3">
                <UserMenu />
                </div>
                <div className="col-md-9">
                <div className="p-3 mt-2 mb-2 h4 bg-light">Your Specifics to remember by,</div>
                <ul className="list-group">
                    <li className="list-group-item">Name : {auth?.user?.name}</li>
                    <li className="list-group-item">Email : {auth?.user?.email}</li>
                </ul>
                    </div>
            </div>
        </div>
        </>
   )
}