"use client";
import React, { useState, useEffect } from "react";
import { addQuizScore } from "@/app/_actions/create";
import { averageScore } from "@/app/_actions/create";

const QuestionsList = ({ questions, quizId }) => {
  // State to store user's answers
  const [userAnswers, setUserAnswers] = useState(questions.map(() => ""));

  // State to track quiz completion
  const [quizCompleted, setQuizCompleted] = useState(false);

  // State to store score
  const [score, setScore] = useState(0);

  // State to store the average score
  const [average, setAverage] = useState(null);

  // Handle change in user's answer
  const handleAnswerChange = (questionIndex, answer) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[questionIndex] = answer;
    setUserAnswers(updatedAnswers);
  };

  // Handle form submission and calculate score
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Calculate the score by comparing user answers with correct answers
    let calculatedScore = 0;
    questions.forEach((question, index) => {
      // If the answer is correct, increment score
      if (userAnswers[index] === question.correctAnswer) {
        calculatedScore++;
      }
    });

    setScore(calculatedScore);
    await addQuizScore(calculatedScore, quizId);
    setQuizCompleted(true);
  };

  // Fetch the average score after quiz completion
  useEffect(() => {
    const fetchAverageScore = async () => {
      if (quizCompleted) {
        const avg = await averageScore(quizId);
        setAverage(avg);
      }
    };

    fetchAverageScore();
  }, [quizCompleted, quizId]); // Trigger when quiz is completed

  return (
    <div>
      {!quizCompleted ? (
        <form onSubmit={handleSubmit}>
          {questions.map((question, index) => {
            // Parse the answers from JSON string to an array
            const answers = JSON.parse(question.answers);

            return (
              <div key={question.id}>
                <h2>{question.text}</h2>
                <ul>
                  {answers.map((answer, idx) => (
                    <li key={idx}>
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={answer}
                        onChange={() => handleAnswerChange(index, answer)}
                        checked={userAnswers[index] === answer}
                      />
                      {answer}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <h2>Quiz Completed!</h2>
          <p>
            Your score: {score} out of {questions.length}
          </p>
          <p>
            The average score is:{" "}
            {average !== null
              ? `${average} out of ${questions.length}`
              : "Loading..."}
          </p>
        </div>
      )}
    </div>
  );
};

export default QuestionsList;
