import React from 'react';
import NavBar from '../components/NavBar';
import FooterBar from '../components/FooterBar';
import MathImg from '../img/math.webp';
import EnglishImg from '../img/english.png'



const LogOutBtn = (event) => {
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

    console.log(localStorage.getItem("loggedInUserID")); //
    localStorage.setItem("token", null);
    localStorage.setItem("loggedInUserID", '');
    window.location.href = `${baseUrl}/`;

}

class HomeScreen extends React.Component {
    constructor() {
        super()
    }


    render() {
        return (
            <div>
                <NavBar />
                <div className='Main'>
                    <div className='logout-to-right'>
                        <h1>Welcome to E-Learning</h1>
                        <button onClick={LogOutBtn} className='LogoutBtn' >LogOut</button>
                    </div>
                    <h2>About Us</h2>
                    <p>Welcome to our e-learning platform. We offer a wide range of courses to help you enhance your skills and
                        knowledge.</p>
                    <h2>Featured Courses</h2>
                    <div className='boxBorder'>
                    <img src={EnglishImg} alt='english' />
                        <h3>English</h3>
                        <p>This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <a href='/english'>English</a>
                    </div>

                    <div className='boxBorder'>
                        <img src={MathImg} alt='math' />
                        <h3>Math</h3>
                        <p>Welcome to Math, Y'all will be learn Addition, Substration and Multiplication. (pssh don't worry there is game following with it!!)</p>
                        <a href='/math'>Math</a>
                    </div>

                    <div className='boxBorder'>
                        <h3>Science</h3>
                        <p>This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <a href='/science'>Science</a>
                    </div>

                    <div className='boxBorder'>
                        <h3>Health</h3>
                        <p>This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <a href='/health'>Health</a>
                    </div>

                </div>
                <FooterBar />
            </div>
        );
    }
}

export default HomeScreen;