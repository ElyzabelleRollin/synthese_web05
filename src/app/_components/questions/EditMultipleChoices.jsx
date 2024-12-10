//Imports:
"use client";
import { useState } from "react";
import { updateQuestion } from "@/app/_actions/quiz";
import styles from "./CreateQuestionForm.module.css";
import Primarybutton from "../primarybutton/primarybutton";
import Secondarybutton from "../secondarybutton/secondarybutton";
import Tertiarybutton from "../tertiarybutton/tertiarybutton";
import { deleteQuestionByQuestionId } from "@/app/_actions/delete";

////Composant to edit a question of type Multiple choices:
const EditMultipleChoices = ({ quizzSlug, questionInfos }) => {
  const answers = JSON.parse(questionInfos.answers); //Parse answers

  // Initialize choices:
  const initChoices = () =>
    answers.choices.map((choice) => ({
      choice: choice.choice,
      uuid: choice.uuid,
    }));

  const [choices, setChoices] = useState(initChoices); //Store the choices
  const [correctChoice, setCorrectChoice] = useState(answers.correct_answer); //Store the correct answer
  const [title, setTitle] = useState(questionInfos.text); //Store the title of the question

  //Function to add a new choice:
  const addChoice = () => {
    if (choices.length < 5) {
      setChoices([...choices, { choice: "", uuid: crypto.randomUUID() }]);
    }
  };

  //Function to remove an existing choice:
  const removeChoice = (index) => {
    setChoices(choices.filter((_, i) => i !== index));
  };

  //Function to update the value of a choice:
  const handleChoiceChange = (index, value) => {
    const updatedChoices = [...choices];
    updatedChoices[index] = { ...updatedChoices[index], choice: value };
    setChoices(updatedChoices);
  };

  return (
    <div className={styles.createquestionform}>
      <form
        className={styles.form}
        action={choices.length >= 2 && updateQuestion}
      >
        <div className={styles.backbtn}>
          <Tertiarybutton
            text="Back to questions"
            iconleft="ArrowLeft"
            theme="dark"
            link={`/application/quizzes/${quizzSlug}/edit`}
          />
        </div>
        <div className={styles.create}>
          <label className={styles.choicelabel}>
            Add the chain elements. (max. 4)
          </label>

          <div className={styles.choices}>
            {choices.map((choiceObject, i) => (
              <div
                className={`${styles.choicecontainer} ${styles.normal}`}
                key={choiceObject.uuid}
              >
                <label className={styles.label}>
                  <span className={styles.letter}>
                    {["A.", "B.", "C.", "D.", "E.", "F."][i]}
                  </span>
                  <input
                    type="radio"
                    name="correctAnswer"
                    value={choiceObject.uuid}
                    checked={correctChoice === choiceObject.uuid}
                    onChange={() => setCorrectChoice(choiceObject.uuid)}
                    required
                    className={`${styles.radio} ${styles.normal}`}
                  />
                </label>
                <div className={styles.remove}>
                  <Tertiarybutton
                    text=""
                    iconright="TrashCan"
                    theme="dark"
                    clickaction={() => removeChoice(i)}
                  />
                </div>
                <input
                  type="text"
                  value={choiceObject.choice}
                  name="choices"
                  required
                  onChange={(e) => handleChoiceChange(i, e.target.value)}
                  placeholder={`Choice ${i + 1}`}
                  className={styles.inputtxt}
                />
                <input
                  type="hidden"
                  name="choices_uuid"
                  value={choiceObject.uuid}
                />
              </div>
            ))}

            {choices.length < 4 && (
              <button
                className={styles.addbtn}
                type="button"
                onClick={addChoice}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12.75 9C12.75 8.58579 12.4142 8.25 12 8.25C11.5858 8.25 11.25 8.58579 11.25 9L11.25 11.25H9C8.58579 11.25 8.25 11.58579 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75H11.25V15C11.25 15.4142 11.5858 15.75 12 15.75C12.4142 15.75 12.75 15.4142 12.75 15L12.75 12.75H15C15.4142 12.75 15.75 12.4142 15.75 12C15.75 11.5858 15.4142 11.25 15 11.25H12.75V9Z"
                    fill="#374151"
                  ></path>
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className={styles.submitmenu}>
          <input type="hidden" name="questionType" value={questionInfos.type} />
          <label className={styles.title} htmlFor="title">
            Title:
          </label>
          <input
            className={styles.input}
            required
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ask your question..."
          />
          <input
            type="hidden"
            id="quizzSlug"
            name="quizzSlug"
            value={quizzSlug}
          />
          <input
            type="hidden"
            id="questionId"
            name="questionId"
            value={questionInfos.id}
          />
          <div className={styles.btncontainer}>
            <Secondarybutton
              text="Delete question"
              theme="dark"
              clickaction={() =>
                deleteQuestionByQuestionId(questionInfos.id, quizzSlug)
              }
            />
            <Primarybutton text="Save changes" theme="dark" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditMultipleChoices;
