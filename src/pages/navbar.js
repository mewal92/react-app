import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import { useAuth } from '../services/auth.js'; 
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase-config.js';


const handleSignOut = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Error signing out: ", error);
    }
};


function Navbar() {
    const { currentUser } = useAuth();

    if (!currentUser) {
        return null;
    }
    return (
<nav className="navbar bg-primary">
<div className="container">
  <div className="navbar-content">
    <div className="navbar-nav me-auto">
      <Link className="nav-link" to="/bookings">EVENTS</Link>
      <Link className="nav-link" to="/profile">PROFILE</Link>
      
    </div>
    <div className="navbar-nav right">
    <Link className="nav-link" to="/signout" onClick={handleSignOut}>SIGN OUT </Link>
    </div>
  </div>
</div>

</nav>

);
    }
    
export default Navbar;