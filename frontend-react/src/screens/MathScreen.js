import React, { Component, setState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import Popper from 'popper.js';
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

class MathScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            histBtn: false,
            historyData: [],
            operators: ["+", "-", "*"],
            operatorQuestion: '',
            message: false,
            messageData: '',
            questionA: '',
            questionB: '',
            answerValue: null,
            controls: false,
            start: false,
            startText: 'Start Game',
            history: false,
            info: false,
            result: '',
            score: 1,
            totalGame: 1,
            inputData: '',
            totalScore: ''


        }
    }

    getPrevScore = (event) => {
        event.preventDefault();

        axios.get(`${apiUrl}/api/math/hist`, { params: { userid: userid } })
            .then((res) => {
                this.setState({ histBtn: true });


                const htmlData = res.data
                console.log(htmlData + 'html')
                if (htmlData === '') {
                    const NewPlayerData = [{ hist: `You haven't played to game before. Start button is at the below!!!` }]
                    this.setState({ historyData: NewPlayerData })
                } else {
                    this.setState({ historyData: htmlData })

                }
            })
            .catch((error) => {
                console.log(error)
                alert(error)
                window.location.href = `${baseUrl}/math`
            })
    }

    randomValue = (min, max) => Math.floor(Math.random() * (max - min)) + min;

    questionGenerator = (event) => {
        // let operators = ["+", "-", "*"];

        let [num1, num2] = [this.randomValue(1, 20), this.randomValue(1, 20)];
        let randomOperator = this.state.operators[Math.floor(Math.random() * this.state.operators.length)];

        if (randomOperator === "-" && num2 > num1) {
            [num1, num2] = [num2, num1];
        }

        let solution = eval(`${num1}${randomOperator}${num2}`);
        let order = this.randomValue(1, 5);


        let questionContentA = '';
        let questionContentB = '';

        if (order === 1) {
            this.setState({ answerValue: num1 })
            questionContentB = <p>{randomOperator} {num2} = {solution}</p>;
        } else if (order === 2) {
            this.setState({ answerValue: num2 })
            questionContentA = <p>{num1} {randomOperator}</p>
            questionContentB = <p>= {solution}</p>;
        } else if (order === 3) {
            this.setState({ answerValue: randomOperator })
            this.setState({ operatorQuestion: true })
            questionContentA = <p>{num1}</p>
            questionContentB = <p> {num2} = {solution}</p>;
        } else {
            this.setState({ answerValue: solution });
            questionContentA = <p>{num1} {randomOperator} {num2} =</p>;
        }

        this.setState({ questionA: questionContentA });
        this.setState({ questionB: questionContentB });
    };

    startBtn = () => {
        this.setState({ operatorQuestion: false })
        this.setState({ answerValue: "" })
        this.setState({ messageData: '' });
        this.setState({ message: true })
        //Controls and buttons visibility
        this.setState({ controls: true })
        this.setState({ start: true })
        this.setState({ history: true })
        this.setState({ info: true })
        this.questionGenerator();
        ////
    }

    increment = () => {
        let currentTotalGameData = this.state.totalGame
        this.setState({ totalGame: (currentTotalGameData + 1) })
        console.log(this.state.totalGame + 'totalGame')
    }

    output = (resultText, text) => {
        if (text === true) {
            let currentScoreData = this.state.score
            this.setState({ score: (currentScoreData + 1) })
            console.log(this.state.score + 'score')
        }
        this.setState({ result: resultText })
        this.setState({ startText: "Next" })
        this.setState({ controls: false })
        this.setState({ start: false })
    };

    endGame = (resultText) => {
        this.setState({ result: resultText })
        this.setState({ startText: "New Game" })
        this.setState({ controls: false })
        this.setState({ start: false })
        this.setState({ history: false })
        this.setState({ info: false })
        let score = this.state.score
        let totalGame = this.state.totalGame
        let totalScore = (score + '/' + totalGame)
        this.setState({ totalScore: totalScore })

        const requestBody = {
            userid: userid,
            totalScore: totalScore
        }

        axios.post(`${apiUrl}/api/math/`, requestBody)
            .then((res) => {
                console.log('succesfully send into db')
                alert('Successful')
            }).catch((error) => {
                console.log(error);
                alert("Something unexpected went wrong.");
            })

        this.state.totalGame = 0;
        this.setState({ score: 0 })
        totalScore = '';
        console.log(this.state.totalGame + 'a' + this.state.score + 'a' + 'b' + totalScore)
    };


    //User Input Check
    submitBtn = (event) => {
        event.preventDefault();
        this.setState({ message: true });
        const userInput = this.state.inputData
        //If user input is not empty
        if (userInput) {
            this.increment();
            if (this.state.totalGame === 25) {
                this.endGame("Finish 25 Qn")
                this.setState({ inputData: '' })
            }
            //If the user guessed correct answer
            else if (userInput == this.state.answerValue) {
                this.output(`Yippie!! Correct Answer`, true);
                this.setState({ inputData: '' })
            }
            //If user inputs operator other than +,-,*
            else if (this.state.operatorQuestion && !this.state.operators.includes(userInput)) {
                this.setState({ message: false })
                this.setState({ messageData: "Please enter a valid operator" })
                this.setState({ inputData: '' })
            }
            //If user guessed wrong answer
            else {
                this.output(`Opps!! Wrong Answer`, false);
                this.setState({ inputData: '' })
            }
        }
        //If user input is empty
        else {
            this.setState({ message: false })
            this.setState({ messageData: "Input Cannot Be Empty" })
        }
    };

    render() {
        const { histBtn, historyData, messageData, message, questionA, questionB, controls, start, history, info, result, startText } = this.state
        return (
            <div>
                <div className='Math'>
                    <div className='background'>
                        <div className="container">
                            <h2>Fill In The Blank</h2>
                            <div id="question">{questionA}<input type="text" id="inputValue" value={this.state.inputData}
                                onChange={(e) => this.setState({ inputData: e.target.value })} placeholder="?" />{questionB} </div>
                            <button id="submit" onClick={this.submitBtn}>Submit</button>
                            {message ? null : <p id="msg">{messageData}</p>}
                        </div>
                    </div>
                    {controls ? null : <div className="controls-container">
                        <nav>
                            <div>
                                <a href="/home">Home</a>
                                <a href="/mathT">Tutorial</a>
                                <a href="/math">Math Games</a>
                                <a href="/mathC">Math Comments</a>
                                <a href='/mathF'>Feedbacks</a>
                            </div>
                        </nav>
                        <p id="result">{result}</p>
                        {start ? null : <button id="start" onClick={this.startBtn}>{startText}</button>}
                        {info ? null : <p id="info">This game aims to cultivate children's mathematical skills by helping them grasp and appreciate the
                            fundamentals of arithmetic. Kids are tasked with solving equations, and various question types are randomly
                            presented to them. This game is designed to effectively train children in arithmetic operations. <br />
                            <strong>
                                'Start Game' to start practice now!!</strong>
                        </p>}

                        {history ? null : <div className="history">
                            <h4>Game History Results</h4>
                            {histBtn ? null : <button className="onclick-hist" onClick={this.getPrevScore}>Open!</button>}
                            <div id="hist">
                                {historyData.map((data, index) => (
                                    <div key={index}>{data.hist}</div>
                                ))}</div>
                        </div>}
                        <div className='footer'>
                            <p>&copy; 2023 E-Learning. All rights reserved.</p>
                        </div>
                    </div>
                    }

                </div>

            </div>

        );
    }
}

export default MathScreen;