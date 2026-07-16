import { useContext, useState } from "react";
import { CartContext } from "./CartContext";



function CartProvider({ children }) {

    const [cart, setCart] = useState([])

    const addToCart = (product) => {

        const existingProduct = cart.find((prd) => prd._id === product._id)

        if (existingProduct) {
            setCart(
                cart.map((prd) => prd._id === product._id ?
                    {
                        ...prd, quantity: prd.quantity + 1
                    } : prd)
            )
        } else {
            setCart([
                ...cart, {
                    ...product,
                    quantity: 1
                }
            ]
            )
        }
    }

    const increaseQuantity = (id) => {

        setCart(
            cart.map((item) => item._id === id ?
                {
                    ...item, quantity: item.quantity + 1
                } : item)
        )
    }

    const decreaseQuantity = (id) => {

        const existingItem = cart.find((item) => item._id === id)

        if (existingItem.quantity === 1) {
            return removeFromCart(id)
        }

        setCart(
            cart.map((item) => item._id === id ?
                {
                    ...item, quantity: item.quantity - 1
                } : item)
        )
    }

    const removeFromCart = (id) => {

        setCart(
            cart.filter((item) => item._id !== id)
        )
    }
    const clearCart = () => {
        setCart([]);
    }

    return (
        <>
            <CartContext.Provider value={{ cart, setCart, addToCart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart }}>
                {children}
            </CartContext.Provider>
        </>
    )
}

export default CartProvider