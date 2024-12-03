//Imports:
"use server";
import { createClient } from "../_lib/supabase/server";

// Add or update the quiz score:
export const addQuizScore = async (score, quizId) => {
  const supabase = createClient(); //Access the Supabase
  const {
    data: { user },
  } = await supabase.auth.getUser(); //Get user

  // Fetch existing score data for the quiz:
  const { data, error } = await supabase
    .from("results")
    .select("*")
    .eq("user_id", user.id)
    .eq("quiz_id", quizId)
    .single();
  if (error) {
    console.log(
      "[ADD QUIZ SCORE | Check existing score]: no data found for user"
    );
  }

  // If no previous score, insert the new score:
  if (!data) {
    const { error } = await supabase.from("results").insert({
      user_id: user.id,
      result: score,
      quiz_id: quizId,
    });
    if (error) {
      console.log("[ADD QUIZ SCORE | Insert new score]:", error);
    }
    return;
  }

  // If the new score is greater than the old one, update it:
  if (score > data.result) {
    const { error } = await supabase
      .from("results")
      .update({ result: score })
      .eq("user_id", user.id)
      .eq("quiz_id", quizId);
    if (error) {
      console.log("[ADD QUIZ SCORE | Update score]:", error);
    }
  }
  // If the new score is less than the old one, update the attempts:
  else if (score < data.result) {
    const { error } = await supabase
      .from("results")
      .update({ result: data.result }) // Keep the old score
      .eq("user_id", user.id);
    if (error) {
      console.log("[ADD QUIZ SCORE | Update attempts]:", error);
    }
  }
  averageScore(quizId);
};

// Calculate average score for a specific quiz:
export const averageScore = async (quizId) => {
  const supabase = createClient(); //Access the Supabase
  let sum = 0; // Initialize sum to 0

  // Fetch all the scores for the quiz:
  const { data, error } = await supabase
    .from("results")
    .select("result")
    .eq("quiz_id", quizId);
  if (error) {
    console.log("[AVERAGE SCORE]:", error);
    return 0; // Return 0 in case of error
  }
  // If no results found, return 0:
  if (!data || data.length === 0) {
    console.log("[AVERAGE SCORE]: No results found for this quiz");
    return 0;
  }

  // Calculate the sum of all scores:
  data.forEach((score) => {
    const result = score.result;
    if (typeof result === "number") {
      sum += result; // Accumulate the valid scores
    }
  });

  // Calculate the average:
  const average = (sum / data.length).toFixed(2);
  
  //Insert average in database:
  const { error : averageError } = await supabase
  .from("quizzes")
  .update({
    average: average,
  })
  .eq("id", quizId);
  if(averageError){
    console.log("[QUIZ || averageScore]", averageError)
  }
};

export const getNbQuestions = async (quizId) => {
  const supabase = createClient();
  const { data: questions, error } = await supabase
    .from("questions")
    .select("*")
    .eq("quizz_id", quizId);
  if (error) console.log("[GET NB QUESTIONS:]", error);
  return questions.length;
};