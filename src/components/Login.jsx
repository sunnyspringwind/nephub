import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Login() {
  let [formData, setFormData] = useState({
    username: "",
    password: "",
  });

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
    <div className="flex fixed inset-0  justify-center items-center bg-[url('https://imgcdn.stablediffusionweb.com/2024/5/19/0c31c840-6e2a-41cb-b589-d92e945d8086.jpg')] bg-cover bg-center">
      <form
        onSubmit={(e) => handleSubmit(e)} //
        className="grid gap-[1.5rem] w-[350px]"
      >
        <h1 className="text-4xl text-center font-poppins text-blue-700 ">
          Login
        </h1>
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
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
        />
        <div className="flex justify-center">
          <input id="rememberMe" className="" type="checkbox" />
          <label htmlFor="rememberMe" className="ml-3 ">
            Remember Me
          </label>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-xl rounded-md p-1"
        >
          Login
        </button>
        <Link to="/register" className="font-poppins place-self-center">
          New? Register Page
        </Link>
      </form>
    </div>
  );
}

export default Login;
