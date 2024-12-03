//Imports:
"use client";
import React, { useState, useEffect } from "react";
import { addQuizScore } from "@/app/_actions/quiz";
import { averageScore } from "@/app/_actions/quiz";
import Link from "next/link";
import Loader from '@/app/_components/loader/loader';

const QuestionsList = ({ questions, quizId, userID }) => {
  const [userAnswers, setUserAnswers] = useState(questions.map(() => "")); // State to store user's answers
  const [quizCompleted, setQuizCompleted] = useState(false); // State to track quiz completion
  const [score, setScore] = useState(0); // State to store score
  const [average, setAverage] = useState(null); // State to store the average score

  // Handle change in user's answer:
  const handleAnswerChange = (questionIndex, answer) => {
    const updatedAnswers = [...userAnswers]; // Create a copy of user answers
    updatedAnswers[questionIndex] = answer; // Update the answer
    setUserAnswers(updatedAnswers); // Update the state
  };

  // Handle form submission and calculate score:
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    // Calculate the score by comparing user answers with correct answers:
    let calculatedScore = 0;
    questions.forEach((question, index) => {
      const answers = JSON.parse(question.answers); // Parse answers from JSON string
      // If the answer is correct, increment score:
      if (userAnswers[index] === answers.correct_answer) {
        calculatedScore++; // Increment score
      }
    });
    setScore(calculatedScore); // Update score
    await addQuizScore(calculatedScore, quizId); // Add score to Supabase
    setQuizCompleted(true); // Set quizCompleted to true
  };

  // Fetch the average score after quiz completion:
  useEffect(() => {
    // Function to fetch average score:
    const fetchAverageScore = async () => {
      //Check if the quiz is completed:
      if (quizCompleted) {
        const avg = await averageScore(quizId); // Fetch average score
        setAverage(avg); // Update average score in state to display
      }
    };
    fetchAverageScore(); // Call the function
  }, [quizCompleted, quizId]); // Trigger when quiz is completed

    //Play the sound
    function playSound(sound) {
      if (!sound) {
        console.error("No sound available to play!");
        return;
      }
      const audio = new Audio(sound);
      audio.play().catch((err) => console.error("Error playing audio:", err));
    }

  return (
    <div>
      {!quizCompleted ? (
        <form onSubmit={handleSubmit}>
          {questions.map((question, index) => {
            // Parse the answers from JSON string to an array:
            const answers = JSON.parse(question.answers)
            
            return (
              <div key={question.id}>
                <h2>{question.text}</h2>
                  {question.type === 'Identify the sound' && <button type="button" onClick={() => playSound(answers.sound)}>Play sound</button>}
                <ul>
                  {answers.choices.map((answer, idx) => (
                    <li key={idx}>
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={answer.uuid}
                        onChange={() => handleAnswerChange(index, answer.uuid)}
                        checked={userAnswers[index] === answer.uuid}
                      />
                      {answer.choice}
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
              : (<Loader />)}
          </p>
          <Link href="/application/quizzes">Go back to the quizzes</Link>
          <Link href={`/application/profiles/${userID}`}>
            Go to your profile
          </Link>
        </div>
      )}
    </div>
  );
};

export default QuestionsList;
