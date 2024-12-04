"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "../_lib/supabase/server";

export const deleteQuizByQuizId = async (quizId) => {
  const supabase = createClient();
  // Authenticate user server-side
  const {
    data: { user },
  } = await supabase.auth.getUser();
  // Delete the quiz
  const { error } = await supabase.from("quizzes").delete().eq("id", quizId);
  if (error) console.error("[DELETE ERROR]:", error);

  // Revalidate the user profile path
  revalidatePath(`/application/profiles/${user.id}`);
};
