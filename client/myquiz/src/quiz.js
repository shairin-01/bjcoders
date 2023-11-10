import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Quiz = () => {
 const [quizData, setQuizData] = useState([]);
 const [currentQuestion, setCurrentQuestion] = useState(0);
 const [showScore, setShowScore] = useState(false);
 const [score, setScore] = useState(0);

 useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('https://opentdb.com/api.php?amount=10&category=18&type=multiple');
      setQuizData(result.data.results);
    };

    fetchData();
 }, []);

 const handleResponse = (e) => {
    if (e.target.value === quizData[currentQuestion].correct_answer) {
      setScore(score + 1);
    }

    setCurrentQuestion(currentQuestion + 1);
 };

 const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
 };

 return (
    <div className="quiz-container">
      {showScore ? (
        <div className="score-section">
          <h2>Quiz Finished!</h2>
          <h3>Your score is {score}/10</h3>
          <button onClick={resetQuiz}>Play Again</button>
        </div>
      ) : (
        <div className="question-section">
          <h2>{quizData[currentQuestion].question}</h2>
          <form onSubmit={handleResponse}>
            {quizData[currentQuestion].incorrect_answers.map((answer, index) => (
              <input key={index} type="radio" value={answer} name="answer" />
            ))}
            <input type="radio" value={quizData[currentQuestion].correct_answer} name="answer" />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
 );
};

export default Quiz;