import React, { Component, setState } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';

import feedbackImage from '../img/feedackimg.png'

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


class MCommentScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            window: true,
            prevCommentData: [],
            noCommentData: '',
            hidingBtn: false,
            newComment: '',
            inputToEditBtn: true,
            inputToEditBtn2: false,
            prev: ''

        }

    }


    componentDidMount() {
        axios.get(`${apiUrl}/api/math/comments`, { params: { userid: userid } })
            .then((res) => {
                console.log(res.data + 'res.data');
                const CommentsData = res.data;

                if (CommentsData == '') {
                    const html = <p className='noData'>You haven't input a comment before!!</p>
                    this.setState({ noCommentData: html })
                } else {
                    this.setState({ prevCommentData: CommentsData })
                }
            })
            .catch((res) => {
                alert("No Comments was saved before!")
            })

    }

    editingTable = (id) => {
        this.setState({ inputToEditBtn: false })
        this.setState({ inputToEditBtn2: true })
        let database = this.state.prevCommentData[id.index]
        let prev = database.comments;
        this.setState({ prev: prev })
    }
    submitEditComment = () => {
        let prev = this.state.prev
        console.log(prev);
        let comments = this.state.newComment
        console.log(comments)

        const requestBody = {
            prev: prev,
            comments: comments
        }

        axios.put(`${apiUrl}/api/math/comments`, requestBody)
            .then((res) => {
                console.log('succesfully send into db')
                console.log(prev + comments)
                alert('Changed')
                window.location.href = `${baseUrl}/mathC`
            })
            .catch((err) => {
                console.log(err)
            })
    }
    deleteTable = (id) => {
        let database = this.state.prevCommentData[id.index]
        console.log(database + '' + id)
        console.log(id.index)
        let prev = database.comments;
        console.log(prev);

        axios.delete(`${apiUrl}/api/math/comments`, { data: { prev: prev } })
            .then((res) => {
                console.log('succesfully del into db')
                alert('Changed')
            })
            .catch((err) => {
                console.log(err)
            })

    }
    render() {
        const { prevCommentData, noCommentData, hidingBtn, inputToEditBtn, inputToEditBtn2 } = this.state
        return (
            <div className='MathC'>
                <nav>
                    <div>
                        <a href="/home">Home</a>
                        <a href="/mathT">Tutorial</a>
                        <a href="/math">Math Games</a>
                        <a href="/mathC">Math Comments</a>
                        <a href='/mathF'>Feedbacks</a>
                    </div>
                </nav>
                {inputToEditBtn ? null : <div className='editTable'><h2>Editing Previous Comments</h2><textarea type='text' id='editTable' value={this.state.newComment} onChange={(e) => this.setState({ newComment: e.target.value })} placeholder="" /><button onClick={() => { this.submitEditComment() }}>Submit</button></div>}
                {inputToEditBtn2 ? null : <div className="container">
                    <div>
                        <div>
                            <h4>Comments:</h4>
                            {hidingBtn ? null : <div id="data">{prevCommentData.map((data, index) => (
                                <div className='CommentTable' key={index}>
                                    <div className='commentText'>{(index + 1)}. {data.comments}</div>
                                    <div className='CommentsIDsz'>{index}</div>
                                    <div>
                                        <button className='EditBtn' onClick={() => { this.editingTable({ index }) }} >Edit</button>
                                        <button className='DelBtn' onClick={() => { this.deleteTable({ index }) }}>Delete</button>
                                    </div>
                                </div>
                            ))}</div>}
                            {hidingBtn ? !null : <div id='noDataTable'>{noCommentData}</div>}
                        </div>

                        <div className="postComments">
                            <h4>Posting New Comments: </h4>
                            <div className="postingNewComm">
                                <textarea type='text' id='PostingComment' placeholder='Please input your comments!' /><br />
                                <button id="PostBtn">Post</button>
                            </div>

                        </div>
                    </div>
                    <img src={feedbackImage} alt='feedbackImage' />
                </div>}

                <footer>
                    <p>&copy; 2023 E-Learning. All rights reserved.</p>
                </footer>
            </div>
        )
    }
}

export default MCommentScreen;