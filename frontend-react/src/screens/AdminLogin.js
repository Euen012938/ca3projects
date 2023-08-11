import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';

class AdminLogin extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div className='AdminLogin'>
                <div className="section">
                    <div className="container">
                        <div className="row full-height justify-content-center">
                            <div className="col-12 text-center align-self-center py-5">
                                <div className="section pb-5 pt-5 pt-sm-2 text-center">
                                    <div className="card">
                                        <div className="center-wrap">
                                            <div className="section text-center">
                                                <h4 className="mb-4 pb-3">Admin Log In</h4>
                                                <div className="form-group">
                                                    <input type="email" name="logemail" className="form-style" placeholder="Your Email"
                                                        id="logemail" autoComplete="off" />
                                                    <i className="input-icon uil uil-at"></i>
                                                </div>
                                                <div className="form-group mt-2">
                                                    <input type="password" name="logpass" className="form-style"
                                                        placeholder="Your Password" id="logpass" autoComplete="off" />
                                                    <i className="input-icon uil uil-lock-alt"></i>
                                                </div>
                                                <button className="btn mt-4" id="LogBtn">Login</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AdminLogin;