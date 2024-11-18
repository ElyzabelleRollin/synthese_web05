'use server';

import { createClient } from "../_lib/supabase/server";


export const createQuestionAction = async (formData) => {
    //get the question title from the form
    const title = formData.get("title");
    //get the quizz slug from the form
    const quizzSlug = formData.get("quizzSlug");
    //get all the choices from the form
    const choices = formData.getAll("choices");

    //créer object ici

    //transform my choices in json to transfer to the database
    const choicesJson = JSON.stringify(choices);

    //pour communiquer avec la db
    const supabase = createClient();

    //get the quizz id from the database from the quizz slug
    const { data: quizz, error } = await supabase.from("quizzes").select("id").eq("slug", quizzSlug).single();
    // console.log(quizzSlug);
    console.log("here!");
    // console.log(error);
    console.log(choices);

    //INSERT INTO questions
    const { error: questionError } = await supabase.from("questions").insert({
        text: title,
        answers: choicesJson,
        quizz_id: quizz.id
    });
    console.log(questionError);
};

