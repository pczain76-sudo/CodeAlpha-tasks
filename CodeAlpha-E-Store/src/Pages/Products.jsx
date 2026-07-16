import React, { useState, useEffect } from 'react'
import ProductCard from '../Components/ProductCard'
import { useContext } from 'react'
import { CartContext } from '../Context/CartContext'

function Products() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState("All");

    const { cart } = useContext(CartContext)
    const { addToCart } = useContext(CartContext)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/products");
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchProducts();
    }, []);

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const filterProduct = products.filter((prd) => {
        const searchMatch = prd.title
            .toLowerCase()
            .includes(search.toLowerCase());

        const categoryMatch =
            category === "All"
                ? true
                : prd.category === category;

        return searchMatch && categoryMatch;
    });

    return (
        <>
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
                Our Products
            </h1>

            <div className="flex justify-center mb-6">
                <input
                    type="text"
                    placeholder="Search Products..."
                    value={search}
                    onChange={handleSearch}
                    className="w-full max-w-lg border border-gray-300 rounded-xl px-5 py-3 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition"
                />
            </div>

            <div className="flex justify-center gap-4 mb-10">
                <button
                    onClick={() => setCategory("All")}
                    className={`px-5 py-2 rounded-lg font-medium transition cursor-pointer ${category === "All"
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                        }`}
                >
                    All
                </button>

                <button
                    onClick={() => setCategory("Men")}
                    className={`px-5 py-2 rounded-lg font-medium transition cursor-pointer ${category === "Men"
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                        }`}
                >
                    Men
                </button>

                <button
                    onClick={() => setCategory("Accessories")}
                    className={`px-5 py-2 rounded-lg font-medium transition cursor-pointer ${category === "Accessories"
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                        }`}
                >
                    Accessories
                </button>
            </div>

            <div className='max-w-7xl mx-auto px-6 py-10 grid  overflow-hidden gap-4 grid-cols-4'>
                {filterProduct.length > 0 ? (
                   filterProduct.map((prd) =>
    <ProductCard key={prd._id} product={prd} />
                    )
                ) : (
                    <div className="col-span-4 flex justify-center items-center py-20">
                        <h1 className="text-3xl font-bold text-red-500">
                            Product Not Found ❌
                        </h1>
                    </div>
                )}
            </div>
        </>
    )
}

export default Products