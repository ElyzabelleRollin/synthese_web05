"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { deleteQuiz } from "@/app/_actions/delete";
import { getNbQuestions } from "@/app/_actions/quiz";
import Primarybutton from "../primarybutton/primarybutton";
import Tertiarybutton from "../tertiarybutton/tertiarybutton";
import styles from "./DisplayCreatedQuizzes.module.css";
import ScoreQuizzes from "./ScoreQuizzes";
import RealTime from "./RealTime";

const DisplayCreatedQuizzes = ({ quizzes, userId }) => {
  const [questionsCount, setQuestionsCount] = useState({});

  console.log("[Quizzes]", quizzes);
  console.log("[UserId]", userId);

  useEffect(() => {
    // Fetch the number of questions for all quizzes
    const fetchQuestionsCounts = async () => {
      const counts = {};
      for (const quiz of quizzes) {
        counts[quiz.id] = await getNbQuestions(quiz.id);
      }
      setQuestionsCount(counts);
    };

    fetchQuestionsCounts();
  }, [quizzes]);

  // here add state for object containing attempts and averageScore in parent component
  const [currentScore, setCurrentScore] = useState({
    attempts: 0,
    average: 0,
    id: null,
  });

  // console.log(currentScore);

  return (
    <div>
      <RealTime userId={userId} setCurrentScore={setCurrentScore} />
      {quizzes && quizzes.length > 0 ? (
        <div className="grid grid-cols-3 gap-4">
          {quizzes.map((quiz) => (
            <div key={quiz.id} className="border p-4 bg-slate-400">
              <h2>{quiz.name}</h2>
              {quiz.created_by == userId && (
                <>
                  {currentScore.id === quiz.id ? (
                    <ScoreQuizzes
                      attempts={currentScore.attempts}
                      averageScore={currentScore.average}
                      nbQuestions={questionsCount[quiz.id]}
                    />
                  ) : (
                    <ScoreQuizzes
                      attempts={quiz.attempts ? quiz.attempts : 0}
                      averageScore={quiz.average ? quiz.average : 0}
                      nbQuestions={questionsCount[quiz.id]}
                    />
                  )}
                </>
              )}
              <Link href={`/application/quizzes/${quiz.slug}`}>
                Go to the quiz
              </Link>
              {quiz.created_by == userId && (
                <div>
                  <Link href={`/application/quizzes/${quiz.slug}/edit`}>
                    Edit
                  </Link>
                  <form action={() => deleteQuiz(quiz.id)}>
                    <button type="submit">Delete</button>
                  </form>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No quizzes found.</p>
      )}
    </div>
  );
};

export default DisplayCreatedQuizzes;
