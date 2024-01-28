import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import logo from '../src/assets/Logo1.png';
import logo1 from '../src/assets/google.png';
import logo2 from '../src/assets/logo2.png'; // Import the background image

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
        navigate('/signup'); // Navigate to the signup page
    };

    return (
        <div>
            <div className="left-container">
                <div className="login-container">
                    <div className="login-card">
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
                                    <button type="button" className="login-button1">
                                        <img src={logo1} className="logo1" alt="Google logo" />
                                        Login with Google
                                    </button>
                                </div>
                                <p>Already have an account? <span onClick={handleLoginNavigation} className="signup-link">Signup</span></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="right-container">
                <div className="image-container" style={{ backgroundImage: `url(${logo2})` }}>
                    {/* Image container content */}
                </div>
            </div>
        </div>
    );
};

export default Login;
