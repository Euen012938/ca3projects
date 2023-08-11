import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import FooterBar from "../components/FooterBar";
import CommentRow from "../components/commentRow";

const FlashcardGame = () => {
  const [currentScreen, setCurrentScreen] = useState("Home");
  const [newFlashcard, setNewFlashcard] = useState({
    HealthTerms: "",
    Explanation: "",
    Questions: "",
    Answers: "",
  });
  const [userAnswer, setUserAnswer] = useState("");
  const [flashcardContent, setFlashcardContent] = useState({
    healthTerms: "",
    explanation: "",
    questions: "",
    answers: "",
  });
  const [newComment, setNewComment] = useState("");
  const [commentList, setCommentList] = useState("");

  useEffect(() => {
    getRandomFlashcard();
    getCommentList();
  }, []);

  const baseUrl = "https://assignment-ay2324s1-class2b24-team4.onrender.com"; // Update with your base URL
  const token = localStorage.getItem("token");
  const userid = parseInt(localStorage.getItem("loggedInUserID"));
  const API_NAME = "http://localhost:3000/";
  const [commentUpdatedText, setCommentUpdatedText] = useState("");

  const getRandomFlashcard = () => {
    setUserAnswer("");
    const randomValue = (min, max) =>
      Math.floor(Math.random() * (max - min)) + min;
    const id = randomValue(1, 6);

    axios
      .create({
        baseURL: API_NAME,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .get(`${baseUrl}/api/Health/${id}`)
      .then((response) => {
        if (response.data && response.data.length !== 0) {
          if (response.data[0].length !== 0) {
            const flashcardData = response.data[0][0];
            setFlashcardContent({
              healthTerms: flashcardData.HealthTerms,
              explanation: flashcardData.Explanation,
              questions: flashcardData.Questions,
              answers: flashcardData.Answers,
            });
          } else {
            getRandomFlashcard();
          }
        } else {
          alert("Error Loading Flashcards");
        }
      })
      .catch((error) => {
        alert("Something went wrong");
      });
  };

  const getCommentList = () => {
    axios
      .create({
        baseURL: API_NAME,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .get(`api/Health/`)
      .then((response) => {
        if (response.data && response.data.length !== 0) {
          setCommentList(response.data[0]);
        } else {
          alert("Error Loading Flashcards");
        }
      })
      .catch((error) => {
        alert("Something went wrong");
      });
  };

  const checkAnswer = (correctAnswer) => {
    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
      setCurrentScreen("Game Correct Answer");
    } else {
      setCurrentScreen("Game Wrong Answer");
    }
  };

  const renderCorrectAns = () => (
    <div
      style={{
        width: "80%",
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "green",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0px 0px 20px 1px green",
        }}
      >
        <h3 style={{ color: "white" }}>Congrats! You are correct!</h3>
        <button onClick={resetGame}>OK</button>
      </div>
    </div>
  );

  const renderWrongAns = () => (
    <div
      style={{
        width: "80%",
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#cc1002",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0px 0px 20px 1px red",
        }}
      >
        <h3 style={{ color: "white" }}>Ohhh very close...</h3>
        <button onClick={() => resetGame(false)}>Try again</button>
      </div>
    </div>
  );

  const resetGame = (refreshQuestions = true) => {
    if (refreshQuestions) {
      getRandomFlashcard();
    }
    setUserAnswer("");
    setCurrentScreen("Game");
  };

  const renderGameplay = () => (
    <div
      style={{
        width: "80%",
        display: "flex",
        padding: "20px",
      }}
    >
      <div
        style={{
          boxShadow: "0px 0px 10px 1px grey",
          padding: "30px",
          width: "100%",
          borderRadius: "15px",
        }}
      >
        <div
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            display: "flex",
            alignItems: "center",
          }}
        >
          <h2>Question</h2>
          <button
            style={{ height: "30px", borderRadius: "5px" }}
            onClick={getRandomFlashcard}
          >
            Refresh
          </button>
        </div>
        <div>
          <p style={{ fontSize: "18px", marginTop: "10px" }}>
            {flashcardContent.questions}
          </p>
          <input
            style={{ padding: "4px 10px" }}
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Enter your answer"
          />
          <button
            onClick={() => checkAnswer(flashcardContent.answers)}
            style={{
              marginTop: "10px",
              borderRadius: "5px",
              marginLeft: "20px",
              fontSize: "18px",
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );

  const addFlashcard = () => {
    if (
      newFlashcard.HealthTerms === "" &&
      newFlashcard.Explanation === "" &&
      newFlashcard.Questions === "" &&
      newFlashcard.Answers === ""
    ) {
      alert("Please fill in all the blank field");
      return;
    }
    axios
      .create({
        baseURL: API_NAME,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .post("/api/Health", newFlashcard)
      .then((response) => {
        console.log("Flashcard added:", response.data);
        setNewFlashcard({
          HealthTerms: "",
          Explanation: "",
          Questions: "",
          Answers: "",
        });
        setCurrentScreen("Add Card Successfully");
      })
      .catch((error) => {
        setCurrentScreen("Add Card Failed");
        console.error("Error adding flashcard:", error);
      });
  };

  const handleInputChange = (e) => {
    setNewFlashcard({
      ...newFlashcard,
      [e.target.name]: e.target.value,
    });
  };

  const renderAddCard = () => (
    <div
      style={{
        width: "80%",
        display: "flex",
        padding: "20px",
      }}
    >
      <div
        style={{
          boxShadow: "0px 0px 20px 1px grey",
          padding: "30px",
          width: "100%",
          borderRadius: "10px",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Add new card</h2>
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            alignItems: "center",
          }}
        >
          <div style={{ width: "150px" }}>Health Terms</div>
          <input
            style={{ padding: "4px 10px", flex: 1 }}
            type="text"
            name="HealthTerms"
            value={newFlashcard.HealthTerms}
            placeholder="Health Terms"
            onChange={handleInputChange}
          />
        </div>
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            alignItems: "center",
            marginTop: "15px",
          }}
        >
          <div style={{ width: "150px" }}>Explanation</div>
          <input
            style={{ padding: "4px 10px", flex: 1 }}
            type="text"
            name="Explanation"
            value={newFlashcard.Explanation}
            placeholder="Explanation"
            onChange={handleInputChange}
          />
        </div>
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            alignItems: "center",
            marginTop: "15px",
          }}
        >
          <div style={{ width: "150px" }}>Questions</div>
          <input
            style={{ padding: "4px 10px", flex: 1 }}
            type="text"
            name="Questions"
            value={newFlashcard.Questions}
            placeholder="Questions"
            onChange={handleInputChange}
          />
        </div>

        <div
          style={{
            flexDirection: "row",
            display: "flex",
            alignItems: "center",
            marginTop: "15px",
            marginBottom: "30px",
          }}
        >
          <div style={{ width: "150px" }}>Answers</div>
          <input
            style={{ padding: "4px 10px", flex: 1 }}
            type="text"
            name="Answers"
            value={newFlashcard.Answers}
            placeholder="Answers"
            onChange={handleInputChange}
          />
        </div>

        <div style={{ justifyContent: "flex-end", display: "flex" }}>
          <button onClick={addFlashcard}>Add Flashcard</button>
        </div>
      </div>
    </div>
  );

  const renderCardAddedSuccessfully = () => (
    <div
      style={{
        width: "80%",
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "green",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0px 0px 20px 1px green",
        }}
      >
        <h2 style={{ color: "white" }}>Card has been added.</h2>
        <button
          onClick={() => {
            setCurrentScreen("Add Card");
          }}
        >
          OK
        </button>
      </div>
    </div>
  );

  const renderCardAddedFailed = () => (
    <div
      style={{
        width: "80%",
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#cc1002",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0px 0px 20px 1px #cc1002",
        }}
      >
        <h2 style={{ color: "white" }}>Add card failed. Please try again.</h2>
        <button
          onClick={() => {
            setCurrentScreen("Add Card");
          }}
        >
          Try Again
        </button>
      </div>
    </div>
  );

  const renderSideMenu = () => (
    <div
      style={{
        width: "20%",
        display: "flex",
        justifyContent: "center",
        minWidth: "200px",
        marginTop: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "10px",
          flexDirection: "column",
          display: "flex",
          width: "80%",
          boxShadow: "0px 0px 20px 1px grey",
          height: "250px",
        }}
      >
        <button
          style={{
            backgroundColor: "white",
            border: "0px",
            color: currentScreen.includes("Home") ? "#2A2B38" : "#adacac",
            fontSize: currentScreen.includes("Home") ? "22px" : "18px",
          }}
          onClick={() => {
            setCurrentScreen("Home");
          }}
        >
          Home
        </button>
        <div
          style={{
            height: "1px",
            width: "100%",
            backgroundColor: "#adacac",
            marginTop: "5px",
            marginBottom: "5px",
          }}
        />
        <button
          style={{
            backgroundColor: "white",
            border: "0px",
            color: currentScreen.includes("Game") ? "#2A2B38" : "#adacac",
            fontSize: currentScreen.includes("Game") ? "22px" : "18px",
          }}
          onClick={() => setCurrentScreen("Game")}
        >
          Game Play
        </button>
        <div
          style={{
            height: "1px",
            width: "100%",
            backgroundColor: "#adacac",
            marginTop: "5px",
            marginBottom: "5px",
          }}
        />
        <button
          style={{
            backgroundColor: "white",
            border: "0px",
            color: currentScreen.includes("Card") ? "#2A2B38" : "#adacac",
            fontSize: currentScreen.includes("Card") ? "22px" : "18px",
          }}
          onClick={() => setCurrentScreen("Add Card")}
        >
          Add Card
        </button>
        <div
          style={{
            height: "1px",
            width: "100%",
            backgroundColor: "#adacac",
            marginTop: "5px",
            marginBottom: "5px",
          }}
        />
        <button
          style={{
            backgroundColor: "white",
            border: "0px",
            color: currentScreen.includes("Comments") ? "#2A2B38" : "#adacac",
            fontSize: currentScreen.includes("Comments") ? "22px" : "18px",
          }}
          onClick={() => setCurrentScreen("Comments")}
        >
          Comments
        </button>
        
      </div>
    </div>
  );

  const renderHome = () => (
    <div
      style={{
        flex: 1,
        backgroundColor: "#2A2B38",
        width: "100%",
        minHeight: window.innerHeight - 120,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <button
        onClick={() => setCurrentScreen("Game")}
        style={{
          backgroundColor: "transparent",
          border: "1px solid white",
          padding: "10px 18px",
          borderRadius: "10px",
        }}
      >
        <h1 style={{ color: "white", fontWeight: "bold" }}>START GAME</h1>
      </button>
    </div>
  );

  const addNewComment = () => {
    if (newComment === "") {
      alert("Please fill in all the comment field");
      return;
    }
    axios
      .create({
        baseURL: API_NAME,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .post("/api/Health/HealthComments/", { Comments: newComment })
      .then((response) => {
        setCurrentScreen("Comments List Updated");
        setCommentUpdatedText("Comment has beed added");
        setNewComment("");
        getCommentList();
      })
      .catch((error) => {
        setCommentUpdatedText("Failed to add comment");
        setCurrentScreen("Comments List Update Failed");
        getCommentList();
      });
  };

  const editComment = ({ Comments, ID }) => {
    if (Comments === "") {
      alert("Please fill in all the comment field");
      return;
    }
    axios
      .create({
        baseURL: API_NAME,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .put(`/api/Health/HealthComments/${ID}`, { Comments, ID })
      .then((response) => {
        getCommentList();
        setCommentUpdatedText("Comment has beed updated");
        setCurrentScreen("Comments List Updated");
      })
      .catch((error) => {
        setCommentUpdatedText("Failed to update comment");
        setCurrentScreen("Comments List Update Failed");
        getCommentList();
      });
  };

  const deleteComment = ({ ID }) => {
    axios
      .create({
        baseURL: API_NAME,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .delete(`/api/Health/HealthComments/${ID}`)
      .then((response) => {
        getCommentList();
        setCommentUpdatedText("Comment has beed deleted");
        setCurrentScreen("Comments List Updated");
      })
      .catch((error) => {
        setCommentUpdatedText("Failed to delete comment");
        setCurrentScreen("Comments List Update Failed");
        getCommentList();
      });
  };

  const renderComment = () => (
    <div
      style={{
        display: "flex",
        margin: "20px",
        width: "80%",
        borderRadius: "10px",
        boxShadow: "0px 0px 20px 1px grey",
        padding: "30px",
        flexDirection: "column",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Comments</h2>
      <div
        style={{
          border: "1px solid grey",
          width: "100%",
          padding: "15px",
          borderRadius: "10px",
        }}
      >
        <div style={{ fontSize: "20px", fontWeight: "bold" }}>New Comment</div>
        <div
          style={{
            marginTop: "10px",
            flexDirection: "row",
            display: "flex",
            alignItems: "center",
          }}
        >
          <input
            style={{ padding: "4px 10px", flex: 1, marginRight: "20px" }}
            type="text"
            name="Comment"
            value={newComment}
            placeholder="Comment"
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={addNewComment}>Submit</button>
        </div>
      </div>
      {commentList.length > 0 ? (
        commentList.map((item) => (
          <CommentRow
            item={item}
            key={item.ID}
            editComment={editComment}
            deleteComment={deleteComment}
          />
        ))
      ) : (
        <div style={{ marginTop: "30px" }}>No comment added</div>
      )}
    </div>
  );

  const renderCommentListUpdated = () => (
    <div
      style={{
        width: "80%",
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "green",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0px 0px 20px 1px green",
        }}
      >
        <h3 style={{ color: "white" }}>{commentUpdatedText}</h3>
        <button onClick={() => setCurrentScreen("Comments")}>OK</button>
      </div>
    </div>
  );

  const renderCommentListFailed = () => (
    <div
      style={{
        width: "80%",
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#cc1002",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0px 0px 20px 1px #cc1002",
        }}
      >
        <h3 style={{ color: "white" }}>{commentUpdatedText}</h3>
        <button onClick={() => setCurrentScreen("Comments")}>Try again</button>
      </div>
    </div>
  );

  return (
    <div>
      <NavBar />

      {currentScreen === "Home" ? (
        renderHome()
      ) : (
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            width: "100%",
            minHeight: window.innerHeight - 120,
          }}
        >
          {renderSideMenu()}
          {currentScreen === "Game" && renderGameplay()}
          {currentScreen === "Game Correct Answer" && renderCorrectAns()}
          {currentScreen === "Game Wrong Answer" && renderWrongAns()}
          {currentScreen === "Add Card" && renderAddCard()}
          {currentScreen === "Add Card Successfully" &&
            renderCardAddedSuccessfully()}
          {currentScreen === "Add Card Failed" && renderCardAddedFailed()}
          {currentScreen === "Comments" && renderComment()}
          {currentScreen === "Comments List Updated" &&
            renderCommentListUpdated()}
          {currentScreen === "Comments List Update Failed" &&
            renderCommentListFailed()}
        </div>
      )}
      <FooterBar />
    </div>
  );
};

export default FlashcardGame;
