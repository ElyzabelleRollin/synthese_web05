"use server";
import { createClient } from "../_lib/supabase/server";

export const addQuizScore = async (score, quizId) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("results")
    .select("*")
    .eq("user_id", user.id)
    .eq("quiz_id", quizId);
  if (error) console.log("[ADD QUIZ SCORE 1]:", error);

  if (data.length > 0) {
    const { error } = await supabase
      .from("results")
      .update({ result: score })
      .eq("user_id", user.id)
      .eq("quiz_id", quizId);
    if (error) console.log("[ADD QUIZ SCORE 2]:", error);
  } else {
    const { error } = await supabase.from("results").insert({
      user_id: user.id,
      result: score,
      quiz_id: quizId,
    });
    if (error) console.log("[ADD QUIZ SCORE 3]:", error);
  }
};

export const averageScore = async (quizId) => {
  const supabase = createClient();
  let sum = 0; // Initialize sum to 0
  const { data, error } = await supabase
    .from("results")
    .select("result")
    .eq("quiz_id", quizId);
  if (error) console.log("[AVERAGE SCORE]:", error);

  if (data.length === 0) {
    console.log("[AVERAGE SCORE]: No results found for this quiz");
    return 0; // Return 0 if there are no results
  }

  // Iterate through the data and calculate the sum
  data.forEach((score) => {
    const result = score.result;
    if (typeof result === "number") {
      // Check if result is a valid number
      sum += result;
    }
  });

  const average = sum / data.length;
  return average.toFixed(2);
};
