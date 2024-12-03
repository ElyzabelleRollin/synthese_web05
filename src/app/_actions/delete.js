"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "../_lib/supabase/server";

export const deleteQuiz = async (id) => {
  const supabase = createClient();

  // Authenticate user server-side
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Delete the quiz
  const { error } = await supabase.from("quizzes").delete().eq("id", id);
  if (error) {
    console.error("[DELETE ERROR]:", error);
    throw new Error("Failed to delete quiz.");
  }

  // Revalidate the user profile path
  revalidatePath(`/application/profiles/${user.id}`);
};
