import React from 'react'

function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 mt-auto">
            <div className="max-w-7xl mx-auto px-6 py-10 text-center space-y-4">


                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm sm:text-base">
                    <span>Developed by <span className="text-emerald-400 font-semibold">Ali Zain</span></span>


                    <span className="hidden sm:inline text-gray-600">|</span>

                    <span>Intern at <span className="text-emerald-400 font-semibold">CodeAlpha</span></span>

                    <span className="hidden sm:inline text-gray-600">|</span>

                    <span><span className="text-emerald-400 font-semibold">Full Stack Development</span></span>
                </div>

                <div className="border-t border-gray-800 w-48 mx-auto"></div>


                <p className="text-gray-500 text-xs">
                    © {new Date().getFullYear()} CodeAlpha E-Store. All rights reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer