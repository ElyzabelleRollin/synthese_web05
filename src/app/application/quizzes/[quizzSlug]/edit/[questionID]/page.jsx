//Imports:
import React from "react";
import { createClient } from "@/app/_lib/supabase/server";
import EditMultipleChoices from "@/app/_components/questions/EditMultipleChoices";
import EditFindTheIntruder from "@/app/_components/questions/EditFindTheIntruder";
import EditIdentifyTheSound from "@/app/_components/questions/EditIdentifyTheSound";

//Page that allows to edit a question:
const EditQuestions = async ({ params }) => {
  const quizzSlug = params.quizzSlug; //Get the slug of the quiz
  const questionID = params.questionID; //Get the id of the question
  const supabase = createClient(); //Access the Supabase

  //Get the question infos:
  const { data: question, errorQuestions } = await supabase
    .from("questions")
    .select("*")
    .eq("id", questionID)
    .single();
  if (errorQuestions) console.log("[GET QUESTIONS]", error);

  return (
    <div>
      {question && (
        <div style={{ padding: "0 10vw" }}>
          {question.type === "Normal multiple choice" && (
            <EditMultipleChoices
              questionInfos={question}
              quizzSlug={quizzSlug}
            />
          )}
          {question.type === "Find the intruder" && (
            <EditFindTheIntruder
              questionInfos={question}
              quizzSlug={quizzSlug}
            />
          )}
          {question.type === "Identify the sound" && (
            <EditIdentifyTheSound
              questionInfos={question}
              quizzSlug={quizzSlug}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default EditQuestions;
