import { NavLink } from "react-router-dom"
import ".//navbar.css";

export default function AdminMenu(){
    return(
        <>

            
            <div className="p-3 mt-2 mb-2 h4 bg-light slate">Your Pathways:</div>
            <ul className="list-group list-unstyled">
            <li>
                <NavLink className="list-group-item" to="/dashboard/admin/category">
                    Create a Category
                </NavLink>
            </li>

            <li>
                <NavLink className="list-group-item" to="/dashboard/admin/product">
                    Create an Artifact
                </NavLink>
            </li>

            <li>
                <NavLink className="list-group-item" to="/dashboard/admin/products">
                    Artifacts
                </NavLink>
            </li>

            <li>
                <NavLink className="list-group-item" to="/dashboard/admin/orders">
                    Manage Orders
                </NavLink>
            </li>

            </ul>

        </>
    );

}