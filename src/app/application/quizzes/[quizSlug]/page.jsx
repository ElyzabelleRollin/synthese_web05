import React from "react";
import QuestionsList from "../../../../_components/QuestionsList";
import { createClient } from "@/app/_lib/supabase/server";

const QuizPage = async ({ params }) => {
  const { quizSlug } = params;
  const supabase = createClient();
  const { data: quiz, error } = await supabase
    .from("quizzes")
    .select("*")
    .eq("slug", quizSlug)
    .single();

  const { data: questions } = await supabase
    .from("questions")
    .select("*")
    .eq("quizz_id", quiz.id);

  return (
    <div>
      <h1>{quiz.name}</h1>
      <p>{quiz.description}</p>
      <QuestionsList questions={questions} quizId={quiz.id} />
    </div>
  );
};

export default QuizPage;
