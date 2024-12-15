//Imports:
'use client';
import React, { useState } from 'react';
import { addQuizScore } from '@/app/_actions/quiz';
import { fetchAverage } from '@/app/_actions/quiz';
import QuizCompleted from '../quizzes/QuizCompleted';
import styles from './QuestionsList.module.css';
import Primarybutton from '../primarybutton/primarybutton';
import { addXp } from "@/app/_actions/badges";

//Component that allows you to play a quiz
//Shows the questions one by oneimport { addXp } from "@/app/_actions/badges";

const QuestionsList = ({ questions, quiz, userID }) => {
	const [userAnswers, setUserAnswers] = useState(questions.map(() => '')); // State to store user's answers
	const [quizCompleted, setQuizCompleted] = useState(false); // State to track quiz completion
	const [score, setScore] = useState(0); // State to store score
	const [average, setAverage] = useState(null); // State to store the average score
  const [earnedXp, setEarnedXp] = useState(0);
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

  // Fetch the average score after quiz completion:
  useEffect(() => {
    // Function to fetch average score:
    const fetchAverageScore = async () => {
      //Check if the quiz is completed:
      if (quizCompleted) {
        const avg = await averageScore(quiz.id); // Fetch average score
        setAverage(avg); // Update average score in state to display
      }
    };
    fetchAverageScore(); // Call the function
  }, [quizCompleted, quiz.id]); // Trigger when quiz is completed

    //Play the sound
    function playSound(sound) {
      if (!sound) {
        console.error("No sound available to play!");
        return;
      }
      const audio = new Audio(sound);
      audio.play().catch((err) => console.error("Error playing audio:", err));
    }

	//Calculate the score in percentage
	const calculatePercentage = (score, total) => {
		return Math.round((score / total) * 100);
	  };
	
	  // When the quiz is completed, calculate the XP and sent it to the action addXp
	  useEffect(() => {
		if (quizCompleted) {
		  const xp = calculatePercentage(score * 3, questions.length);
		  setEarnedXp(xp);
		  addXp(xp);
		}
	  }, [quizCompleted, score, questions.length]);
  
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
            {quiz.average !== null
              ? `${quiz.average} out of ${questions.length}`
              : `0 out of ${questions.length}`}
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
