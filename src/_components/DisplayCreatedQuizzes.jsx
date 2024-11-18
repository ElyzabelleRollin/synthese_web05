import React from "react";
import Link from "next/link";
import { averageScore } from "@/app/_actions/create";
import { createClient } from "@/app/_lib/supabase/server";

const DisplayCreatedQuizzes = async ({ quizzes }) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <div>
      {quizzes && quizzes.length > 0 ? (
        <div className="grid grid-cols-3 gap-4">
          {quizzes.map((quiz) => (
            <div key={quiz.id} className="border p-4 bg-slate-400">
              <h2>{quiz.name}</h2>
              {quiz.created_by == user.id && (
                <>
                  <p>Number of attempts: {quiz.attempts ? quiz.attempts : 0}</p>
                  <p>
                    Average result: {averageScore(quiz.id)} /{" "}
                    {getNbQuestions(quiz.id)}
                  </p>
                </>
              )}
              <Link href={`/application/quizzes/${quiz.slug}`}>
                Go to the quiz
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No quizzes found.</p>
      )}
    </div>
  );
};

const getNbQuestions = async (quizId) => {
  const supabase = createClient();
  const { data: questions, error } = await supabase
    .from("questions")
    .select("*")
    .eq("quizz_id", quizId);
  if (error) console.log("[GET NB QUESTIONS:]", error);
  return questions.length;
};

export default DisplayCreatedQuizzes;
