import React, { useContext } from "react";
import { AppContent } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { userData } = useContext(AppContent);
const userName = localStorage.getItem("userName");
const navigate = useNavigate();
const Ischat= ()=>{
  const token= localStorage.getItem("token");
  if(!token){
    navigate("/login");
    return;
  }
  navigate("/RoomChat");
}
  return (
    <div className="w-full relative">
      {/* Main Content - Removed min-h-screen and background since Home handles it */}
      <div className="flex flex-col items-center justify-center px-4">
        {/* QuickChat Logo */}
        <div className="mb-12 flex flex-col items-center">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-700 rounded-3xl flex items-center justify-center shadow-2xl animate-pulse mb-6">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 bg-white rounded-full"></div>
              <div className="w-3 h-3 bg-white rounded-full"></div>
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-400 to-white bg-clip-text text-transparent mb-2">
            QuickChat
          </h1>
          <p className="text-purple-200 text-xl">
            Chat anytime, anywhere
          </p>
        </div>

        {/* Welcome Section */}
        <div className="text-center max-w-4xl mx-auto">
          {/* Welcome Message */}
          <h2 className="text-4xl sm:text-6xl font-extrabold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            Welcome {userName || "Guest"}
          </h2>

          {/* Description */}
          <p className="text-gray-300 max-w-2xl text-lg md:text-xl mb-12 leading-relaxed">
            Empowering connections with{" "}
            <span className="font-semibold text-purple-400">instant communication</span>.  
            Your premium platform for seamless conversations and meaningful connections.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
            onClick={Ischat}
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 text-lg cursor-pointer">
              Start Chatting
            </button>
            
            <button className="bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-4 rounded-xl border border-white/20 hover:border-white/30 transition-all duration-300 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-gray-400 text-lg cursor-pointer">
              Learn More
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div 
          className="mt-20 backdrop-blur-md bg-black/20 border border-white/10 p-8 rounded-3xl shadow-2xl max-w-4xl mx-auto"
          style={{ 
            backdropFilter: 'blur(16px)',
            background: 'rgba(30, 30, 40, 0.6)'
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Lightning Fast</h3>
              <p className="text-gray-300 text-sm">Instant messaging with real-time delivery</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Secure</h3>
              <p className="text-gray-300 text-sm">End-to-end encrypted conversations</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Global</h3>
              <p className="text-gray-300 text-sm">Connect with people worldwide</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;