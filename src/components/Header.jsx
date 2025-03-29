import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Header() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Get user credentials only once on component mount
  useEffect(() => {
    const storedData = localStorage.getItem("userCredentials");
    if (storedData) {
      try {
        const data = JSON.parse(storedData);
        const { token, ...userProfile } = data;
        setLoggedIn(true);
        setUserInfo(userProfile);
      } catch (error) {
        console.error("Error parsing user credentials:", error);
      }
    }
  }, []);

  // Handle clicks outside dropdown to close it
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("userCredentials");
    setLoggedIn(false);
    setUserInfo({});
    setDropdownOpen(false);
    navigate("/");
  };

  // Get user initial for avatar
  const getUserInitial = () => {
    return userInfo.username ? userInfo.username[0].toUpperCase() : "U";
  };

  return (
    <header className="bg-gradient-to-r from-slate-900 to-slate-800 sticky top-0 z-40 shadow-lg border-b border-red-500/30">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-500 rounded-lg opacity-0 group-hover:opacity-100 blur transition duration-200 group-hover:duration-300"></div>
          <div className="relative flex items-center">
             <img
                        className="w-10 h-10 mr-2 rounded-md"
                        src={logo}
                        alt="logo"
                      />
            <span className="text-white text-2xl font-bold tracking-wider">
              Nep<span className="text-red-500">Hub</span>
            </span>
            <svg 
              className="h-8 w-8 ml-1 text-red-500" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M12 3L4 9V21H20V9L12 3Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            </svg>
          </div>
        </Link>

        {/* Navigation Links - Desktop */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/timeline"
            className="text-gray-300 hover:text-white hover:underline underline-offset-4 decoration-red-500 transition duration-200"
          >
            Timeline
          </Link>
          <Link
            to="/hall-of-fame"
            className="text-gray-300 hover:text-white hover:underline underline-offset-4 decoration-red-500 transition duration-200"
          >
            Profiles
          </Link>
          
          {loggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-md hover:from-red-600 hover:to-red-800 transition duration-300 shadow-md"
              >
                <span className="font-medium">{userInfo.username || "User"}</span>
                {userInfo.profilePicture ? (
                  <img 
                    src={userInfo.profilePicture} 
                    alt={userInfo.username}
                    className="w-8 h-8 rounded-full object-cover border-2 border-white"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold border-2 border-white">
                    {getUserInitial()}
                  </div>
                )}
                <svg 
                  className={`w-4 h-4 ml-1 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* User Dropdown */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-md shadow-lg border border-red-500/30 overflow-hidden transition-all duration-200 z-50">
                  <Link
                    to="/user-dashboard"
                    className="block px-4 py-3 text-gray-200 hover:bg-slate-700 transition duration-200"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span>My Dashboard</span>
                    </div>
                  </Link>
                  <div className="border-t border-slate-700"></div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-3 text-gray-200 hover:bg-red-600 transition duration-200"
                  >
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span>Logout</span>
                    </div>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link
                to="/login"
                className="px-4 py-2 text-white font-medium rounded-md border border-red-500 hover:bg-red-500/10 transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-700 text-white font-medium rounded-md hover:from-red-600 hover:to-red-800 transition duration-300 shadow-md"
              >
                Register
              </Link>
            </div>
          )}
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            {menuOpen ? (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            ) : (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            )}
          </svg>
        </button>
      </div>
      
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-slate-800 border-b border-red-500/30 shadow-lg">
          <div className="container mx-auto px-4 py-3 flex flex-col space-y-4">
            <Link
              to="/timeline"
              className="text-gray-300 hover:text-white py-2 hover:bg-slate-700 px-3 rounded-md transition duration-200"
              onClick={() => setMenuOpen(false)}
            >
              Timeline
            </Link>
            <Link
              to="/hall-of-fame"
              className="text-gray-300 hover:text-white py-2 hover:bg-slate-700 px-3 rounded-md transition duration-200"
              onClick={() => setMenuOpen(false)}
            >
              Profiles
            </Link>
            
            {loggedIn ? (
              <div className="flex flex-col space-y-2">
                <Link
                  to="/user-dashboard"
                  className="flex items-center gap-2 py-2 px-3 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-md"
                  onClick={() => setMenuOpen(false)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>{userInfo.username || "User"}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 py-2 px-3 text-white bg-red-600 hover:bg-red-700 rounded-md transition duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex flex-col space-y-3">
                <Link
                  to="/login"
                  className="py-2 px-3 text-center text-white rounded-md border border-red-500 hover:bg-red-500/10 transition duration-300"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="py-2 px-3 text-center bg-gradient-to-r from-red-500 to-red-700 text-white rounded-md hover:from-red-600 hover:to-red-800 transition duration-300"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}