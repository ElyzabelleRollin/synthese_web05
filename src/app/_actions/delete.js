"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "../_lib/supabase/server";

export const deleteQuiz = async (id) => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { error } = await supabase.from("quizzes").delete().eq("id", id);
  console.log("[QUIZ DELETED]:", error);
  revalidatePath("/application/profiles/" + user.id);
};
