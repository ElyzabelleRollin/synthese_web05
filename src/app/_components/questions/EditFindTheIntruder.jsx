//Imports:
"use client";
import { useState } from "react";
import Dropzone from "../dropzone/Dropzone";
import styles from "./CreateQuestionForm.module.css";
import Primarybutton from "../primarybutton/primarybutton";
import Secondarybutton from "../secondarybutton/secondarybutton";
import Tertiarybutton from "../tertiarybutton/tertiarybutton";
import { updateQuestion } from "@/app/_actions/quiz";
import { deleteQuestionByQuestionId } from "@/app/_actions/delete";

//Composant to edit a question of type Find the intruder:
const EditFindTheIntruder = ({ quizzSlug, questionInfos }) => {
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

  //Add an image to a choice:
  const addImageChoice = (imageKey) => {
    setChoices((current) => [
      ...current,
      { choice: "", imageKey, uuid: crypto.randomUUID() },
    ]);
  };

  //Function to remove an existing choice:
  const removeChoice = (index) => {
    setChoices(choices.filter((_, i) => i !== index));
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
            Add the comparison elements. (max. 5)
          </label>

          <div className={styles.choices}>
            {choices.length < 5 ? (
              <div className={styles.dropzone}>
                <Dropzone
                  updateProfile={false}
                  uploadQuestionImage={true}
                  addChoiceFn={addImageChoice}
                />
              </div>
            ) : null}

            {choices &&
              choices.map((choiceObject, i) => (
                <div
                  className={`${styles.choicecontainer} ${styles.intruder}`}
                  key={choiceObject.uuid}
                >
                  {/*---Bouton radio : sert à cocher la bonne réponse*/}
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
                      className={`${styles.radio} ${styles.intruder}`}
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

                  {/*---Input : sert à remplir les choix de réponse*/}
                  <div className={styles.selection}>
                    {/* Send the key to the server*/}
                    <input
                      className={styles.radio}
                      type="hidden"
                      value={
                        choiceObject.imageKey
                          ? `https://utfs.io/f/${choiceObject.imageKey}`
                          : choiceObject.choice
                      }
                      name="choices"
                    />
                    {/* Only to show the image */}
                    <img
                      className={styles.image}
                      src={
                        choiceObject.imageKey
                          ? `https://utfs.io/f/${choiceObject.imageKey}`
                          : choiceObject.choice
                      }
                    />
                  </div>

                  <input
                    type="hidden"
                    name="choices_uuid"
                    value={choiceObject.uuid}
                  />
                </div>
              ))}
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
            {/*---Bouton pour ajouter une question et sauvgarder les données dans la database.*/}
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

export default EditFindTheIntruder;
