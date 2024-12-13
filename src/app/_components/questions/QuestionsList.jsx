//Imports:
"use client";
import React, { useState } from "react";
import { addQuizScore } from "@/app/_actions/quiz";
import { fetchAverage } from "@/app/_actions/quiz";
import QuizCompleted from "../quizzes/QuizCompleted";

//Component that allows you to play a quiz
//Shows the questions one by one
const QuestionsList = ({ questions, quiz, userID }) => {
  const [userAnswers, setUserAnswers] = useState(questions.map(() => "")); // State to store user's answers
  const [quizCompleted, setQuizCompleted] = useState(false); // State to track quiz completion
  const [score, setScore] = useState(0); // State to store score
  const [average, setAverage] = useState(null); // State to store the average score
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track current question

  // Function to handle answer change:
  const handleAnswerChange = (questionIndex, answer) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[questionIndex] = answer;
    setUserAnswers(updatedAnswers);
  };

  // Function to handle form submission:
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    let calculatedScore = 0; // Initialize calculated score
    // Calculate score:
    questions.forEach((question, index) => {
      const answers = JSON.parse(question.answers); // Parse answers
      // Check if the user's answer is correct:
      if (userAnswers[index] === answers.correct_answer) calculatedScore++; // Increment score if correct
    });
    setScore(calculatedScore); // Set score in state
    await addQuizScore(calculatedScore, quiz.id); // Add quiz score to database
    setAverage(await fetchAverage(quiz.id)); // Fetch average score for the quiz
    setQuizCompleted(true); // Set quizCompleted to true
  };

  // Function to play a sound:
  const playSound = (sound) => {
    // Check if sound is available:
    if (!sound) {
      console.error("No sound available to play!");
      return;
    }
    const audio = new Audio(sound); // Create audio element
    audio.play().catch((err) => console.error("Error playing audio:", err)); // Play audio
  };

  // Function to go to the next question:
  const goToNextQuestion = () => {
    // Check if the current question is the last one, if not, go to the next question:
    if (currentQuestionIndex < questions.length - 1)
      setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  return (
    <div>
      {!quizCompleted ? (
        <form onSubmit={handleSubmit}>
          {questions.map((question, index) => {
            if (index !== currentQuestionIndex) return null; // Show only the current question
            const answers = JSON.parse(question.answers);
            return (
              <div key={question.id}>
                <h2>{question.text}</h2>
                <ul>
                  {question.type === "Identify the sound" && (
                    <button
                      type="button"
                      onClick={() => playSound(answers.sound)}
                    >
                      Play sound
                    </button>
                  )}
                  {answers.choices.map((answer, idx) => (
                    <li key={idx}>
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={answer.uuid}
                        onChange={() => handleAnswerChange(index, answer.uuid)}
                        checked={userAnswers[index] === answer.uuid}
                      />
                      {question.type === "Identify the sound" ||
                      question.type === "Find the intruder" ? (
                        <img src={answer.choice} />
                      ) : (
                        <p>{answer.choice}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
          <div>
            {currentQuestionIndex < questions.length - 1 && (
              <button type="button" onClick={goToNextQuestion}>
                Next
              </button>
            )}
            {currentQuestionIndex === questions.length - 1 && (
              <button type="submit">Submit</button>
            )}
          </div>
        </form>
      ) : (
        <QuizCompleted
          score={score}
          questionsLength={questions.length}
          userID={userID}
          average={average}
        />
      )}
    </div>
  );
};

export default QuestionsList;
