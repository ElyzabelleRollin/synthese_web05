//Imports:
"use client";
import React, { useEffect, useState } from "react";
import { addQuizScore } from "@/app/_actions/quiz";
import QuizCompleted from "../quizzes/QuizCompleted";
import styles from "./QuestionsList.module.css";
import Primarybutton from "../primarybutton/primarybutton";
import { addXp } from "@/app/_actions/badges";

//Component that allows you to play a quiz
//Shows the questions one by one
const QuestionsList = ({ questions, quiz, userID }) => {
  const [userAnswers, setUserAnswers] = useState(questions.map(() => "")); // State to store user's answers
  const [quizCompleted, setQuizCompleted] = useState(false); // State to track quiz completion
  const [score, setScore] = useState(0); // State to store score
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track current question
  const [earnedXp, setEarnedXp] = useState(0);

  // Function to handle answer change:
  const handleAnswerChange = (questionIndex, answer) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[questionIndex] = answer;
    setUserAnswers(updatedAnswers);
  };

  // Function to handle form submission:
  const handleSubmit = () => {
    let calculatedScore = 0; // Initialize calculated score
    // Calculate score
    questions.forEach((question, index) => {
      const answers = JSON.parse(question.answers); // Parse answers
      // Check if the user's answer is correct:
      if (userAnswers[index] === answers.correct_answer) calculatedScore++; // Increment score if correct
    });
    setScore(calculatedScore); // Set score in state
    addQuizScore(calculatedScore, quiz.id); // Add quiz score to database
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
    <div className={styles.playQuiz}>
      {!quizCompleted ? (
        <form action={handleSubmit}>
          {questions.map((question, index) => {
            if (index !== currentQuestionIndex) return null; // Show only the current question
            const answers = JSON.parse(question.answers);
            return (
              <div className={styles.form} key={question.id}>
                <h2 className={styles.questionTitle}>{question.text}</h2>
                <div className={styles.questionElement}>
                  {question.type === "Identify the sound" && (
                    <button
                      className={styles.playsoundbtn}
                      type="button"
                      onClick={() => playSound(answers.sound)}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        className={styles.playicon}
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></g>
                        <g id="SVGRepo_iconCarrier">
                          <path
                            d="M21.4086 9.35258C23.5305 10.5065 23.5305 13.4935 21.4086 14.6474L8.59662 21.6145C6.53435 22.736 4 21.2763 4 18.9671L4 5.0329C4 2.72368 6.53435 1.26402 8.59661 2.38548L21.4086 9.35258Z"
                            fill="#ffffff"
                          ></path>
                        </g>
                      </svg>
                    </button>
                  )}
                </div>
                <ul className={styles.answersList}>
                  {answers.choices.map((answer, idx) => (
                    <li className={styles.answerCard} key={idx}>
                      <span className={styles.letter}>
                        {idx == 0
                          ? "A."
                          : idx == 1
                          ? "B."
                          : idx == 2
                          ? "C."
                          : idx == 3
                          ? "D."
                          : "E."}
                      </span>
                      {question.type === "Identify the sound" ||
                      question.type === "Find the intruder" ? (
                        <input
                          type="radio"
                          className={styles.input}
                          name={`question-${index}`}
                          value={answer.uuid}
                          onChange={() =>
                            handleAnswerChange(index, answer.uuid)
                          }
                          checked={userAnswers[index] === answer.uuid}
                        />
                      ) : (
                        <input
                          type="radio"
                          className={styles.inputText}
                          name={`question-${index}`}
                          value={answer.uuid}
                          onChange={() =>
                            handleAnswerChange(index, answer.uuid)
                          }
                          checked={userAnswers[index] === answer.uuid}
                        />
                      )}
                      {question.type === "Identify the sound" ||
                      question.type === "Find the intruder" ? (
                        <img src={answer.choice} className={styles.img} />
                      ) : (
                        <p>{answer.choice}</p>
                      )}
                    </li>
                  ))}
                  <li className={styles.buttonContainer}>
                    {currentQuestionIndex < questions.length - 1 && (
                      <Primarybutton
                        text="Next"
                        theme={"dark"}
                        iconright="ArrowRight"
                        clickaction={goToNextQuestion}
                      />
                    )}
                    {currentQuestionIndex === questions.length - 1 && (
                      <Primarybutton
                        text="Submit"
                        theme={"dark"}
                        iconright="ArrowRight"
                      />
                    )}
                  </li>
                </ul>
              </div>
            );
          })}
        </form>
      ) : (
        <QuizCompleted
          score={score}
          questionsLength={questions.length}
          userID={userID}
          average={quiz.average}
          earnedXp={earnedXp}
        />
      )}
      <div className={styles.bottombar}>
        <div className={styles.progressline}>
          <figure
            className={styles.linefill}
            style={{
              width: `${
                ((currentQuestionIndex + 1) * 100) / questions.length
              }%`,
            }}
          ></figure>
          <figure className={styles.linebg}></figure>
        </div>
        <div className={styles.progresstxt}>
          <p className={styles.text}>
            {currentQuestionIndex + 1}/{questions.length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuestionsList;
