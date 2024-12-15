//Imports:
"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "../_lib/supabase/server";
import { redirect } from "next/navigation";
import { set } from "zod";

//Action to add a question to a quizz:
export const createQuestionAction = async (formData) => {
  //Get the data from the form:
  const title = formData.get("title"); //Title of the question
  const choices = formData.getAll("choices"); //Question choices
  const choices_uuid = formData.getAll("choices_uuid"); //Question choices uuid
  const quizzSlug = formData.get("quizzSlug"); //Slug of the quizz
  const correctAnswer = formData.get("correctAnswer"); //Correct answer
  const questionType = formData.get("questionType"); //Type of question
  const sound = formData.get("sound"); //Sound for Identify the sound type's questions

  //Protection against errors if no sound is selected:
  if (!sound && questionType == "Identify the sound") {
    console.error("No sound available to play!");
    return;
  }

  const TableauChoix = []; //Array to rebuild the choices with their uuid

  //Push the choices and uuid into the array
  for (let i = 0; i < choices.length; i++) {
    //Create an object with the choice and uuid:
    TableauChoix.push({
      choice: choices[i],
      uuid: choices_uuid[i],
    });
  }

  let answersObject; //Object to store the answers

  //Build the object to send to supabase:
  if (questionType == "Identify the sound") {
    answersObject = {
      sound: sound,
      choices: TableauChoix,
      correct_answer: correctAnswer,
    };
  } else {
    answersObject = {
      choices: TableauChoix,
      correct_answer: correctAnswer,
    };
  }

  const choicesJson = JSON.stringify(answersObject); //Stringify the object

  const supabase = createClient(); //Get access to supabase
  const {
    data: { user },
  } = await supabase.auth.getUser(); //Get user

  //Get the id of the quizz
  const { data: quizz, error } = await supabase
    .from("quizzes")
    .select("id")
    .eq("slug", quizzSlug)
    .single();
  if (error) {
    console.error("[createQuestionAction | Get quizz]", error);
    return;
  }

  //INSERT INTO questions
  const { error: questionError } = await supabase.from("questions").insert({
    text: title,
    answers: choicesJson,
    quizz_id: quizz.id,
    type: questionType,
  });
  if (questionError) {
    console.error("[createQuestionAction | Insert question]", questionError);
    return;
  }
  revalidatePath(`/application/quizzes/${quizzSlug}/edit`); //Revalidate the page
};

export const createQuestionActionFinish = async (formData) => {
  //Get the data from the form:
  const title = formData.get("title"); //Title of the question
  const choices = formData.getAll("choices"); //Question choices
  const choices_uuid = formData.getAll("choices_uuid"); //Question choices uuid
  const quizzSlug = formData.get("quizzSlug"); //Slug of the quizz
  const correctAnswer = formData.get("correctAnswer"); //Correct answer
  const questionType = formData.get("questionType"); //Type of question
  const sound = formData.get("sound"); //Sound for Identify the sound type's questions

  console.log("[SOUND ACTION]", sound);

  //Protection against errors if no sound is selected:
  if (!sound && questionType == "Identify the sound") {
    console.error("No sound available to play!");
    return;
  }

  const TableauChoix = []; //Array to rebuild the choices with their uuid

  //Push the choices and uuid into the array
  for (let i = 0; i < choices.length; i++) {
    //Create an object with the choice and uuid:
    TableauChoix.push({
      choice: choices[i],
      uuid: choices_uuid[i],
    });
  }

  //Build the object with the choices
  //and the correct answer:
  const answersObject = {
    choices: TableauChoix,
    correct_answer: correctAnswer,
  };

  const choicesJson = JSON.stringify(answersObject); //Stringify the object

  const supabase = createClient(); //Get access to supabase
  const {
    data: { user },
  } = await supabase.auth.getUser(); //Get user

  //Get the id of the quizz
  const { data: quizz, error } = await supabase
    .from("quizzes")
    .select("id")
    .eq("slug", quizzSlug)
    .single();
  if (error) console.error("[createQuestionAction | Get quizz]", error);

  //INSERT INTO questions
  const { error: questionError } = await supabase.from("questions").insert({
    text: title,
    answers: choicesJson,
    quizz_id: quizz.id,
    type: questionType,
  });
  if (questionError)
    console.error("[createQuestionAction | Insert question]", questionError);

  redirect(`/application/profiles/${user.id}`); //Redirect to the user's profile
};
