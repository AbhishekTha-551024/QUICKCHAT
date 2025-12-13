import axios from 'axios';
import React, { useContext, useState, useRef, useEffect } from 'react';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContent } from '../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';

const VerifyEmail = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputsRef = useRef([]);
  const { backUrl, setLoggedIn, userEmail, setVerify, sentEmail } = useContext(AppContent);
  const navigate = useNavigate();

  useEffect(() => {
    if (!sentEmail) {
      navigate("/login");
    }
  }, [])

  // Handle input change
  const handleChange = (element, index) => {
    const value = element.value.replace(/[^0-9]/g, ""); // only digits
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (index < 5) inputsRef.current[index + 1].focus(); // move to next input
  };

  // Handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);

      if (index > 0) inputsRef.current[index - 1].focus(); // move to previous
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const enteredOtp = otp.join(""); // combine array to string
    if (enteredOtp.length < 6) {
      toast.error("Please enter complete OTP");
      return;
    }

    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(backUrl + '/api/otp-verify', { email: userEmail, otp: enteredOtp });

      if (res.data.success) {
        toast.success(res.data.message);
        setLoggedIn(true);
        setVerify(true); // if you want to log in after OTP verify
        navigate('/ChangePass')
      } else {
        toast.error(res.data.message || "Verification failed");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Server error");
      console.error(error);
    }
  };

  // Clear all inputs
  const clearOtp = () => setOtp(new Array(6).fill(""));

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
            Verify your email to continue
          </p>
        </div>

        {/* Right side - OTP Verification Form */}
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
              Verify Email
            </h2>
            <p className="text-gray-300 text-center mb-8 leading-relaxed">
              Enter the 6-digit verification code sent to your email
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6 items-center">
              {/* OTP Inputs */}
              <div className="flex gap-3 justify-center">
                {otp.map((value, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={value}
                    onChange={e => handleChange(e.target, index)}
                    onKeyDown={e => handleKeyDown(e, index)}
                    ref={el => inputsRef.current[index] = el}
                    className="w-14 h-14 bg-white/5 border border-white/20 text-white text-center text-2xl font-bold rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-purple-400"
                  />
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 w-full">
                <button 
                  type="submit" 
                  className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  Verify
                </button>
                <button
                  type="button"
                  onClick={clearOtp}
                  className="flex-1 bg-white/10 hover:bg-white/20 text-white font-medium py-3 px-6 rounded-xl border border-white/20 hover:border-white/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  Clear
                </button>
              </div>

              {/* Resend Link */}
              <div className="text-center pt-2">
                <p className="text-gray-400 text-sm">
                  Didn't receive the code?{' '}
                  <button 
                    type="button" 
                    className="text-purple-400 hover:text-purple-300 font-medium hover:underline transition-colors duration-300"
                  >
                    Resend
                  </button>
                </p>
              </div>

              {/* Back to Login */}
              <div className="text-center">
                <p className="text-gray-400 text-sm">
                  Want to try a different email?{' '}
                  <Link 
                    to="/login" 
                    className="text-purple-400 hover:text-purple-300 font-medium hover:underline transition-colors duration-300"
                  >
                    Back to Login
                  </Link>
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
}

export default VerifyEmail;