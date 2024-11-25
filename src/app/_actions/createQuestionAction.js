"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "../_lib/supabase/server";

export const createQuestionAction = async (formData) => {
  //récupère le titre de la question
  const title = formData.get("title");
  //récupère tous les choix de réponse
  const choices = formData.getAll("choices");
  //récupère tous les uuid des choix de réponse
  const choices_uuid = formData.getAll("choices_uuid");
  //récupère le slug du quizz en hidden input
  const quizzSlug = formData.get("quizzSlug");
  //récupère la bonne réponse en hidden input?
  const correctAnswer = formData.get("correctAnswer");
  console.log(correctAnswer);

  //tableau vide pour reconstruitre les choix de réponse avec leurs uuid
  const TableauChoix = [];

  //boucle for sur choices, le tableau des choix de réponse
  for (let i = 0; i < choices.length; i++) {
    //push dans le tableau TableauChoix
    TableauChoix.push({
      choice: choices[i],
      uuid: choices_uuid[i],
    });
  }

  //reconstruire
  const answersObject = {
    choices: TableauChoix,
    correct_answer: correctAnswer,
  };

  //créer object ici
  // const answersObject = {
  //     choices: choices,
  //     correct_answer: correctAnswer
  // };
  // console.log(answersObject);

  //pour mardi le 19 nov : change choices pour answersObject, puis modifier le reste
  //transforme les choix de réponse en json pour les transférer à la db
  const choicesJson = JSON.stringify(answersObject);

  //pour communiquer avec la db
  const supabase = createClient();

  //récupère l'id du quizz depuis la db avec le slug du quizz
  const { data: quizz, error } = await supabase
    .from("quizzes")
    .select("id")
    .eq("slug", quizzSlug)
    .single();
  console.log("here!");
  console.log(choices);

  //INSERT INTO questions
  const { error: questionError } = await supabase.from("questions").insert({
    text: title,
    answers: choicesJson,
    quizz_id: quizz.id,
  });
  // console.log(questionError);
  revalidatePath(`/application/quizzes/${quizzSlug}/edit`);
};
