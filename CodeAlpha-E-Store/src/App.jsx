import { useState, useParams } from 'react'
import { Route, createBrowserRouter, Routes } from 'react-router-dom'
import './App.css'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Home from './Pages/Home'
import MainLayout from './Layouts/MainLayout'
import Cart from './Pages/Cart'
import Checkout from './Pages/Checkout'
import NotFound from './Pages/NotFound'
import Orders from './Pages/Orders'
import Products from './Pages/Products'
import ProductDetails from './Pages/ProductsDetails'
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from './Pages/ProtectedRoutes'


function App() {



  return (
    <>
      <AuthProvider>
        <Routes>

          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          <Route path='/' element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path='cart' element={<ProtectedRoute>
              <Cart />
            </ProtectedRoute>} />
            <Route path='checkout' element={<ProtectedRoute>
              <Checkout />
            </ProtectedRoute>} />
            <Route path='notfound' element={<NotFound />} />
            <Route path='orders' element={<ProtectedRoute>
              <Orders />
            </ProtectedRoute>} />
            <Route path='products' element={<Products />} />
            <Route path='product/:id' element={<ProductDetails />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>


      </AuthProvider>

    </>
  )
}

export default App
