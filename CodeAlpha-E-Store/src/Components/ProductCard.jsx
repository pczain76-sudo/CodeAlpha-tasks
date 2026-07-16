import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';

function ProductCard({ product }) {
    const { addToCart } = useContext(CartContext);


    const { _id, title, price, image, rating } = product;

    return (
        <div className="bg-white rounded-xl shadow-md overflow-hidden transition hover:shadow-lg">
            <Link to={`/product/${_id}`}>
                <img
                    src={image?.startsWith('http') ? image : `http://localhost:5000${image}`}
                    alt={title}
                    className="w-full h-64 object-cover"
                />
            </Link>

            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 truncate">{title}</h3>
                <p className="text-yellow-500 mb-2">⭐ {rating}</p>
                <div className="flex justify-between items-center mt-4">
                    <span className="text-xl font-bold text-emerald-600">${price}</span>

                    <button
                        onClick={() => addToCart(product)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition cursor-pointer"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;