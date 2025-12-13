import React from 'react';
import Navbar from '../Components/Navbar';
import Header from '../Components/Header';
import Products from '../pagess/Products'
import RoomChat from '../io/RoomChat'

const Home = () => {
  return (
    <div className='min-h-screen bg-black relative overflow-hidden'>
      
      {/* Animated Background Orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-indigo-500/20 rounded-full blur-2xl animate-pulse"></div>
      <div className="absolute top-40 right-1/3 w-72 h-72 bg-pink-500/15 rounded-full blur-3xl animate-pulse delay-700"></div>
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <div className='flex flex-col items-center justify-center flex-1 px-4 text-center mt-24'>
          <Header />
          {/* <Products/> */}
          {/* <RoomChat/>  */}
        </div>
      </div>
    </div>
  )
}

export default Home;