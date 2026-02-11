import { useEffect, useState,useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AppContent } from "../context/AppContext";

function Products() {
  const [products, setProducts] = useState([]);
const {userData,isLoggedin,setProduct}= useContext(AppContent)

  const handleDelete = async (productId) => {
  try {
    const res = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/delete/${productId}`,
      { withCredentials: true }
    );

    if (res.data.success) {
      toast.success(res.data.message);
      // Filter out the deleted product from state
      setProducts(products.filter((p) => p._id !== productId));
    }
  } catch (err) {
    toast.error(err.response?.data?.message || "Delete failed");
  }
};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products`, {
          withCredentials: true,
        });
        console.log(res.data.user)
        
        if (res.data.success) {
          setProducts(res.data.user ); // default to empty array
          toast.success(res.data.message);
        }
      } catch (err) {
        console.error("Error fetching products:", err.response?.data || err);
        toast.error(err.response?.data?.message || "Fetch failed");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">List of Products</h2>
      
      <ul className="space-y-4">
        {products.map((product) => (
          <li key={product._id} className="border p-4 rounded shadow-sm">
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p>{product.description}</p>
            <p className="font-bold">${product.price}</p>
            <p> {product._id}</p>
            {/* <p>{product.createdBy}</p>
            <p>{userData?.id}</p> */}
             {product.createdBy === userData?.id && (
      <button
        onClick={() => handleDelete(product._id)}
        className="bg-red-500 text-white p-1 rounded mt-2"
      >
        Delete
      </button>
    )}
            

            
          </li>
          
          
        ))}
      </ul>
    </div>
  );
}

export default Products;
