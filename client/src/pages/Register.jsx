import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import logo from "../assets/sun-life-financial-logo.png";
import background from "../assets/bg-image.jpg";

const Register = () => {

    const API_BASE_URL = import.meta.env.VITE_BASE_URI_AUTH;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setfullName] = useState("");
    const [error, setError] = useState("");
    const [registrationSuccess, setRegistrationSuccess] = useState(false);

     const handleRegistration = async (e) => {
       e.preventDefault();
       try {
         const userData = { fullName, email, password };
         const response = await axios.post(`${API_BASE_URL}/signup`, userData);

         console.log("User Registered:", response.data);
         setRegistrationSuccess(true);
         toast.success("Registration successful!");
         window.location.href = "/login";
       } catch (error) {
         setError("Invalid email or password.");
       }
     };
    
  return (
    <>
      <div
        style={{ backgroundImage: `url(${background})` }}
        className="min-h-screen py-4 px-4 sm:px-12 flex justify-center items-center mx-auto bg-cover bg-center bg-no-repeat"
      >
        <div className="max-w-[550px] flex-none w-full bg-white border border-black/10 p-6 sm:p-10 lg:px-10 lg:py-14 rounded-2xl dark:bg-darklight dark:border-darkborder">
          <img src={logo} className="mx-auto dark-logo h-44 logo" alt="logo" />
          <h3 className="mb-2 text-xl font-semibold text-center dark:text-white">
            New Account Registration
          </h3>
          <div className="flex items-center mb-7">
            <div className="w-full h-[2px] bg-black/10 dark:bg-darkborder"></div>
          </div>
          <form
            onSubmit={handleRegistration}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                Full Name:
              </label>
              <input
                type="text"
                placeholder="Enter Full Name"
                className="form-input"
                required
                value={fullName}
                onChange={(e) => setfullName(e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                Email Address:
              </label>
              <input
                type="text"
                placeholder="Enter Email Address"
                className="form-input"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
                Password:
              </label>
              <input
                type="password"
                placeholder="Password"
                className="form-input"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn sm:col-span-2 w-full py-3.5 text-base bg-warning border border-warning rounded-md text-black transition-all duration-300 hover:bg-warning/[0.85] hover:border-warning/[0.85]"
            >
              Create an account
            </button>
          </form>
          <p className="mt-5 text-center text-muted dark:text-darkmuted">
            Already a member?{" "}
            <Link to="/login" className="text-blue-500 dark:text-white">
              Sign In
            </Link>
          </p>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Register;
