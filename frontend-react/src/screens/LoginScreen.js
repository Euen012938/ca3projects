import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';



const onClickLoginIn = (event) => {
    event.preventDefault();

    let baseUrl = window.location.protocol + "//" + window.location.host;
    let apiUrl = baseUrl;
    /////////////////////////////////////////////////////////////////////
    // For local development 
    // with React in Port 3001 and Express in Port 3000
    /////////////////////////////////////////////////////////////////////
    if (window.location.hostname === "localhost" && window.location.port === "3001") {
        console.log('a', window.location.hostname)
        apiUrl = window.location.protocol + "//" + window.location.hostname + ":" + "3000";
    }

    const email = $("#logemail").val();
    const password = $("#logpass").val();
    const requestBody = {
        email: email,
        password: password
    };

    axios.post(`${apiUrl}/api/login/`, requestBody)
        .then((response) => {
            const token = response.data.token;
            const loggedInUserID = response.data.userid;
            console.log(loggedInUserID); //
            localStorage.setItem("token", token);
            localStorage.setItem("loggedInUserID", loggedInUserID);
            window.location.href = `${baseUrl}/home`;
        })
        .catch((error) => {
            console.log(error);
            if (error.response.status === 401) {
                alert("Wrong login info");
            } else {
                alert("Something unexpected went wrong.");
            }
        });

}

 const onClickSignUp = (event) => {
    event.preventDefault();

    let baseUrl = window.location.protocol + "//" + window.location.host;
    let apiUrl = baseUrl;
    /////////////////////////////////////////////////////////////////////
    // For local development 
    // with React in Port 3001 and Express in Port 3000
    /////////////////////////////////////////////////////////////////////
    if (window.location.hostname === "localhost" && window.location.port === "3001") {
        console.log('a', window.location.hostname)
        apiUrl = window.location.protocol + "//" + window.location.hostname + ":" + "3000";
    }

            const username = $("#signUsername").val();
            const firstname = $("#signFirstName").val();
            const lastname = $("#signLastName").val();
            const age = $("#SignAge").val()
            const email = $("#signEmail").val();
            const password = $("#Signpass").val();
            const requestBody = {
                username: username,
                firstname: firstname,
                lastname: lastname,
                age: age,
                email: email,
                password: password
            };

            axios.post(`${apiUrl}/api/login/register`, requestBody)
                .then((response) => {
                    const result = response;
                    console.log(result);
                    window.location.href = `${baseUrl}/`;
                    alert("Signed Up Successfully")
                })
                .catch((error) => {
                    console.log(error);
                    if (error.response.status === 401) {
                        alert("Wrong info");
                    } else {
                        alert("Something unexpected went wrong.");
                    }
                });
}

class LoginScreen extends React.Component {
    constructor() {
        super()
    }


    render() {
        return (
            <div className='Login'>
                <div className="section">
                    <div className="container">
                        <div className="row full-height justify-content-center">
                            <div className="col-12 text-center align-self-center py-5">
                                <div className="section pb-5 pt-5 pt-sm-2 text-center">
                                    <h6 className="mb-0 pb-3"><span>Log In </span><span>Sign Up</span></h6>
                                    <input className="checkbox" type="checkbox" id="reg-log" name="reg-log" />
                                    <label htmlFor="reg-log"></label>
                                    <div className="card-3d-wrap mx-auto">
                                        <div className="card-3d-wrapper">
                                            <div className="card-front">
                                                <div className="center-wrap">
                                                    <div className="section text-center">
                                                        <h4 className="mb-4 pb-3">Log In</h4>
                                                        <div className="form-group">
                                                            <input type="email" name="logemail" className="form-style"
                                                                placeholder="Your Email" id="logemail" autoComplete="off" />
                                                            <i className="input-icon uil uil-at"></i>
                                                        </div>
                                                        <div className="form-group mt-2">
                                                            <input type="password" name="logpass" className="form-style"
                                                                placeholder="Your Password" id="logpass" autoComplete="off" />
                                                            <i className="input-icon uil uil-lock-alt"></i>
                                                        </div>
                                                        <button className="btn mt-4" id="LogBtn" onClick={onClickLoginIn}>Login</button>
                                                        <p className="mb-0 mt-4 text-center"><a href="#0" className="link">Forgot your
                                                            password?</a></p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-back">
                                                <div className="center-wrap">
                                                    <div className="section text-center">
                                                        <h4 className="mb-4 pb-3">Sign Up</h4>
                                                        <div className="form-group">
                                                            <input type="text" name="signUsername" className="form-style"
                                                                placeholder="Username" id="signUsername" autoComplete="off" />
                                                            <i className="input-icon uil uil-user"></i>
                                                        </div>
                                                        <div className="form-group mt-2">
                                                            <input type="text" name="signFirstName" className="form-style"
                                                                placeholder="Your First Name" id="signFirstName" autoComplete="off" />
                                                            <i className="input-icon uil uil-users-alt"></i>
                                                        </div>
                                                        <div className="form-group mt-2">
                                                            <input type="text" name="signLastName" className="form-style"
                                                                placeholder="Your Last Name" id="signLastName" autoComplete="off" />
                                                            <i className="input-icon uil uil-users-alt"></i>
                                                        </div>
                                                        <div className="form-group mt-2">
                                                            <input type="text" name="SignAge" className="form-style"
                                                                placeholder="Your Age" id="SignAge" autoComplete="off" />
                                                            <i className="input-icon uil uil-arrow-growth"></i>
                                                        </div>
                                                        <div className="form-group mt-2">
                                                            <input type="email" name="signEmail" className="form-style"
                                                                placeholder="Your Email" id="signEmail" autoComplete="off" />
                                                            <i className="input-icon uil uil-at"></i>
                                                        </div>
                                                        <div className="form-group mt-2">
                                                            <input type="password" name="Signpass" className="form-style"
                                                                placeholder="Your Password" id="Signpass" autoComplete="off" />
                                                            <i className="input-icon uil uil-lock-alt"></i>
                                                        </div>
                                                        <button className="btn mt-4" id="SignUpBtn" onClick={onClickSignUp}>Sign Up</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a href='/adminlogin' className='Admin'>Admin</a>
                </div>
            </div>
        );
    }
}

export default LoginScreen;