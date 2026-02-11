import { useContext,useState } from "react";
import axios from "axios";
import { toast ,ToastContainer} from "react-toastify";
import { AppContent } from "../context/AppContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
function AddProduct() {
    
const {userData,isLoggedin,setProduct}= useContext(AppContent)
const navigate= useNavigate();
 const [name, setname]= useState('');
const [price, setprice]= useState('');
const [description, setDiscription]= useState('');
useEffect(() => {
  if (!isLoggedin) {
    toast.error("Login first");
    setTimeout(() => {
      navigate("/");
    }, 1500); // wait 1.5s to show toast
  }
  return
}, [isLoggedin, navigate]);


  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${userData.id}/new`,
        {
         name,
         description,
         price,
        },
        { withCredentials: true }
      );
      console.log(res.data.product);
      if (res.data.success) {
        toast.success(res.data.message);
        setProduct(res.data.product);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Error adding product");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={e=>setname(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
           value={description}
            onChange={e=>setDiscription(e.target.value)}
            className="w-full border p-2 rounded"
            required
          ></textarea>
        </div>

        <div>
          <label className="block font-medium">Price</label>
          <input
            type="number"
            name="price"
            value={price}
            onChange={e=>setprice(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
        >
          Add Product
        </button>
      </form>
      <ToastContainer  position="top-center" autoClose={2000}/>
    </div>
  );
}

export default AddProduct;
