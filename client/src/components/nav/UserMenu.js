import { NavLink } from "react-router-dom"

export default function UserMenu(){
    return(
        <>

            
            <div className="p-3 mt-2 mb-2 h4 bg-light">Available Pathways:</div>
            <ul className="list-group list-unstyled">
            <li>
                <NavLink className="list-group-item" to="/dashboard/user/profile">
                    Character Profile
                </NavLink>
            </li>

            <li>
                <NavLink className="list-group-item" to="/dashboard/user/orders">
                    Orders on Artifacts
                </NavLink>
            </li>
          
            </ul>

        </>
    );

}