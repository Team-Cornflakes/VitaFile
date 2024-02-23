import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../src/assets/Logo_new.png';
import logo1 from '../src/assets/google.png';
import logo2 from '../src/assets/ehr2_black.png'; 
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCvDH80aQZvu_IpZykRN0Vr_kdVZUqujhU",
  authDomain: "vitafile.firebaseapp.com",
  projectId: "vitafile",
  storageBucket: "vitafile.appspot.com",
  messagingSenderId: "245647433242",
  appId: "1:245647433242:web:3ca0111c2801d0e0863ba3",
  measurementId: "G-SD6WPG017Z"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

function loginWithGoogle() {
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      console.log(result.user); 
    }).catch((error) => {
      console.log(error.message);
    });
}

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (event) => {
      event.preventDefault();

      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      const response = await fetch('http://localhost:8000/token/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              username: username,
              password: password,
          }),
      });
  
      const data = await response.json();
  
      if (response.ok && data.access) {
          localStorage.setItem('token', data.access); 
          navigate('/family');
      }
  };

  const handleLoginNavigation = () => {
      navigate('/signup'); 
  };

  return (
      <div className="maincontainer999">
          <div className="leftcontainer999">
              <div className="login-container">
                  <div className="login-card22">
                      <div className="logo-container">
                          <img src={logo} className="logo" alt="Logo" />
                          <span className="logo-text"><h1>VitaFile</h1></span>
                      </div>
                      <h2>Login to your account</h2>
                      <br />
                      <form className="login-form" onSubmit={handleLogin}>
                          <div className="input-group">
                              <label htmlFor="username"></label>
                              <input type="text" id="username" name="username" placeholder="Username" required />
                          </div>
                          <div className="input-group">
                              <label htmlFor="password"></label>
                              <input type="password" id="password" name="password" placeholder="Password" required />
                          </div>
                          <div className="footer-group">
                              <button type="submit" className="login-button" onClick={handleLogin}>Login</button>
                              <br />
                              <div className="media-options">
                                  <button type="button" className="login-button1" onClick={loginWithGoogle}>
                                      <img src={logo1} className="logo1" alt="Google logo" />
                                      Login with Google
                                  </button>
                              </div>
                              <p>Don't have an account? <span onClick={handleLoginNavigation} className="signup-link">Signup</span></p>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
          <div className="rightcontainer999">
                <img src={logo2} className="logo245" alt="Logo2" />
            </div>
      </div>
  );
};

export default Login;
