import { useSearch } from "../context/search";
import ProductCard from "../components/cards/ProductCard";
import Jumbotron from "../components/cards/Jumbotron";

export default function Search(){

    const [values,setValues]=useSearch();

    return <>
    

    <Jumbotron 
    title="Clairvoyance findings on Artifacts"
    subtitle={
        values?.results?.length < 1
        ? "No Artifacts found"
        : `Found ${values?.results?.length} Artifacts`
    }
    className="container-fluid jumbotron-search"
    />

    <div className="container mt-3">
        <div className="row">
            {values?.results?.map((p)=>(
                <div key={p._id} className="col-md-3 col-sm-4 col-lg-3">
                    <ProductCard p={p} />
                    </div>
            ))}
        </div>
    </div>
    
    </>
}