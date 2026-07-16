import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function Orders() {
    const { userInfo } = useContext(AuthContext)
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/orders/myorders", {
                    headers: {
                        "Authorization": `Bearer ${userInfo.token}`
                    }
                })
                const data = await response.json()
                setOrders(data)
            } catch (error) {
                console.log("Error fetching orders", error)
            } finally {
                setLoading(false)
            }
        }

        if (userInfo) {
            fetchOrders()
        }
    }, [userInfo])

    if (loading) {
        return <div className="text-center py-20 text-2xl font-bold text-gray-500">Loading Orders...</div>
    }

    if (orders.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-6 py-20 text-center">
                <h1 className="text-4xl font-bold text-gray-700">📦 No Orders Yet</h1>
                <p className="text-gray-500 mt-3">You haven't placed any order.</p>
                <Link to="/products" className="inline-block mt-8 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg transition">
                    Start Shopping
                </Link>
            </div>
        )
    }

    return (
        <div className="max-w-5xl mx-auto px-6 py-10">
            <h1 className="text-4xl font-bold mb-8">My Orders</h1>

            <div className="space-y-6">
                {orders.map((order) => (
                    <div key={order._id} className="bg-white shadow-md rounded-xl p-6 border border-gray-100">
                        
                    
                        <div className="flex justify-between items-center mb-4 pb-4 border-b">
                            <div>
                                <p className="text-gray-500 text-sm">ORDER ID</p>
                                <p className="font-bold text-gray-800">{order._id}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-gray-500 text-sm">DATE</p>
                                <p className="font-semibold text-gray-800">{order.createdAt.substring(0, 10)}</p>
                            </div>
                        </div>

        
                        <div className="space-y-3 mb-4">
                            {order.orderItems.map((item, index) => (
                                <div key={index} className="flex items-center gap-4">
                                    <img 
                                        src={item.image?.startsWith('http') ? item.image : `http://localhost:5000${item.image}`} 
                                        alt={item.name} 
                                        className="w-14 h-14 object-cover rounded-md"
                                    />
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-800">{item.name}</p>
                                        <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                                    </div>
                                    <p className="font-bold text-gray-800">${item.price * item.qty}</p>
                                </div>
                            ))}
                        </div>

                     
                        <div className="flex justify-between items-center pt-4 border-t">
                            <div>
                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${order.isPaid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {order.isPaid ? 'Paid' : 'Not Paid'}
                                </span>
                            </div>
                            <h2 className="text-2xl font-bold text-emerald-600">
                                Total: ${order.totalPrice}
                            </h2>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    )
}

export default Orders