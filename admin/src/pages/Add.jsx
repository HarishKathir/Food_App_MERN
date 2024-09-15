import React,{useState,useEffect} from "react";
import { FiUploadCloud } from "react-icons/fi";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ url }) => {
  const [image, setImage] = useState(false);
  const [data,setData] = useState({
    name:"",
    description:"",
    category:"Curry",
    price:"",
  });

  const OnChangeHandler = (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({...data,[name]:value}))
  }  

  const onSubmitHandler = async(e) =>{
    e.preventDefault();

    const formData = new FormData()
    formData.append("name",data.name);
    formData.append("description",data.description);
    formData.append("category",data.category);
    formData.append("price",Number(data.price));
    formData.append("image",image);

    const response =  await axios.post(`${url}/api/product/add`,formData);
    if(response.data.success){
        setData({
            name:"",
            description:"",
            category:"Curry",
            price:"",
        })
        setImage(false);
        toast.success(response.data.message);
    }else{
        toast.error(response.data.message);
    }
  }

  return (
    <div className="p-4 sm:p-10 w-full bg-white rounded-xl">
      <form onSubmit={onSubmitHandler} className="flex flex-col gap-y-5 max-w-[555px]">
        <h4 className="bold-22 pb-2 uppercase">Products Upload</h4>
        <div className="flex flex-col gap-y-2 max-w-28 h-20 medium-15">
          <p>Upload Image</p>
          <label htmlFor="image">
            <div className="flexCenter ring-1 ring-slate-900/10 p-1 h-16">
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt=""
                  className="p-1 h-16 "
                />
              ) : (
                <FiUploadCloud className="text-4xl text-tertiary" />
              )}
            </div>
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
        </div>
        <div className="flex flex-col gap-y-2 medium-15">
            <p>Product name</p>
            <input name="name" onChange={OnChangeHandler} value={data.name} placeholder="Name of the Product" required  className="ring-1 ring-slate-900/10 py-1 px-2 outline-none resize-none"/>        
        </div>
        <div className="flex flex-col gap-y-2 medium-15">
            <p>Product description</p>
            <textarea name="description" onChange={OnChangeHandler} value={data.description} placeholder="About the Product" rows="6" required className="ring-1 ring-slate-900/10 py-1 px-2 outline-none resize-none"></textarea>
        </div>
        <div className="flex items-center gap-x-6 text-gray-900/70 medium-15">
            <div className="flex flex-col gap-y-2">
                <p>Product Category</p>
                <select name="category" onChange={OnChangeHandler} value={data.category} className="outline-none ring-1 ring-slate-900/10 pl-2">
                    <option value="Curry">Curry</option>
                    <option value="Pizza">Pizza</option>
                    <option value="Rice">Rice</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Drinks">Drinks</option>
                    <option value="Fruits">Fruits</option>
                </select>
            </div>
            <div className="flex flex-col gap-y-2">
                <p>Product Price</p>
                <input name="price" onChange={OnChangeHandler} value={data.price} placeholder="$10" type="number" className="ring-1 ring-slate-900/10 pl-2 outline-none"/>
            </div>
        </div>
        <button type="submit" className="btn-dark sm:w-5.12 flexCenter gap-x-2 !py-2 rounded"><FaPlus />ADD Product</button>
      </form>
    </div>
  );
};

export default Add;
