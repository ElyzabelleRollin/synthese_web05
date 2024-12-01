//Imports:
import React from "react";
import Link from "next/link";
import { averageScore } from "@/app/_actions/quiz";
import { createClient } from "@/app/_lib/supabase/server";
import { deleteQuiz } from "@/app/_actions/delete";

//Display quizzes created by the user
// on his profile if quiz's not banned:
const DisplayCreatedQuizzes = async ({ quizzes }) => {
  const supabase = createClient(); //Access supabase
  const {
    data: { user },
  } = await supabase.auth.getUser(); //Get user

  return (
    <div>
      {quizzes && quizzes.length > 0 ? (
        <div className="grid grid-cols-3 gap-4">
          {quizzes.map((quiz) => (
            <div key={quiz.id} className="border p-4 bg-slate-400">
              <h2>{quiz.name}</h2>
              {quiz.created_by == user.id && (
                <>
                  {/* If the quiz is banned, show the reason */}
                  {quiz.banned && (
                    <div>
                      <p>Banned</p>
                      <p>{quiz.banned_reason}</p>
                    </div>
                  )}
                  <p>Number of attempts: {quiz.attempts ? quiz.attempts : 0}</p>
                  <p>
                    Average result: {averageScore(quiz.id)} /{" "}
                    {getNbQuestions(quiz.id)}
                  </p>
                </>
              )}
              {/* If the quiz is not banned, show the link to the quiz */}
              {!quiz.banned && (
                <Link href={`/application/quizzes/${quiz.slug}`}>
                  Go to the quiz
                </Link>
              )}
              {quiz.created_by == user.id && (
                <div>
                  <Link href={`/application/quizzes/${quiz.slug}/edit`}>
                    Edit
                  </Link>
                  <form action={deleteQuiz(quiz.id)}>
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

//Get the number of questions in a quiz:
const getNbQuestions = async (quizId) => {
  const supabase = createClient(); //Access supabase
  //Get questions:
  const { data: questions, error } = await supabase
    .from("questions")
    .select("*")
    .eq("quizz_id", quizId);
  if (error) console.log("[DISPLAY CREATED QUIZZES | getNbQuestions]", error);
  return questions.length; //Return the number of questions
};
export default DisplayCreatedQuizzes;
