import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import logo from '../src/assets/Logo_black.png'; 
import logo1 from '../src/assets/google.png'; 
import logo2 from '../src/assets/ehr2_black.png'; 

const Signup = () => {
    const navigate = useNavigate();

    const handleLoginNavigation = async (event) => {
        event.preventDefault();

        const email = event.target.elements.emailid.value;
        const password = event.target.elements.password.value;
        const username = event.target.elements.emailid.value;
        const firstname = event.target.elements.firstname.value;
        const lastname = event.target.elements.lastname.value;
        const dob = event.target.elements.dob.value;
        const sex = event.target.elements.sex.value;
        const contact_no = event.target.elements.pno.value;

        const response = await fetch('http://localhost:8000/signup/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
                firstname,
                lastname,
                email,
                dob,
                sex,
                contact_no
            }),
        });

        const data = await response.json();

        if (response.ok) {
            console.log(data);
            navigate('/');
        } else {
            console.log(data.error);
        }
    };

    return (
        <div className="maincontainer999">
            <div className="leftcontainer999">
                <div className="logincontainer999">
                    <div className="login-card11111">
                        <div className="logo-container">
                            <img src={logo} className="logo" alt="Logo" />
                            <span className="logo-text"><h1>VitaFile</h1></span>
                        </div>
                        <h2>Create Account</h2>
                        <br />
                        <form className="login-form111" onSubmit={handleLoginNavigation}>
                            <div className="input-group">
                                <label htmlFor="emailid"></label>
                                <input type="email" id="emailid" name="emailid" placeholder="Email ID" required />
                            </div>
                            <div className="input-group">
                                <label htmlFor="firstname"></label>
                                <input type="text" id="firstname" name="firstname" placeholder="First Name" required />
                            </div>
                            <div className="input-group">
                                <label htmlFor="lastname"></label>
                                <input type="text" id="lastname" name="lastname" placeholder="Last Name" required />
                            </div>
                            <div className="input-group">
                                <label htmlFor="password"></label>
                                <input type="password" id="password" name="password" placeholder="Password" required />
                            </div>
                            <div className="input-group">
                                <label htmlFor="sex"></label>
                                <input type="text" id="sex" name="sex" placeholder="Sex" required />
                            </div>
                            <div className="input-group">
                                <label htmlFor="dob"></label>
                                <input type="date" id="dob" name="dob" placeholder="Date of Birth" required />
                            </div>
                            <div className="input-group">
                                <label htmlFor="pno"></label>
                                <input type="text" id="pno" name="pno" placeholder="Phone Number" required />
                            </div>
                            <div className="footer-group">
                                <button type="submit" className="login-button">Signup</button>
                                <br />
                                <div className="media-options">
                                    <button type="button" className="login-button1">
                                        <img src={logo1} className="logo1" alt="Google logo" />
                                        Signup with Google
                                    </button>
                                </div>
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

export default Signup;
