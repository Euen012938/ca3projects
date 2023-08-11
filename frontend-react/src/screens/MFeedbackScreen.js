import React, { Component, setState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';

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

const userid = parseInt(localStorage.getItem("loggedInUserID"));


class MFeedbackScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
        }
    }

    componentDidMount() {
        axios.get(`${apiUrl}/api/math/AdminComments`, { params: { userid: userid } })
            .then((res) => {

                let data = res.data[0];
                this.setState({ data: data })
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        const { data } = this.state
        return (
            <div className='MathF'>
                <nav>
                    <div>
                        <a href="/home">Home</a>
                        <a href="/mathT">Tutorial</a>
                        <a href="/math">Math Games</a>
                        <a href="/mathC">Math Comments</a>
                        <a href='/mathF'>Feedbacks</a>
                    </div>
                </nav>
                <div className='container'>
                    <h2>Dear Fellow Fighter, I and my team have somethings to tell you.{data.map((data, index) => (
                        <div className='commentsDataa'>{data.comments}</div>
                    ))}</h2>
                </div>
                <div className='footer'>
                    <p>&copy; 2023 E-Learning. All rights reserved.</p>
                </div>
            </div>
        )
    }
}

export default MFeedbackScreen;