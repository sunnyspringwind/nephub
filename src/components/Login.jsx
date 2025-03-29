import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchData, postData } from "../utils/api";
import { jwtDecode } from "jwt-decode";
import logo from "../assets/logo.png";

function Login() {
  let [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Check if user is already logged in on component mount
  useEffect(() => {
    const userCredentials = JSON.parse(localStorage.getItem("userCredentials"));
    if (userCredentials && userCredentials.token) {
      try {
        // Decode the token to get roles
        const decodedToken = jwtDecode(userCredentials.token);
        
        // Check if token is expired
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          // Token expired, clear and stay on login page
          localStorage.removeItem("userCredentials");
          return;
        }
        
        // Check for admin role in token claims - fixed to match your token structure
        const isAdmin = decodedToken.role === 'Admin';
        
        // Redirect based on role
        if (isAdmin) {
          navigate("/admin-dashboard");
        } else {
          navigate("/user-dashboard");
        }
      } catch (error) {
        // If token decoding fails, clear localStorage and stay on login
        console.error("Error decoding token", error);
        localStorage.removeItem("userCredentials");
      }
    }
  }, []);

  const sendLoginRequest = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await postData("/api/auth/login", formData);
      
      if (response.status === 200) {
        // Store user data in localStorage
        localStorage.setItem("userCredentials", JSON.stringify(response.data));
        
        // Decode the token to get roles
        const userCredentials = JSON.parse(localStorage.getItem("userCredentials"));
        const decodedToken = jwtDecode(userCredentials.token);
        
        // Check for admin role in token claims - fixed to match your token structure
        const isAdmin = decodedToken.role === 'Admin';
        console.log(decodedToken.role);
        // Redirect based on role from token
        if (isAdmin) {      
          navigate("/admin-dashboard");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Error occurred during login", error);
      setError("Invalid email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendLoginRequest();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          to={"/"}
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-10 h-10 mr-2 rounded-md"
            src={logo}
            alt="logo"
          />
          <div className="relative flex items-center">
            <span className="text-yellow-400 text-2xl font-bold tracking-wider">
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

        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl dark:text-white">
              Sign in
            </h1>
            {error && (
              <div className="p-3 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                {error}
              </div>
            )}
            <form className="space-y-4 md:space-y-6" onSubmit={(e) => handleSubmit(e)}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="name@example.com"
                  onChange={handleChange}
                  value={formData.email}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  onChange={handleChange}
                  value={formData.password}
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div>
                </div>
                <Link
                  to={"/forgot-password"}
                  className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forgot password?
                </Link>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full text-white bg-primary-600 hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-secondary-burgundy-600 dark:hover:bg-primary-700"
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don't have an account yet?
                <Link
                  to="/register"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;