'use server';

import { createClient } from "../_lib/supabase/server";


export const createQuestionAction = async (formData) => {
    //récupère le titre de la question
    const title = formData.get("title");
    //récupère tous les choix de réponse
    const choices = formData.getAll("choices");
    //récupère le slug du quizz en hidden input
    const quizzSlug = formData.get("quizzSlug");
    //récupère la bonne réponse en hidden input?
    const correctAnswer = formData.get("correctAnswer");
    console.log(correctAnswer);

    //créer object ici
    const answersObject = {
        choices: choices,
        correct_answer: correctAnswer
    };
    console.log(answersObject);

    //pour mardi le 19 nov : change choices pour answersObject, puis modifier le reste
    //transforme les choix de réponse en json pour les transférer à la db
    const choicesJson = JSON.stringify(answersObject);

    //pour communiquer avec la db
    const supabase = createClient();

    //récupère l'id du quizz depuis la db avec le slug du quizz
    const { data: quizz, error } = await supabase.from("quizzes").select("id").eq("slug", quizzSlug).single();
    console.log("here!");
    console.log(choices);

    //INSERT INTO questions
    const { error: questionError } = await supabase.from("questions").insert({
        text: title,
        answers: choicesJson,
        quizz_id: quizz.id
    });
    // console.log(questionError);
};

