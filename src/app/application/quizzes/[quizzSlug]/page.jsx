//Imports:
import React from "react";
import QuestionsList from "../../../_components/questions/QuestionsList";
import { createClient } from "@/app/_lib/supabase/server";

//Page to play a quiz
const QuizPage = async ({ params }) => {
  const { quizzSlug } = params; //Get the slug of the quiz
  const supabase = createClient(); //Access the Supabase

  // Get the user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Get the quiz:
  const { data: quiz, error } = await supabase
    .from("quizzes")
    .select("*")
    .eq("slug", quizzSlug)
    .single();
  if (error) console.log("[GET QUIZ]", error);

  // Get all the questions for the quiz:
  const { data: questions, error: questionsError } = await supabase
    .from("questions")
    .select("*")
    .eq("quizz_id", quiz.id);
  if (questionsError) console.log("[GET QUESTIONS]", questionsError);

  //fetch the xp from the profile of the user
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('xp')
    .eq('id', user.id)
    .single();

  return (
    <div>
      {/* <h1>{quiz.name}</h1> */}
      {/* <p>{quiz.description}</p> */}
      <QuestionsList questions={questions} quiz={quiz} userID={user.id} userXp={profile.xp} />
    </div>
  );
};

export default QuizPage;
