import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../Context/CartContext'

import { AuthContext } from '../context/AuthContext' 


function Checkout() {

    const { cart, clearCart } = useContext(CartContext)
     const { userInfo } = useContext(AuthContext)
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: ''
    })

   
    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
       
        if (errors[e.target.name]) {
            setErrors({
                ...errors,
                [e.target.name]: null
            })
        }
    }

    const grandTotal = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    )


    const validateForm = () => {
        let tempErrors = {}
        let isValid = true

        if (!formData.firstName.trim()) {
            tempErrors.firstName = "First name is required"
            isValid = false
        }
        if (!formData.lastName.trim()) {
            tempErrors.lastName = "Last name is required"
            isValid = false
        }
        if (!formData.email.trim()) {
            tempErrors.email = "Email is required"
            isValid = false
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            tempErrors.email = "Email format is invalid"
            isValid = false
        }
        if (!formData.phone.trim()) {
            tempErrors.phone = "Phone number is required"
            isValid = false
        } else if (!/^[0-9]{10,15}$/.test(formData.phone)) { 
            tempErrors.phone = "Enter a valid phone number (only digits)"
            isValid = false
        }
        if (!formData.address.trim()) {
            tempErrors.address = "Address is required"
            isValid = false
        }
        if (!formData.city.trim()) {
            tempErrors.city = "City is required"
            isValid = false
        }
        if (!formData.postalCode.trim()) {
            tempErrors.postalCode = "Postal code is required"
            isValid = false
        } else if (!/^[0-9]{4,6}$/.test(formData.postalCode)) { 
            tempErrors.postalCode = "Enter a valid postal code"
            isValid = false
        }

        setErrors(tempErrors)
        return isValid
    }
    
   
    const handleSubmit = async (e) => {
        e.preventDefault()

        
        if (cart.length === 0) {
            alert("Your cart is empty! Add some products first.")
            return
        }


        if (validateForm()) {
            try {
                
                const orderData = {
                    orderItems: cart.map((item) => ({
                        name: item.title,
                        qty: item.quantity,
                        image: item.image,
                        price: item.price,
                        product: item._id
                    })),
                    shippingAddress: formData,
                    totalPrice: grandTotal
                }

                
                const response = await fetch("http://localhost:5000/api/orders", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${userInfo.token}` 
                    },
                    body: JSON.stringify(orderData)
                })

                const data = await response.json()

                if (response.ok) {
                    alert("Order Placed Successfully 🎉")
                    clearCart() 
                    navigate("/orders") 
                } else {
                    alert("Failed to place order: " + data.message)
                }

            } catch (error) {
                alert("Server error while placing order")
                console.log(error)
            }
        }
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <h1 className="text-4xl font-bold mb-10">Checkout</h1>
            
            <div className="grid grid-cols-2 gap-10">
              
                <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-xl p-8">
                    <h2 className="text-2xl font-semibold mb-6">Customer Information</h2>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <input
                                type="text" name="firstName" placeholder="First Name"
                                value={formData.firstName} onChange={handleChange}
                                className={`border rounded-lg p-3 outline-none focus:ring-2 focus:ring-emerald-500 w-full ${errors.firstName ? 'border-red-500' : ''}`}
                            />
                            {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                        </div>
                        <div>
                            <input
                                type="text" name="lastName" placeholder="Last Name"
                                value={formData.lastName} onChange={handleChange}
                                className={`border rounded-lg p-3 outline-none focus:ring-2 focus:ring-emerald-500 w-full ${errors.lastName ? 'border-red-500' : ''}`}
                            />
                            {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                        </div>
                    </div>

                    <div className="mt-4">
                        <input type="email" name="email" placeholder="Email"
                            value={formData.email} onChange={handleChange}
                            className={`border rounded-lg p-3 outline-none focus:ring-2 focus:ring-emerald-500 w-full ${errors.email ? 'border-red-500' : ''}`}
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                    </div>

                    <div className="mt-4">
                        <input type="text" name="phone" placeholder="Phone Number (e.g 03451234567)"
                            value={formData.phone} onChange={handleChange}
                            className={`border rounded-lg p-3 outline-none focus:ring-2 focus:ring-emerald-500 w-full ${errors.phone ? 'border-red-500' : ''}`}
                        />
                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                    </div>

                    <div className="mt-4">
                        <textarea name="address" placeholder="Address" rows="4"
                            value={formData.address} onChange={handleChange}
                            className={`border rounded-lg p-3 outline-none focus:ring-2 focus:ring-emerald-500 w-full resize-none ${errors.address ? 'border-red-500' : ''}`}
                        />
                        {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div>
                            <input type="text" name="city" placeholder="City"
                                value={formData.city} onChange={handleChange}
                                className={`border rounded-lg p-3 outline-none focus:ring-2 focus:ring-emerald-500 w-full ${errors.city ? 'border-red-500' : ''}`}
                            />
                            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                        </div>
                        <div>
                            <input type="text" name="postalCode" placeholder="Postal Code (e.g 51310)"
                                value={formData.postalCode} onChange={handleChange}
                                className={`border rounded-lg p-3 outline-none focus:ring-2 focus:ring-emerald-500 w-full ${errors.postalCode ? 'border-red-500' : ''}`}
                            />
                            {errors.postalCode && <p className="text-red-500 text-xs mt-1">{errors.postalCode}</p>}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="mt-8 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-lg transition font-semibold cursor-pointer"
                    >
                        Place Order
                    </button>
                </form>

           
                <div className="bg-white shadow-lg rounded-xl p-8 h-fit">
                    <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
                    
                    <div className="space-y-5">
                        {cart.map((item) => (
                            <div key={item._id} className="flex justify-between items-center border-b pb-4">
                                <div className="flex gap-4 items-center">
                                    <img
                                        src={item.image?.startsWith('http') ? item.image : `http://localhost:5000${item.image}`} 
                                        alt={item.title}
                                        className="w-16 h-16 rounded-lg object-cover"
                                    />
                                    <div>
                                        <h3 className="font-semibold">{item.title}</h3>
                                        <p className="text-gray-500 text-sm">Qty : {item.quantity}</p>
                                    </div>
                                </div>
                                <p className="font-semibold">${item.price * item.quantity}</p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 flex justify-between items-center border-t pt-6">
                        <h2 className="text-2xl font-bold">Total</h2>
                        <h2 className="text-3xl font-bold text-emerald-600">${grandTotal}</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout