import { useState, useContext, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { userInfo, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null); 


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/users/search?q=${query}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      const data = await res.json();
      setSearchResults(data);
      setShowDropdown(true);
    } catch (error) {
      console.error("Search failed", error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto h-16 flex justify-between items-center px-4">
        
        <Link to="/" className="text-2xl font-bold text-blue-600">
          SocialApp
        </Link>

      
        {userInfo && (
          <div className="relative w-72" ref={searchRef}>
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={handleSearch}
              onFocus={() => searchResults.length > 0 && setShowDropdown(true)}
              className="w-full bg-gray-100 border border-gray-200 rounded-full px-4 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            
          
            {showDropdown && searchResults.length > 0 && (
              <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-100 max-h-80 overflow-y-auto z-50">
                {searchResults.map((user) => (
                  <Link
                    to={`/profile/${user.username}`}
                    onClick={() => {
                      setShowDropdown(false);
                      setSearchQuery("");
                    }}
                    key={user._id}
                    className="flex items-center gap-3 p-3 hover:bg-gray-50 transition border-b border-gray-50 last:border-0"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm">{user.name}</p>
                      <p className="text-xs text-gray-500">@{user.username}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
            {showDropdown && searchQuery && searchResults.length === 0 && (
              <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-lg border p-4 text-center text-sm text-gray-500 z-50">
                No users found
              </div>
            )}
          </div>
        )}

        {userInfo ? (
          <div className="flex items-center gap-4">
            <Link to={`/profile/${userInfo.username}`} className="font-medium text-gray-700 hover:text-blue-600 transition">
              {userInfo.name}
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-3">
            <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium">Login</Link>
            <Link to="/register" className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm font-medium">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;