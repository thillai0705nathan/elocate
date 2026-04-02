import React, { useState, ChangeEvent, FormEvent } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { setEmail, setPhoneNumber, setToken, setUser, setUserID, setUserName, setfullname } from "./auth";

const Signin: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const login = async () => {
    const toastId = toast.loading("Loading..");
    try {
      const response = await axios.post(
        "/api/auth/login",
        formData
      );
      const user = response.data;
      console.log(user);

      localStorage.setItem("user", JSON.stringify(user));

      toast.update(toastId, { render: "Login Successful!", type: "success", isLoading: false, autoClose: 3000 });

      if (user) {
        setUser(user);
        setEmail(user.email);
        setToken(user.token);
        setPhoneNumber(user.phoneNumber);
        setfullname(user.fullname);
        setUserID(user.id);
        if (user.username) {
          setUserName(user.username);
        }
      }

      window.location.href = "/";
    } catch (error: any) {
      console.error("Login failed:", error);
      toast.update(toastId, { render: "Login Failed. Please check your credentials.", type: "error", isLoading: false, autoClose: 3000 });
    }
  };




  return (
    <div className="flex items-center justify-center md:h-screen h-[70vh]">

      <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        <div className="flex flex-col justify-center p-8 md:p-14">
          <span className="mb-3 text-4xl font-bold">Welcome back</span>
          <span className="font-light text-gray-400 mb-8">
            Welcome back! Please enter your details
          </span>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              login();
            }}
            className="py-4"
          >
            <span className="mb-2 text-md">Email</span>
            <input
              type="email"
              className="w-full p-2 sign-field rounded-md placeholder:font-light placeholder:text-gray-500"
              name="email"
              id="email"
              placeholder="email"
              onChange={handleInputChange}
              value={formData.email}
              required
            />
            <div className="py-4">
              <span className="mb-2 text-md">Password</span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="password"
                className="w-full p-2 sign-field rounded-md placeholder:font-light placeholder:text-gray-500"
                onChange={handleInputChange}
                value={formData.password}
                required
              />
            </div>
            <div className="flex justify-between w-full py-4">
              <label className="flex items-center text-sm">
                <input
                  type="checkbox"
                  name="ch"
                  id="ch"
                  className="mr-2 p-1"
                  onClick={togglePasswordVisibility}
                />
                Show Password
              </label>
              <Link href="/forget-password" className="font-bold text-black">
                forgot password ?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-black mt-4 text-white p-2 rounded-lg mb-6 hover:bg-emerald-400 hover:text-black hover:border hover:border-gray-300"
            >
              Sign in
            </button>
          </form>

          <div className="text-center text-gray-400">
            Dont have an account?
            <Link
              href="/sign-up"
              className="font-bold text-black hover:text-emerald-300"
            >
              Sign up{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
