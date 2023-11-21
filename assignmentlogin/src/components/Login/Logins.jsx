import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../../redux/user/userSlice';
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from "react-feather";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({});
  const { loading } = useSelector((state) => state.user);
  const [visible, setVisible] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
  

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
     
      const loginData = {
        email: formData.email,
        password: formData.password,
      };

      const config = {
        method: "post",
        url: "https://assignment-6-761u.vercel.app/api/users/login",
        headers: {
          "Content-Type": "application/json",
        },
        data: loginData,
      };

      dispatch(signInStart());

      const response = await axios(config);

      toast.success("Logined Successfully", {position:"top-center"})
      dispatch(signInSuccess(response.data));

      if (response.data.success === false) {
        dispatch(signInFailure());
        return;
      }

      navigate("/home");
    } catch (error) {
      dispatch(signInFailure(error));
      toast.error(" Please Check the email or Password", {position:"top-center"})
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      if (/^\s*$/.test(formData.name) || /^\s*$/.test(formData.email) || /^\s*$/.test(formData.password)) {
        toast.error("Empty Space Found");
        return;
      }
      const registerData = {
        name:formData.name,
        email: formData.email,
        password: formData.password,
      };      
      dispatch(signInStart());

      const config = {
        method: "post",
        url: "https://assignment-6-761u.vercel.app/api/users/register",
        headers: {
          "Content-Type": "application/json",
        },
        data:registerData,
      };

      const response = await axios(config);
      
      toast.success("Registered Successfully", {position:"top-center"})
      setIsLogin(true);
      dispatch(signInSuccess(response.data));

      if (response.data.success === false) {
        return;
      }
    } catch (error) {
      dispatch(signInFailure(error));
      toast.error("Registeration failed", {position:"top-center"})
    }
  };

  const handleSubmit = isLogin ? handleLogin : handleSignUp;

  
  return (
    <div className="flex justify-between items-center px-10 max-sm:pl-0 max-sm:px-1 max-sm:mx-3 pl-40 h-screen">
      <div className="flex flex-1 justify-center max-sm:hidden">
        <p className="text-6xl font-bold gradient poppins">
          Welcome to {isLogin ? "Login" : "Sign Up"}
        </p>
      </div>
      <div className="flex flex-1 justify-center items-center py-10 bg-white shadow-lg rounded-lg max-sm:mx-0 mx-28">
        <div className="w-full max-sm:px-6 px-16">
          <h1 className="text-3xl font-semibold text-[#30387D] gilroy">
            {isLogin ? "Login" : "Sign Up"}
          </h1>
          <form  onSubmit={handleSubmit} className="flex flex-col gap-4 pt-5">
            {isLogin === false && (
              <>
                <div className="flex justify-between">
                <label
                  htmlFor="name"
                  className="block text-sm text-[#30387D] poppins"
                >
                  Username
                </label>
                </div>
                <input
                  type="text"
                  placeholder="Your name here"
                  id="name"
                  className="bg-slate-100 p-3 rounded-lg ring-1 ring-gray-500 hover:placeholder:text-[#30387D] placeholder:italic"
                  onChange={handleChange}
                  />
              </>
            )}
            <div className="flex justify-between">
            <label
              htmlFor="email"
              className="block text-sm text-[#30387D] poppins"
            >
              Email
            </label>
            </div>

            <input
              type="email"
              placeholder="Email address here"
              id="email"
              className="bg-slate-100 p-3 rounded-lg ring-1 ring-gray-500 hover:placeholder:text-[#30387D] placeholder:italic"
              onChange={handleChange}
            />

            <div className="flex justify-between">
            <label
              htmlFor="password"
              className="block text-sm text-[#30387D] poppins "
            >
              Password
            </label>
            <div onClick={() => setVisible(!visible)} className='cursor-pointer '>
                {visible ? <EyeOff/> : <Eye />}
            </div>
            </div>
            <input
              type={visible ? 'password' : 'text'}
              placeholder="************"
              id="password"
              className="bg-slate-100 p-3 rounded-lg ring-1 ring-gray-500 hover:placeholder:text-[#30387D]"
              onChange={handleChange}
            />
            {isLogin ? (
              <button
                disabled={loading}
                className="bg-[#6A82FF] text-lg font-bold gilroy text-white p-3 rounded-lg hover:bg-[#536CF0] focus:bg-[#3E51B4]"
              >
                {loading ? "Loading..." : "Login"}
              </button>
            ) : (
              <button
                disabled={loading}
                className="bg-[#6A82FF] text-lg font-bold gilroy text-white p-3 rounded-lg hover:bg-[#536CF0] focus:bg-[#3E51B4]"
              >
                {loading ? "Loading..." : "Sign Up"}
              </button>
            )}

          </form>
          <div className="flex gap-2 mt-5">
            <div
              onClick={toggleForm}
              className="underline cursor-pointer text-[#4D74F9] gilroy font-bold"
            >
              {isLogin ? "Sign Up" : "Login"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;