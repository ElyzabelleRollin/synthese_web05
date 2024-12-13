import React from "react";
import QuestionsList from "../../../_components/questions/QuestionsList";
import { createClient } from "@/app/_lib/supabase/server";

//Page to play a quiz
const QuizPage = async ({ params }) => {
  const { quizzSlug } = params;
  const supabase = createClient();

  // Get the user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Get the quiz
  const { data: quiz, error } = await supabase
    .from("quizzes")
    .select("*")
    .eq("slug", quizzSlug)
    .single();
  if (error) console.log("[GET QUIZ]", error);

  // Get all the questions for the quiz
  const { data: questions, error: questionsError } = await supabase
    .from("questions")
    .select("*")
    .eq("quizz_id", quiz.id);
  if (questionsError) console.log("[GET QUESTIONS]", questionsError);

  return (
    <div>
      <h1>{quiz.name}</h1>
      <p>{quiz.description}</p>
      <QuestionsList questions={questions} quiz={quiz} userID={user.id} />
    </div>
  );
};

export default QuizPage;
