import React, { useState } from 'react';
import './App.css';
import avatar from '../images/avatar.png';
import loginService from '../services/loginService.js';
import registerService from '../services/registerService.js'; 
import { useNavigate } from 'react-router-dom';
import bookings from './bookings.js'
import { auth, db, app } from '../services/firebase-config.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import header from '../images/header.png';

const Modal = ({ id, title, children, onClose, show }) => {
    const displayStyle = show ? 'block' : 'none'; 
    return (
      <div id={id} className="modal" style={{ display: displayStyle }}>
        <span onClick={onClose} className="close" title="Close Modal">&times;</span>
        <div className="modal-content animate">
          <h2>{title}</h2>
          {children}
        </div>
      </div>
    );
  };
  
  const LoginAndRegister = () => {
    const navigate = useNavigate();


  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const showLoginModal = () => setIsLoginOpen(true);
  const showRegisterModal = () => setIsRegisterOpen(true);
  const closeLoginModal = () => setIsLoginOpen(false);
  const closeRegisterModal = () => setIsRegisterOpen(false);
  const [email, setLoginUsername] = useState('');
  const [password, setLoginPassword] = useState('');
  const [loginStatusMessage, setLoginStatusMessage] = useState(''); 
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registrationStatusMessage, setRegistrationStatusMessage] = useState(''); 
  


  const handleRegister = async (event) => {
  event.preventDefault(); 

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
    const user = userCredential.user;

    console.log('Firebase registration successful:', user);

    const userData = {
        uid: user.uid,
        email: user.email, 
        name: registerName, 
      };
    
      console.log('Sending additional user details to backend:', userData);
    await fetch('https://34.0.243.73:81/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    toast.success("Registration completed!");
    closeRegisterModal();
    showLoginModal();
 
  } catch (error) {
    console.error('Registration failed:', error.message);
    toast.error(`Registration failed: ${error.message}`);
  }
};
  

const handleLogin = async (event) => {
  event.preventDefault();

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    console.log('Firebase login successful:', user);

    navigate('/bookings'); 
  } catch (error) {
    console.error('Login failed:', error.message);
    toast.warn(`Login failed: ${error.message}`);
  }
};
  

  return (
    <div>
        {loginStatusMessage && <div style={{ textAlign: 'center', color: '#D8000C', marginTop: '10px' }}>{loginStatusMessage}</div>}
        {registrationStatusMessage && <div style={{ textAlign: 'center', color: '#D8000C', marginTop: '10px' }}>{registrationStatusMessage}</div>}
        
        <div className="startPageStuff">
      <div className="header">
      <img src={header} alt="header" className='headerimg' />
        
      </div>
  
      <div className="centerbuttons">
       <button onClick={showLoginModal} className="buttons">Login</button>
        <button onClick={showRegisterModal} className="buttons">Register</button>
      </div></div>
      

        {isLoginOpen && (
          <Modal
            id="id01"
            title="Login to BookingBee"
            onClose={closeLoginModal}
            show={isLoginOpen} 
          >
         
          <form className="modal-content animate" onSubmit={handleLogin}>
            <div className="imgcontainer">
              <img src={avatar} alt="Avatar" className="avatar" />
            </div>

            <div className="container">
              <label htmlFor="email" className="loginText">E-mail</label>
              <input type="text" placeholder="Enter Username" name="email" required value={email} onChange={(e) => setLoginUsername(e.target.value)} />

              <label htmlFor="password" className="loginText">Password</label>
              <input type="password" placeholder="Enter Password" name="password" required value={password} onChange={(e) => setLoginPassword(e.target.value)} />

              <div className="bottom-container">
                <label className="remember-me">
                  <input type="checkbox" checked={true} name="remember" /> Remember me
                </label>
                <span className="psw"><a href="#">Forgot password?</a></span>
              </div>
            </div>

            <div className="container" style={{backgroundColor: "#ffe5f1"}}>
              <button type="submit" className="loginbtn" >Login</button>
            
            </div>
          </form>
        </Modal>
      )}

      {isRegisterOpen && (
        <Modal
          id="id02"
          title="Register to BookingBee"
          onClose={closeRegisterModal}
          show={isRegisterOpen} 
        >
          <form className="modal-content animate" onSubmit={handleRegister}>
            <div className="container">
              <label htmlFor="uname" className="loginText"><b>E-mail</b></label>
              <input type="text" placeholder="Enter Username" name="uname" required value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)}/>
              <label htmlFor="name" className="loginText"><b>Name</b></label>
              <input type="text" placeholder="Your name" name="name" required value={registerName} onChange={(e) => setRegisterName(e.target.value)}/>
              <label htmlFor="psw" className="loginText"><b>Password</b></label>
              <input type="password" placeholder="Enter Password" name="psw" required value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)}/>
            </div>

            <div className="container" style={{backgroundColor: "#f1f1f1"}}>
              <button type="submit">Register</button>
            </div>
          </form>
        </Modal>
        
      )}
 
    </div>
  );
};

export default LoginAndRegister;