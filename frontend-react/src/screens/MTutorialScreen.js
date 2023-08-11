import React from 'react';
import Addition from '../img/MathAddition.png'
import Substration from '../img/MathSubstration.png'
import Multiplication from '../img/MathMulitplication.png'
import 'bootstrap/dist/js/bootstrap.bundle.min';


class MTutorialScreen extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div className='MathT'>
                <nav>
                    <div>
                        <a href="/home">Home</a>
                        <a href="/mathT">Tutorial</a>
                        <a href="/math">Math Games</a>
                        <a href="/mathC">Math Comments</a>
                        <a href='/mathF'>Feedbacks</a>
                    </div>
                </nav>
                <h1>The Importance learning Arithmetic Operations</h1>
                <h3>We must first know the numbers 1 through 10. <br /><strong>Starting, 1 One, 2 Two, 3 Three, 4 Four, 5 Five, 6
                    Six, 7 Seven, 8 Eight, 9 Nine, 10 Ten</strong></h3>
                <div className='container'>

                    <div className="flip-card">
                        <div className="flip-card-inner">
                            <div className="flip-card-front">
                                <img src={Addition} alt="Card Front Image" />
                                <h4>Addition</h4>
                            </div>
                            <div className="flip-card-back">
                                <div className="card-content">
                                    <h2>Addition</h2>
                                    <p className="information">In this image, we see 5 mango and 1 mango. 5 + 1 means 5 adding 1 more and after 5 is 6 <br />
                                        Therefore, <strong> 5 + 1 is 6 Six</strong></p>
                                    <a href="https://www.youtube.com/watch?v=mjlsSYLLOSE" className="btn">Learn More</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flip-card">
                        <div className="flip-card-inner">
                            <div className="flip-card-front">
                                <img src={Substration} alt="Card Front Image" />
                                <h4>Substration</h4>
                            </div>
                            <div className="flip-card-back">
                                <div className="card-content">
                                    <h2>Substration</h2>
                                    <p className="information">In this image, we see 5 peach and 2 peace. 5 - 2 means 5 minus 2 and backtrack from 5 is 4
                                        then 3
                                        <br />Therefore, <strong> 5 - 2 is 3 Three</strong></p>
                                    <a href="https://www.youtube.com/watch?v=ug0gs8kLE48" className="btn">Learn More</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flip-card">
                        <div className="flip-card-inner">
                            <div className="flip-card-front">
                                <img src={Multiplication} alt="Card Front Image" />
                                <h4>Multiplication</h4>
                            </div>
                            <div className="flip-card-back">
                                <div className="card-content">
                                    <h2>Multiplication</h2>
                                    <p className="information">In this image, we need to <strong>memorise</strong> all the time table allowing you to know
                                        what 3
                                        x 5</p>
                                    <a href="https://www.youtube.com/watch?v=eW2dRLyoyds" className="btn">Learn More</a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='footer'>
                    <p>&copy; 2023 E-Learning. All rights reserved.</p>
                </div>
            </div>
        )
    }
}

export default MTutorialScreen;