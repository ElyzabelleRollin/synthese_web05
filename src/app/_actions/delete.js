//Imports:
"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "../_lib/supabase/server";
import { redirect } from "next/navigation";

//Allows you to delete a quiz:
export const deleteQuizByQuizId = async (quizId) => {
  const supabase = createClient();
  // Authenticate user server-side
  const {
    data: { user },
  } = await supabase.auth.getUser();
  // Delete the quiz
  const { error } = await supabase.from("quizzes").delete().eq("id", quizId);
  if (error) console.error("[DELETE ERROR]:", error);

  // Revalidate the user profile path:
  revalidatePath(`/application/profiles/${user.id}`);
};

export const deleteQuestionByQuestionId = async (questionId, slug) => {
  const supabase = createClient();
  // Delete the question
  const { error } = await supabase
    .from("questions")
    .delete()
    .eq("id", questionId);
  if (error) console.error("[DELETE ERROR]:", error);
  // Revalidate the user profile path:
  redirect(`/application/quizzes/${slug}/edit`);
};
