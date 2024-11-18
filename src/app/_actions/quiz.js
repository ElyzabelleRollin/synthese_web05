"use server";
import { createClient } from "../_lib/supabase/server";

// Add or update the quiz score
export const addQuizScore = async (score, quizId) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fetch existing score data for the quiz
  const { data, error } = await supabase
    .from("results")
    .select("*")
    .eq("user_id", user.id)
    .eq("quiz_id", quizId)
    .single();
  if (error) {
    console.log("[ADD QUIZ SCORE 1]:", error);
    return;
  }

  // If no previous score, insert a new score
  if (!data) {
    const { error } = await supabase.from("results").insert({
      user_id: user.id,
      result: score,
      quiz_id: quizId,
    });
    if (error) {
      console.log("[ADD QUIZ SCORE 2]:", error);
    }
    return;
  }

  // If the new score is greater than the old one, update it
  if (score > data.result) {
    const { error } = await supabase
      .from("results")
      .update({ result: score })
      .eq("user_id", user.id)
      .eq("quiz_id", quizId);
    if (error) {
      console.log("[ADD QUIZ SCORE 3]:", error);
    }
  } else if (score < data.result) {
    const { error } = await supabase
      .from("results")
      .update({ result: data.result })
      .eq("user_id", user.id);
  }
};

// Calculate average score for a specific quiz
export const averageScore = async (quizId) => {
  const supabase = createClient();
  let sum = 0; // Initialize sum to 0

  // Fetch all the scores for the quiz
  const { data, error } = await supabase
    .from("results")
    .select("result")
    .eq("quiz_id", quizId);
  if (error) {
    console.log("[AVERAGE SCORE]:", error);
    return 0; // Return 0 in case of error
  }

  // If no results found, return 0
  if (!data || data.length === 0) {
    console.log("[AVERAGE SCORE]: No results found for this quiz");
    return 0;
  }

  // Calculate the sum of all scores
  data.forEach((score) => {
    const result = score.result;
    if (typeof result === "number") {
      sum += result; // Accumulate the valid scores
    }
  });

  // Calculate the average
  const average = sum / data.length;
  return average.toFixed(2); // Return average rounded to 2 decimal places
};
