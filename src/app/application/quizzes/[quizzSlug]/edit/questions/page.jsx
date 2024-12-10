import React from "react";
import { createClient } from "@/app/_lib/supabase/server";
import EditMultipleChoices from "@/app/_components/questions/EditMultipleChoices";
import EditFindTheIntruder from "@/app/_components/questions/EditFindTheIntruder";
import EditIdentifyTheSound from "@/app/_components/questions/EditIdentifyTheSound";
import styles from "@/app/_components/questions/CreateQuestionForm.module.css";
import Tertiarybutton from "@/app/_components/tertiarybutton/tertiarybutton";

const EditQuestions = async ({ params }) => {
  const quizzSlug = params.quizzSlug;
  const supabase = createClient();

  const { data: quiz, errorQuizz } = await supabase
    .from("quizzes")
    .select("id")
    .eq("slug", quizzSlug)
    .single();
  if (errorQuizz) console.log("[GET QUIZ]", error);

  const { data: questions, errorQuestions } = await supabase
    .from("questions")
    .select("*")
    .eq("quizz_id", quiz.id);
  if (errorQuestions) console.log("[GET QUESTIONS]", error);

  return (
    <div>
      <div className={styles.backbtn}>
        <Tertiarybutton
          text="Back to questions"
          iconleft="ArrowLeft"
          theme="dark"
          link={`/application/quizzes/${quizzSlug}/edit`}
        />
      </div>
      {questions.map((question) => (
        <div>
          {question.type === "Normal multiple choice" && (
            <EditMultipleChoices
              key={question.id}
              questionInfos={question}
              quizzSlug={quizzSlug}
            />
          )}
          {question.type === "Find the intruder" && (
            <EditFindTheIntruder
              key={question.id}
              questionInfos={question}
              quizzSlug={quizzSlug}
            />
          )}
          {question.type === "Identify the sound" && (
            <EditIdentifyTheSound
              key={question.id}
              questionInfos={question}
              quizzSlug={quizzSlug}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default EditQuestions;
