import React, { useState, useEffect } from 'react'
import ProductCard from '../Components/ProductCard'


function Home() { 
    
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchHomeProducts = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/products");
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.log("Error fetching home products:", error);
            }
        };
        fetchHomeProducts();
    }, []);

    return (
        <>
        
            <div className='max-w-7xl mx-auto px-6 py-10 grid  overflow-hidden gap-4 grid-cols-4'>
                {products.map((prd) =>
                                       <ProductCard key={prd._id} product={prd} />
                )}
            </div>
            
        </>
    )
}

export default Home