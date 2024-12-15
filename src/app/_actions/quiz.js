//Imports:
"use server";
import { redirect } from "next/navigation";
import { createClient } from "../_lib/supabase/server";
import { revalidatePath } from "next/cache";

// Add or update the quiz score:
export const addQuizScore = async (score, quizId) => {
  const supabase = createClient(); //Access the Supabase
  const {
    data: { user },
  } = await supabase.auth.getUser(); //Get user

  // Fetch existing score data for the quiz
  const { data, error } = await supabase
    .from("results")
    .select("*")
    .eq("user_id", user.id)
    .eq("quiz_id", quizId)
    .single();
  if (error) {
    console.log(
      "[ADD QUIZ SCORE | Check existing score]: no data found for user"
    );
  }
  console.log("[ADDSCORE]");

  // If no previous score, insert the new score:
  if (!data) {
    const { error } = await supabase.from("results").insert({
      user_id: user.id,
      result: score,
      quiz_id: quizId,
    });
    if (error) {
      console.log("[ADD QUIZ SCORE | Insert new score]:", error);
    }
    return;
  }

  // If the new score is greater than the old one, update it:
  if (score > data.result) {
    const { error } = await supabase
      .from("results")
      .update({ result: score })
      .eq("user_id", user.id)
      .eq("quiz_id", quizId);
    if (error) {
      console.log("[ADD QUIZ SCORE | Update score]:", error);
    }
  }
  // If the new score is less than the old one, update the attempts:
  else if (score < data.result) {
    const { error } = await supabase
      .from("results")
      .update({ result: data.result }) // Keep the old score
      .eq("user_id", user.id);
    if (error) {
      console.log("[ADD QUIZ SCORE | Update attempts]:", error);
    }
  }
  averageScore(quizId);
};

// Calculate average score for a specific quiz:
export const averageScore = async (quizId) => {
  const supabase = createClient(); //Access the Supabase
  let sum = 0; // Initialize sum to 0

  // Fetch all the scores for the quiz:
  const { data, error } = await supabase
    .from("results")
    .select("result")
    .eq("quiz_id", quizId);
  if (error) {
    console.log("[AVERAGE SCORE]:", error);
  }

  // If no results found, return 0:
  if (!data || data.length === 0) {
    console.log("[AVERAGE SCORE]: No results found for this quiz");
  }

  // Calculate the sum of all scores:
  data.forEach((score) => {
    const result = score.result;
    if (typeof result === "number") {
      sum += result; // Accumulate the valid scores
    }
  });

  // Calculate the average:
  const average = (sum / data.length).toFixed(2);

  //Insert average in database:
  const { error: averageError } = await supabase
    .from("quizzes")
    .update({
      average: average,
    })
    .eq("id", quizId);
  if (averageError) {
    console.log("[QUIZ || averageScore]", averageError);
  }
};

export const fetchAverage = async (quizId) => {
  const supabase = createClient(); //Access the Supabase
  const { data: quiz, error } = await supabase
    .from("quizzes")
    .select("average")
    .eq("id", quizId)
    .single();
  if (error) {
    console.log("[FETCH AVERAGE SCORE]", error);
  }
  return quiz.average;
};

export const getNbQuestions = async (quizId) => {
  const supabase = createClient();
  const { data: questions, error } = await supabase
    .from("questions")
    .select("*")
    .eq("quizz_id", quizId);
  if (error) console.log("[GET NB QUESTIONS:]", error);
  return questions.length;
};

export const fetchQuizzes = async (min, max, searchQuery) => {
  const supabase = createClient();

  const { data: quizzes } = await supabase
    .from("quizzes")
    .select("*")
    // .ilike("name", `%${searchQuery}%`)
    .range(min, max);

  // console.log("[FETCH QUIZZES]" , quizzes)
  return quizzes;
};

// Update a question:
export const updateQuestion = async (formData) => {
  //Get the data from the form:
  const title = formData.get("title"); //Title of the question
  const choices = formData.getAll("choices"); //Question choices
  const choices_uuid = formData.getAll("choices_uuid"); //Question choices uuid
  const quizzSlug = formData.get("quizzSlug"); //Slug of the quizz
  const correctAnswer = formData.get("correctAnswer"); //Correct answer
  const questionType = formData.get("questionType"); //Type of question
  const questionId = formData.get("questionId"); //Id of the question
  const sound = formData.get("sound"); //Sound for Identify the sound type's questions

  //Protection against errors if no sound is selected:
  if (!sound && questionType == "Identify the sound") {
    console.error("No sound available to play!");
    return;
  }

  const QuizChoices = []; //Array to rebuild the choices with their uuid

  //Push the choices and uuid into the array
  for (let i = 0; i < choices.length; i++) {
    //Create an object with the choice and uuid:
    QuizChoices.push({
      choice: choices[i],
      uuid: choices_uuid[i],
    });
  }

  let answersObject; //Object to store the answers

  //Build the object to send to supabase:
  if (questionType == "Identify the sound") {
    answersObject = {
      sound: sound,
      choices: QuizChoices,
      correct_answer: correctAnswer,
    };
  } else {
    answersObject = {
      choices: QuizChoices,
      correct_answer: correctAnswer,
    };
  }

  const choicesJson = JSON.stringify(answersObject); //Stringify the object

  const supabase = createClient(); //Access the Supabase
  //INSERT INTO questions
  const { error: questionError } = await supabase
    .from("questions")
    .update({
      text: title,
      answers: choicesJson,
    })
    .eq("id", questionId);
  if (questionError) {
    console.error("[createQuestionAction | Insert question]", questionError);
    return;
  }
  redirect(`/application/quizzes/${quizzSlug}/edit`); //Revalidate the page
};
