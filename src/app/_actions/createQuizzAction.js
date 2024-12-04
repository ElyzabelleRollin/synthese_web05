"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { createClient } from "../_lib/supabase/server";

export const createQuizzAction = async (initialState, formData) => {
  //récupère les données du formulaire
  const title = formData.get("title");
  const description = formData.get("description");

  //valider les données avec zod
  const quizz = { title, description };
  const validationSchema = z.object({
    title: z.string().min(1, { message: "A title is required" }),
    description: z.string().min(1, { message: "A description is required" }),
  });

  const { success, error } = validationSchema.safeParse(quizz);
  if (!success) {
    console.log(error.flatten());
    return {
      message: "error",
      error: "A title and a description are required.",
    };
  }

  //pour communiquer avec la db
  const supabase = createClient();

  //UPSERT le nouveau quizz (mix de insert et update, permet de rajouter data:newQuizz pour avoir accès au slug pour la redirection)
  const { data: newQuizz, error: quizzError } = await supabase
    .from("quizzes")
    .upsert({
      name: title,
      description: description,
    })
    .select()
    .single();

  //redirect vers la page de modification du quizz qu'on vient de créer
  redirect(`/application/quizzes/${newQuizz.slug}/edit`);
};
