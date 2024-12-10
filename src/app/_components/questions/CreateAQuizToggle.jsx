//Imports:
"use client";
import React from "react";
import CreateQuestionForm from "./CreateQuestionForm";
import QuestionType from "./QuestionType";
import { useState } from "react";
import styles from "./CreateAQuizToggle.module.css";
import Link from "next/link";

//Component that allows you to choose the type of question:
const CreateAQuizToggle = ({ quizzSlug }) => {
  const [show, setShow] = useState(true); //Toggle between create question form and question types
  const toggle = () => setShow(!show); //Handle toggle
  const [type, setQuestionType] = useState(); //Store the type of question selected

  //Function to handle the click on a question type:
  function handleClick(type) {
    setQuestionType(type);
    setShow(false);
  }

  return (
    <div className={styles.questiontypescontainer}>
      {show && (
        <div className={styles.questiontypes}>
          <QuestionType
            type="Normal multiple choice"
            description="You have to choose the correct answer"
            action={() => handleClick("Normal multiple choice")} //Allow to access the multiple choice type form
          />
          <QuestionType
            type="Find the intruder"
            description="You have to find the intruder"
            action={() => handleClick("Find the intruder")} //Allow to access the find the intruder type form
          />
          <QuestionType
            type="Identify the sound"
            description="A sound is played. You have to identify the sound"
            action={() => handleClick("Identify the sound")} //Allow to access the identify the sound type form
          />
        </div>
      )}
      {!show && (
        <CreateQuestionForm
          quizzSlug={quizzSlug}
          questionType={type}
          onSelectQuestionType={toggle} //Allow to go back to the question types
        />
      )}
      <Link href={`/application/quizzes/${quizzSlug}/edit/questions`}>
        Edit questions
      </Link>
    </div>
  );
};
export default CreateAQuizToggle;
