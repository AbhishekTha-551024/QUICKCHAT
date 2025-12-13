import { useState } from 'react'
import { Routes ,Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import VerifyEmail from './pages/VerifyEmail'
import ResetPassword from './pages/ForgetPassword'
import Signup from './pages/Signup'
import ForgetPassword from './pages/ForgetPassword'
import ChangePass from './pages/ChangePass'
import Products from './pagess/Products'
import AddProduct from './pagess/AddProduct'
import RoomChat from './io/RoomChat'
import Header from './Components/Header'
function App() {

  return (

    <div>
      {/* <RoomChat/> */}
      {/* <Header/> */}
      <Routes>
      <Route path='/RoomChat' element={<RoomChat/>}/>
        <Route path='/AddProduct' element={<AddProduct/>}/>
          <Route path='/products' element={<Products/>}/>
         <Route path='/ChangePass' element={<ChangePass/>}/>
        <Route path='/forgot-password' element={<ForgetPassword/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>} />
        <Route path='email-verify' element={<VerifyEmail/>} />
        <Route   path='reset-password' element={<ResetPassword/>} />
        
      </Routes>
    </div>
  )
}

export default App
