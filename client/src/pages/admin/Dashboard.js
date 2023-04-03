import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";



export default function AdminDashboard(){
   //context
   const [auth,setAuth]=useAuth();

   return(
    <>
        <Jumbotron
        title={`Welcome ${auth?.user?.name}!`}
        subtitle="It's you?! Isn't it King?!" />
        
        <div className="container-fluid">
            <div className="row">
            <div className="col-md-3">
                <AdminMenu />
                </div>
                <div className="col-md-9">
                <div className="p-3 mt-2 mb-2 h4 bg-light">Your Character configuration!</div>
                <ul className="list-group">
                    <li className="list-group-item">{auth?.user?.name}</li>
                    <li className="list-group-item">{auth?.user?.email}</li>
                    <li className="list-group-item">{auth?.user?.role}</li>
                </ul>
                    </div>
            </div>
        </div>
        </>
   )
}