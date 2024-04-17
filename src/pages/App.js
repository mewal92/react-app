import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginAndRegister from './loginAndRegister.js';
import Profile from './profile.js';
import Bookings from './bookings.js';
import Navbar from './navbar.js';
import { AuthProvider } from '../services/auth.js';
import Footer from './footer.js';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const App = () => {
    return (
      
      <AuthProvider>
         <ToastContainer />
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<LoginAndRegister />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signout" element={<LoginAndRegister />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      </AuthProvider>

      
 
    );
  }
  
   

export default App;
