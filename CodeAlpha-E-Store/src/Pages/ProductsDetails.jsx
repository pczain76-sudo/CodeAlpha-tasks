import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../Context/CartContext";

function ProductsDetails() {
  const { id } = useParams(); 
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.log("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]); 

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <h1 className="text-3xl font-bold text-gray-500">Loading Product...</h1>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <h1 className="text-3xl font-bold text-red-500">
          Product Not Found
        </h1>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="bg-white rounded-2xl shadow-lg grid md:grid-cols-2 gap-10 p-8">
        
   
        <div>
          <img
             src={product.image?.startsWith('http') ? product.image : `http://localhost:5000${product.image}`} 
            alt={product.title}
            className="w-full h-[450px] object-cover rounded-xl"
          />
        </div>

        <div className="flex flex-col justify-center gap-5">
          <h1 className="text-4xl font-bold text-gray-900">
            {product.title}
          </h1>

          <p className="text-yellow-500 text-lg font-semibold">
            ⭐ {product.rating} / 5
          </p>

          <p className="text-gray-600 text-lg">
            <span className="font-semibold">Category:</span>{" "}
            {product.category}
          </p>

          <h2 className="text-3xl font-bold text-emerald-600">
            ${product.price}
          </h2>

          <p className="text-green-600 font-semibold text-lg">
            In Stock ({product.stock})
          </p>

          <p className="text-gray-600 leading-7">
            {product.description}
          </p>

          <button
            className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-semibold transition duration-300 active:translate-y-1 cursor-pointer"
            onClick={() => addToCart(product)}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductsDetails;