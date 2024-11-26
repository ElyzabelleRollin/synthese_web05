"use client";
import React from "react";
import CreateQuestionForm from "./CreateQuestionForm";
import QuestionType from "./QuestionType";
import { useState } from "react";
import styles from "./CreateAQuizToggle.module.css";

const CreateAQuizToggle = ({ quizzSlug }) => {
  const [show, setShow] = useState(true); //Toggle between create a type of question and create a question
  const toggle = () => setShow(!show);
  const [type, setQuestionType] = useState(); //Store the type of question

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
            action={() => handleClick("Normal multiple choice")}
          />
          <QuestionType
            type="Find the intruder"
            description="You have to find the intruder"
            action={() => handleClick("Find the intruder")}
          />
          <QuestionType
            type="Identify the sound"
            description="A sound is played. You have to identify the sound"
            action={() => handleClick("Identify the sound")}
          />
        </div>
      )}
      {!show && (
        <CreateQuestionForm
          quizzSlug={quizzSlug}
          questionType={type}
          action={toggle}
        />
      )}
    </div>
  );
};

export default CreateAQuizToggle;
