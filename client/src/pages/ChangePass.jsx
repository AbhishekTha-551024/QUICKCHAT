import React, { useContext, useState, useEffect } from 'react';
import { AppContent } from '../context/AppContext';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ChangePass = () => {
  const [newpassword, setNewpassword] = useState('');
  const [renewpassword, setRenewpassword] = useState('');
  const { backUrl, userEmail, verify } = useContext(AppContent);
  const navigate = useNavigate();

  useEffect(() => {
    if (!verify) navigate("/forgot-password"); // direct URL blocked
  }, [verify, navigate]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (newpassword !== renewpassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(backUrl + '/api/reset-password', {
        newpassword,
        email: userEmail
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/');
      } else {
        toast.error(res.data.message || "Changing password failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background with Gradient Orbs */}
      <div className="absolute inset-0">
        {/* Main gradient background */}
        <div 
          className="absolute inset-0 opacity-80"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(139, 92, 246, 0.3) 0%, rgba(59, 7, 100, 0.4) 35%, rgba(0, 0, 0, 0.8) 70%, #000000 100%)'
          }}
        ></div>
        
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-indigo-600 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-purple-800 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        {/* Left side - Logo */}
        <div className="hidden lg:flex flex-col items-center justify-center w-1/2 text-white pr-12">
          <div className="mb-8">
            {/* Chat Bubble Icon */}
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-white bg-clip-text text-transparent">
            QuickChat
          </h1>
          <p className="text-xl text-purple-200 text-center max-w-md">
            Secure password reset
          </p>
        </div>

        {/* Right side - Change Password Form */}
        <div className="w-full max-w-md lg:w-1/2 lg:max-w-lg">
          {/* Mobile Logo */}
          <div className="lg:hidden flex flex-col items-center mb-8 text-white">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse mb-4">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-white bg-clip-text text-transparent">
              QuickChat
            </h1>
          </div>

          {/* Glass Card */}
          <div 
            className="backdrop-blur-md bg-black/20 border border-white/10 p-8 rounded-3xl shadow-2xl"
            style={{ 
              backdropFilter: 'blur(16px)',
              background: 'rgba(30, 30, 40, 0.8)'
            }}
          >
            <h2 className="text-3xl font-bold mb-3 text-white text-center">
              Change Password
            </h2>
            <p className="text-gray-300 text-center mb-8 leading-relaxed">
              Enter a new password below to secure your account
            </p>

            <form onSubmit={onSubmitHandler} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="newpassword" className="block text-sm font-medium text-gray-300">
                  New Password
                </label>
                <input
                  type="password"
                  id="newpassword"
                  placeholder="Enter new password"
                  value={newpassword}
                  onChange={e => setNewpassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="renewpassword" className="block text-sm font-medium text-gray-300">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="renewpassword"
                  placeholder="Re-enter new password"
                  value={renewpassword}
                  onChange={e => setRenewpassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
              >
                Reset Password
              </button>

              <div className="text-center pt-4">
                <p className="text-gray-400 text-sm">
                  Remember your password?{' '}
                  <a 
                    href="/login" 
                    className="text-purple-400 hover:text-purple-300 font-medium hover:underline transition-colors duration-300"
                  >
                    Sign in here
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Custom Toast Styling */}
      <ToastContainer 
        position="top-center" 
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastClassName="backdrop-blur-md bg-gray-900/90 border border-white/10 rounded-xl"
        bodyClassName="text-white"
      />
    </div>
  );
};

export default ChangePass;