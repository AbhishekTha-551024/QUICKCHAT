import React, { useContext, useState } from "react";
import { AppContent } from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Signup = () => {
  const { backUrl, setLoggedIn, setUserData } = useContext(AppContent);
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    try {
      setLoading(true);
      axios.defaults.withCredentials = true;
      const res = await axios.post(backUrl + "/api/signup", {
        name,
        email,
        password,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        setLoggedIn(true);
         localStorage.setItem("userName", res.data.name);
         localStorage.setItem("token", res.data.token)
        navigate("/");
      } else {
        toast.error(res.data.message || "Signup failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-black">
      
      {/* Animated Background Orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-indigo-500/20 rounded-full blur-2xl animate-pulse"></div>
      
      {/* Main Container */}
      <div className="relative z-10 w-full max-w-6xl flex items-center justify-between">
        
        {/* Left Side - Logo */}
        <div className="flex-1 flex flex-col items-center justify-center text-white">
          <div className="mb-8 transform hover:scale-110 transition-transform duration-300">
            <div className="w-32 h-32 bg-gradient-to-br from-purple-400 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/25">
              <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 6h-2l-1.5-1.5c-.28-.28-.61-.45-1-.45s-.72.17-1 .45L14 6h-4L8.5 4.5c-.28-.28-.61-.45-1-.45s-.72.17-1 .45L5 6H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM7 14c0-2.76 2.24-5 5-5s5 2.24 5 5-2.24 5-5 5-5-2.24-5-5z"/>
                <circle cx="12" cy="14" r="3"/>
              </svg>
            </div>
          </div>
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            QuickChat
          </h1>
        </div>

        {/* Right Side - Signup Form */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="backdrop-blur-xl bg-gray-800/20 border border-gray-700/30 rounded-2xl p-8 shadow-2xl">
              
              <h2 className="text-2xl font-semibold text-white mb-6 text-center">
                Sign up
              </h2>

              <form onSubmit={onSubmitHandler} className="space-y-4">
                <div>
                  <input
                    type="text"
                    id="name"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-200"
                    required
                  />
                </div>

                <div>
                  <input
                    type="email"
                    id="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-200"
                    required
                  />
                </div>

                <div>
                  <input
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-200"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? "Creating..." : "Create Account"}
                </button>

                <div className="flex items-center mt-4">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    className="mr-2 w-4 h-4 text-purple-500 bg-gray-800/50 border-gray-600 rounded focus:ring-purple-500 focus:ring-1"
                    required
                  />
                  <label htmlFor="agreeTerms" className="text-sm text-gray-400">
                    Agree to the terms of use & privacy policy.
                  </label>
                </div>

                <div className="text-center mt-6 text-sm text-gray-400">
                  Already have an account?{' '}
                  <Link to="/login" className="text-purple-400 hover:text-purple-300 font-semibold hover:underline transition-colors">
                    Login here
                  </Link>
                </div>
              </form>

              <ToastContainer 
                position="top-center" 
                autoClose={2000}
                theme="dark"
                toastClassName="bg-gray-800 text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;