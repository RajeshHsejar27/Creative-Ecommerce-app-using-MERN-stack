import useCategory from "../hooks/useCategory";
import Jumbotron from "../components/cards/Jumbotron";
import { Link } from "react-router-dom";

export default function CategoriesList(){

    const categories=useCategory();

    return(
            <>
            
            <Jumbotron   title="Artifact Categories" subtitle="List of all the Artifact Categories"
            className="container-fluid jumbotron-category" />

            <div className="container overflow-hidden">
            <div className="row gx-5 gy-5 mt-3 mb-5">
                {categories?.map((c)=>(
                    <div className="col-md-3" key={c._id}>
                        <button className="btn btn-light col-12 p-3"
                        style={{border:"3px solid white"}}>
                        <h3><Link to={`/category/${c.slug}`}> {c.name} </Link>   </h3> 
                        </button>


                        </div>

                ))}


            </div>

            </div>

            </>


    )
}