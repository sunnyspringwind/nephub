import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { postData } from "../utils/api";

function Register() {
  let [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  //save to api
  postData("/api/auth/register", formData)

  const getCredentialsFromLocalStorage = () => {
    const storedData = localStorage.getItem("userCredentials");
    if (storedData) {
      const data = JSON.parse(storedData);
      setFormData(data);
    }
  };

  useEffect(() => {
    getCredentialsFromLocalStorage();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userCredentials", JSON.stringify(formData));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="flex fixed inset-0  justify-center items-center bg-[url('https://wallpaper.forfun.com/fetch/09/09d88fd7d089e7e64e091ed08e814b9b.jpeg')] bg-cover bg-center">
      <form
        onSubmit={(e) => handleSubmit(e)} //
        className="grid gap-[1.5rem] w-[350px] place-self-center "
      >
        <h1 className="text-4xl text-center m-4  text-blue-500 font-semibold">
          Register
        </h1>
        <input
          className="border-2 bg-blue-100 border-blue-400 text-xl indent-5  w-full rounded-md "
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
        />
        <input
          className="border-2 bg-blue-100 border-blue-400 text-xl indent-5  w-full rounded-md "
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          value={formData.username}
        />

        <input
          className="border-2 bg-blue-100 border-blue-400 text-xl indent-5  w-full rounded-md"
          type="password"
          name="password"
          placeholder="New Password"
          onChange={handleChange}
          value={formData.password}
        />

        <input
          className="border-2 bg-blue-100 border-blue-400 text-xl indent-5  w-full rounded-md"
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
          value={formData.confirmPassword}
        />

        <div className="flex justify-center">
          <input id="rememberMe" className="" type="checkbox" />
          <label htmlFor="rememberMe" className="ml-3 ">
            I agree terms and conditions
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-xl rounded-md p-1"
        >
          Register
        </button>
        <Link to="/login" className="font-poppins place-self-center">
          Already a member? Login Page
        </Link>
      </form>
    </div>
  );
}

export default Register;
