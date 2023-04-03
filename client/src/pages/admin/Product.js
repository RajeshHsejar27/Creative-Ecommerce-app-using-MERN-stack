import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";
import { useState,useEffect } from "react";
import axios from "axios";
import { Select } from "antd";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import ".//style.css";

const {Option}=Select;


export default function AdminProduct(){
   //context
   const [auth,setAuth]=useAuth();

   //state
   const [categories,setCategories]=useState([]);
   const [photo,setPhoto]=useState("");
   const [name,setName]=useState("");
   const [description,setDescription]=useState("");
   const [price,setPrice]=useState("");
   const [category,setCategory]=useState("");
   const [shipping,setShipping]=useState("");
   const [quantity,setQuantity]=useState("");
    
    const navigate=useNavigate();

    useEffect(()=>{
        loadCategories();
    },[]);

        const loadCategories=async()=>{
            try{
              const {data}=await axios.get("/categories");
              setCategories(data);
            }  catch(err){
              console.log(err);
            }
          };
    
        const handleSubmit=async(e)=>{
            e.preventDefault();
            try{
                //formdata available in browser environment
                const productData=new FormData();
                productData.append('photo',photo);
                productData.append('name',name);
                productData.append('description',description);
                productData.append('price',price);
                productData.append('category',category);
                productData.append('shipping',shipping);
                productData.append('quantity',quantity);
                
                //to view the post log in console window
                // console.log([...productData]);

                const {data}=await axios.post("/product",productData);
                if(data?.error){
                    toast.error(data.error)
                }else{
                    toast.success(`"${data.name}" is created`);
                    navigate('/dashboard/admin/products');
                }
            }catch(err){
                console.log(err)
                toast.error("Artifact creation failed. Try again!")
            }
        }

   return(
    <>
        <Jumbotron
        subtitle="Artifact modifications" />
        
        <div className="container-fluid">
            <div className="row">
            <div className="col-md-3">
                <AdminMenu />
                </div>
                <div className="col-md-9">
                <div className="p-3 mt-2 mb-2 h4 bg-light">Create Artifacts</div>

                    {photo && (
                        <div className="text-center">
                            <img
                                src={URL.createObjectURL(photo)}
                                alt="product photo"
                                className="img img-responsive"
                                height="200px"

                            />
                            </div>
                    )}


                
                    <div className="pt-2 pb-2">
                        <label className="btn btn-light col-12 mb-13">
                        {photo ? photo.name : "Select Image of the Artifact"}
                        <input type="file" 
                        name="photo" 
                        accept="image/*" 
                        onChange={e => setPhoto(e.target.files[0])}
                        hidden
                        />
                        </label>

                    </div>

                    <input type="text" className="form-control mb-3 p-2"
                    placeholder="Write a name" value={name} 
                    onChange={(e)=>setName(e.target.value)}/>

                    <textarea type="text" className="form-control mb-3 p-2"
                    placeholder="Write a description" value={description} 
                    onChange={(e)=>setDescription(e.target.value)}/>

                    <input type="number" className="form-control mb-3 p-2"
                    placeholder="Enter a price" value={price} 
                    onChange={(e)=>setPrice(e.target.value)}/>




                   <Select
                   //showSearch
                   bordered={false} 
                   size="large"
                   className="light mb-3 bg-secondary"
                   placeholder="Choose a Category"
                   
                //    here the onchange doesnt work like the normal functionin select element,for this
                //    select element,you have to catch value instead of an event.
                    onChange={(value)=>setCategory(value)}
                   >
                    {/* use name here in map function,since using value can bring random values during searching */}
                    {categories?.map((c)=> 
                    <Option key={c._id} value={c._id}>
                        {c.name}
                    </Option>)}
                   </Select>
<br></br>

                   <Select
                   bordered={false} 
                   size="large"
                   className="light mb-3 bg-secondary"                 
                   placeholder="Choose Shipping"
                //    here the onchange doesnt work like the normal functionin select element,for this
                //    select element,you have to catch value instead of an event.
                    onChange={(value)=>setShipping(value)}
                   >
                    {/* use name here in map function,since using value can bring random values during searching */}
                    <Option value="0"> No </Option>
                    <Option value="1"> Yes </Option>
                   </Select>

                   <input type="number" min="1"
                     className="form-control mb-3 p-2"
                    placeholder="Enter quantity" value={quantity} 
                    onChange={(e)=>setQuantity(e.target.value)}/>

                    <button onClick={handleSubmit} className="btn btn-primary mb-5">Submit</button>
                    </div>
            </div>
        </div>
        </>
   )
}