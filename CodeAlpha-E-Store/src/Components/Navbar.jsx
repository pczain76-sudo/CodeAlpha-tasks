import React, { useContext } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'
import { CartContext } from '../Context/CartContext'
import { AuthContext } from '../context/AuthContext'


function Navbar() {

    const { cart } = useContext(CartContext)
    const { userInfo, logout } = useContext(AuthContext) 
    const navigate = useNavigate() 
    const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Products', path: '/products' },
        { name: 'Cart', path: '/cart' },
        ...(userInfo ? [{ name: 'Orders', path: '/orders' }] : []) 
    ]

    return (
        <>
            <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto h-20 flex justify-between items-center px-6">
                    <Link to='/'> <img alt='CodeAlpha logo' src={logo} className='h-12 w-auto' /></Link>
                    
                    <div className='flex items-center gap-8'>
                        {navItems.map((item) => 
                          
                            item.name === 'Cart' ? (
                                <NavLink key={item.path} to={item.path} className={({ isActive }) =>
                                    isActive ? 'text-emerald-600 font-semibold relative' : 'text-gray-700 hover:text-emerald-600 transition-colors font-medium duration-300 relative'}>
                                    
                                    <span className="flex items-center">
                                        Cart
                                  
                                        {totalCartItems > 0 && (
                                            <span className="absolute -top-2 -right-5 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                                                {totalCartItems}
                                            </span>
                                        )}
                                    </span>

                                </NavLink>
                            ) : (
                             
                                <NavLink key={item.path} to={item.path} className={({ isActive }) =>
                                    isActive ?
                                        'text-emerald-600 font-semibold ' :
                                        'text-gray-700 hover:text-emerald-600 transition-colors font-medium duration-300'}>
                                    {item.name}
                                </NavLink>
                            )
                        )}
                    </div>

                    <div className="flex items-center gap-4">
                        {userInfo ? (
                            <>
                                <span className="text-gray-700 font-medium text-sm hidden sm:inline">Hi, {userInfo.name}</span>
                                <button 
                                    onClick={handleLogout} 
                                    className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition cursor-pointer active:translate-y-1"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link 
                                    to="/login" 
                                    className="text-gray-700 hover:text-emerald-600 transition-colors font-medium duration-300"
                                >
                                    Login
                                </Link>
                                <Link 
                                    to="/register" 
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg transition cursor-pointer active:translate-y-1 font-medium"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>

                </div>
            </nav>
        </>
    )
}

export default Navbar