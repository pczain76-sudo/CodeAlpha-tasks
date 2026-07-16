import React, { useContext } from 'react'
import { CartContext } from '../Context/CartContext'
import { Link } from 'react-router-dom'

function Cart() {

    const {
        cart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart
    } = useContext(CartContext)

    if (cart.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-6 py-20 text-center">
                <h1 className="text-4xl font-bold text-gray-700">
                    🛒 Your Cart is Empty
                </h1>
                <p className="text-gray-500 mt-3">
                    Looks like you haven't added anything yet.
                </p>
                <Link
                    to="/products"
                    className="inline-block mt-8 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg transition"
                >
                    Continue Shopping
                </Link>
            </div>
        )
    }

    const grandTotal = cart.reduce(
        (total, item) => total + item.price * item.quantity, 0
    )

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

            <div className="space-y-6">
                {cart.map((prd) => (
                    <div
                        key={prd._id}
                        className="bg-white shadow-md rounded-xl p-5 flex justify-between items-center"
                    >
                        <div className="flex items-center gap-6">
                            <img src={prd.image?.startsWith('http') ? prd.image : `http://localhost:5000${prd.image}`} alt={prd.title} className="w-28 h-28 object-cover rounded-lg" />
                            <div>
                                <h2 className="text-xl font-semibold text-gray-800">{prd.title}</h2>
                                <p className="text-gray-500 mt-2">
                                    Price: <span className="font-semibold text-emerald-600 ml-2">${prd.price}</span>
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => decreaseQuantity(prd._id)}
                                className="w-9 h-9 rounded-lg bg-gray-200 cursor-pointer hover:bg-gray-300 transition"
                            >-</button>
                            <span className="font-bold text-lg w-8 text-center">{prd.quantity}</span>
                            <button
                                onClick={() => increaseQuantity(prd._id)}
                                className="w-9 h-9 rounded-lg cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white transition"
                            >+</button>
                        </div>

                        <div className="text-right">
                            <p className="font-bold text-xl text-gray-800">${prd.price * prd.quantity}</p>
                            <button
                                onClick={() => removeFromCart(prd._id)}
                                className="mt-3 text-red-500 cursor-pointer hover:text-red-600 font-medium"
                            >Remove</button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-10 bg-white shadow-lg rounded-xl p-6 flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">Grand Total</h2>
                    <p className="text-gray-500">Including all selected products.</p>
                </div>
                <div className="text-right">
                    <h1 className="text-3xl font-bold text-emerald-600">${grandTotal}</h1>
                    <Link to="/checkout">
                        <button className="mt-4 bg-emerald-600 hover:bg-emerald-700 cursor-pointer text-white px-8 py-3 rounded-lg transition">
                            Proceed to Checkout
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Cart