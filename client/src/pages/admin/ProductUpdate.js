import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";
import { useState,useEffect } from "react";
import axios from "axios";
import { Select } from "antd";
import toast from 'react-hot-toast';
import { useNavigate,useParams } from "react-router-dom";

const {Option}=Select;


export default function AdminProductUpdate(){
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
   const [id,setId]=useState('');
    
    const navigate = useNavigate();
    const params=useParams();


    

    useEffect(()=>{
        loadProduct();
    },[])

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
    

          const loadProduct=async ()=>{
            try{
               const {data}=await axios.get(`/product/${params.slug}`);
               setName(data.name);
               setDescription(data.description);
               setPrice(data.price);
               setCategory(data.category._id);
               setShipping(data.shipping);
               setQuantity(data.quantity);
               setId(data._id);
            } catch(err){
                    console.log(err)
            }
          }

        const handleSubmit=async(e)=>{
            e.preventDefault();
            try{
                //formdata available in browser environment
                const productData=new FormData();
                photo && productData.append('photo',photo);
                productData.append('name',name);
                productData.append('description',description);
                productData.append('price',price);
                productData.append('category',category);
                productData.append('shipping',shipping);
                productData.append('quantity',quantity);
                
                //to view the post log in console window
                // console.log([...productData]);

                const {data}=await axios.put(`/product/${id}`,productData);
                if(data?.error){
                    toast.error(data.error);
                }else{
                    toast.success(`"${data.name}" is updated`);
                    navigate("/dashboard/admin/products");
                    
                }
            }catch(err){
                console.log(err)
                toast.error("Artifact updation failed. Try again!")
            }
        }

        const handleDelete=async (req,res)=>{
            try{
                let answer=window.confirm(
                    "Are you sure you want to delete the artifact?!");
                    if(!answer) return;
                const {data}=await axios.delete(`/product/${id}`)
                toast.success(`"${data.name}" is deleted.`)
                navigate("/dashboard/admin/products")
            }catch(err){
                console.log(err)
                toast.err('Delete failed.Try again.')

            }
        }

   return(
    <>
        <Jumbotron
        subtitle="Artifacts Updations heh, King?!" />
        
        <div className="container-fluid">
            <div className="row">
            <div className="col-md-3">
                <AdminMenu />
                </div>
                <div className="col-md-9">
                <div className="p-3 mt-2 mb-2 h4 bg-light">Update Artifacts</div>

                    {photo ? (
                        <div className="text-center">
                            <img
                                src={URL.createObjectURL(photo)}
                                alt="product photo"
                                className="img img-responsive"
                                height="200px"

                            />
                            </div>
                    ):(<div className="text-center">

                        {/* here you can that we added a data and time function for fetching the image in the
                        products page and if we didnt use this the browser will depend upon the cache stored and would
                        show the old image and not the updated one in that instance,still the image is updated and can be 
                        displayed when hit refresh. But this time function alerts the browser to notice this an update the 
                        image at that instance without relying on the browser cache */}

                            <img
                                src={`${process.env.REACT_APP_API
                                }/product/photo/${id}?${new Date().getTime()}`}
                                alt="product photo"
                                className="img img-responsive"
                                height="200px"

                            />
                        </div>
                        )}



                
                    <div className="pt-2 pb-2">
                        <label className="btn btn-outline-secondary col-12 mb-13">
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
                   className="form-select mb-3"
                   placeholder="Choose a Category"
                //    here the onchange doesnt work like the normal functionin select element,for this
                //    select element,you have to catch value instead of an event.
                    onChange={(value)=>setCategory(value)}
                    value={category}
                   >
                    {/* use name here in map function,since using value can bring random values during searching */}
                    {categories?.map((c)=> 
                    <Option key={c._id} value={c._id}>
                        {c.name}
                    </Option>)}
                   </Select>


                   <Select
                   bordered={false} 
                   size="large"
                   className="form-select mb-3"
                   placeholder="Choose Shipping"
                //    here the onchange doesnt work like the normal functionin select element,for this
                //    select element,you have to catch value instead of an event.
                    onChange={(value)=>setShipping(value)}
                    value={shipping?"Yes":"No"}
                   >
                    {/* use name here in map function,since using value can bring random values during searching */}
                    <Option value="0"> No </Option>
                    <Option value="1"> Yes </Option>
                   </Select>

                   <input type="number" min="1"
                     className="form-control mb-3 p-2"
                    placeholder="Enter quantity" value={quantity} 
                    onChange={(e)=>setQuantity(e.target.value)}/>


                        <div className="d-flex justify-content-between">
                        <button onClick={handleSubmit} className="btn btn-primary mb-5">Update</button>
                        <button onClick={handleDelete} className="btn btn-danger mb-5">Delete</button>
                        </div>


                  </div>
            </div>
        </div>
        </>
   )
}