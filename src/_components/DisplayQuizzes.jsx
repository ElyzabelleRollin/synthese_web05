import React from "react";
import Link from "next/link"; // Make sure Link is imported
import { createClient } from "@/app/_lib/supabase/server";

const DisplayQuizzes = async ({ quizzes }) => {
  return (
    <div>
      {quizzes && quizzes.length > 0 ? (
        <div className="grid grid-cols-3 gap-4">
          {quizzes.map((quizz) => (
            <div key={quizz.id} className="border p-4 bg-slate-400">
              <h2>{quizz.quizzes.name}</h2>

              <p>
                Highest score: {quizz.result} /{" "}
                {getNbQuestions(quizz.quizzes.id)}
              </p>
              <p>Number of attempts: {quizz.attempts}</p>

              {quizz.quizzes ? (
                <Link href={`/application/quizzes/${quizz.quizzes.slug}`}>
                  Go to the quiz
                </Link>
              ) : (
                <Link href={`/application/quizzes/${quizz.slug}`}>
                  Go to the quiz
                </Link>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No quizzes available</p>
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

export default DisplayQuizzes;
