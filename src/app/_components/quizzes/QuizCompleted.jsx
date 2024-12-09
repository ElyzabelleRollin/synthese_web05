import React from "react";
import Link from "next/link";

const QuizCompleted = ({ score, questionsLength, userID, average }) => {
  return (
    <div>
      <h2>Quiz Completed!</h2>
      <p>
        Your score: {score} out of {questionsLength}
      </p>
      <p>
        The average score is:{" "}
        {average !== null
          ? `${average} out of ${questionsLength}`
          : `0 out of ${questionsLength}`}
      </p>
      <Link href="/application/quizzes">Go back to the quizzes</Link>
      <Link href={`/application/profiles/${userID}`}>Go to your profile</Link>
    </div>
  );
};

export default QuizCompleted;
