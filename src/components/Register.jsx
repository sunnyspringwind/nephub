import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { postData } from "../utils/api";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";


function Register() {
  let [error, setError] = useState("");
  let [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  //save to api
  const postRegisterRequest = async() => {
    // destructure and removes key value saves as requestData
    var {["confirmPassword"]: _, ...requestData} = formData;
  
    try {
      const response = await fetch("http://localhost:5214/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
      });

      const result = await response.json();

      if (response.ok) {
      navigate("/login");
      } else {
      setError(result.message || "An unexpected error occurred");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    }
  }
    

  const getCredentialsFromLocalStorage = () => {
    const storedData = localStorage.getItem("userCredentials");
    if (storedData) {
      const data = JSON.parse(storedData);
      setFormData(data);
    }
  };

  // useEffect(() => {
  //   getCredentialsFromLocalStorage();
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.password === formData.confirmPassword ? postRegisterRequest() : alert("confirm password do not match!")
    // localStorage.setItem("userCredentials", JSON.stringify(formData));
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
                         className="w-8 h-8 mr-2"
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
              <div className="p-6 space-y-4 md:space-y-4 sm:p-6">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl dark:text-white">
                  Join NepHub
                </h1>
                {error && (
              <div className="p-3 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                {error}
              </div>
            )}
                <form className="space-y-2 md:space-y-2"
                 onSubmit={(e) => handleSubmit(e)}>
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
                      maxLength={50}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="username"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      id="username"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                      placeholder="Username"
                      onChange={handleChange}
                      value={formData.username}
                      maxLength={20}
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
                      maxLength={20}
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="confirmPassword"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      placeholder="••••••••"
                      onChange={handleChange}
                      value={formData.confirmPassword}
                      maxLength={20}
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                      required
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="terms&conditions"
                          aria-describedby="terms&conditions"
                          type="checkbox"
                          className="w-4 h-4 border border-gray-300 rounded bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
                          required
                        />
                      </div>
                      <div className="ml-3 text-sm">
                        <label
                          htmlFor="terms&conditions"
                          className="text-gray-500 dark:text-gray-300"
                        >
                          I agree to sell my soul.
                        </label>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-primary-600 hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-secondary-burgundy-600 dark:hover:bg-primary-700"
                  >
                    Register
                  </button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account yet?
                    <Link
                      to="/login"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Login
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
  );
}

export default Register;

         // <div className="flex fixed inset-0  justify-center items-center bg-[url('https://wallpaper.forfun.com/fetch/09/09d88fd7d089e7e64e091ed08e814b9b.jpeg')] bg-cover bg-center">
    //   <form
    //     onSubmit={(e) => handleSubmit(e)} //
    //     className="grid gap-[1.5rem] w-[350px] place-self-center "
    //   >
    //     <h1 className="text-4xl text-center m-4  text-blue-500 font-semibold">
    //       Register
    //     </h1>
    //     <input
    //       className="border-2 bg-blue-100 border-blue-400 text-xl indent-5  w-full rounded-md "
    //       type="email"
    //       name="email"
    //       placeholder="Email"
    //       onChange={handleChange}
    //       value={formData.email}
    //     />
    //     <input
    //       className="border-2 bg-blue-100 border-blue-400 text-xl indent-5  w-full rounded-md "
    //       type="text"
    //       name="username"
    //       placeholder="Username"
    //       onChange={handleChange}
    //       value={formData.username}
    //     />

    //     <input
    //       className="border-2 bg-blue-100 border-blue-400 text-xl indent-5  w-full rounded-md"
    //       type="password"
    //       name="password"
    //       placeholder="New Password"
    //       onChange={handleChange}
    //       value={formData.password}
    //     />

    //     <input
    //       className="border-2 bg-blue-100 border-blue-400 text-xl indent-5  w-full rounded-md"
    //       type="password"
    //       name="confirmPassword"
    //       placeholder="Confirm Password"
    //       onChange={handleChange}
    //       value={formData.confirmPassword}
    //     />

    //     <div className="flex justify-center">
    //       <input id="rememberMe" className="" type="checkbox" />
    //       <label htmlFor="rememberMe" className="ml-3 ">
    //         I agree terms and conditions
    //       </label>
    //     </div>
    //     <button
    //       type="submit"
    //       className="w-full bg-blue-500 text-xl rounded-md p-1"
    //     >
    //       Register
    //     </button>
    //     <Link to="/login" className="font-poppins place-self-center">
    //       Already a member? Login Page
    //     </Link>
    //   </form>
    // </div>