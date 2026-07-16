import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">

            <h1 className="text-8xl font-bold text-emerald-600">
                404
            </h1>

            <h2 className="text-3xl font-semibold mt-4">
                Page Not Found
            </h2>

            <p className="text-gray-500 mt-3 max-w-md">
                Sorry, the page you are looking for doesn't exist or has been moved.
            </p>

            <Link
                to="/"
                className="mt-8 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg transition"
            >
                Back to Home
            </Link>

        </div>
    )
}

export default NotFound