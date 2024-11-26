"use client";

import { useState } from "react";
import { createQuestionAction } from "@/app/_actions/createQuestionAction";
import { createQuestionActionFinish } from "@/app/_actions/createQuestionAction";
import Dropzone from "../dropzone/Dropzone";
import styles from "./CreateQuestionForm.module.css";
import Primarybutton from "../primarybutton/primarybutton";
import Secondarybutton from "../secondarybutton/secondarybutton";
import Tertiarybutton from "../tertiarybutton/tertiarybutton";

const CreateQuestionForm = ({ quizzSlug, questionType, action }) => {

  //---useState = pour stocker les choix de réponse avec leur uuid dynamiquement dans un tableau d'object.
  const [choices, setChoices] = useState(questionType == "Normal multiple choice" ? [
    { choice: "", imageKey: "", uuid: crypto.randomUUID() },
    { choice: "", imageKey: "", uuid: crypto.randomUUID() },
  ] : []);

  const addImageChoice = (imageKey) => {
    setChoices(current => [...current, { choice: '', imageKey, uuid: crypto.randomUUID() }]);
  };

  //---fonction pour ajouter un choix de réponse au state.
  //---choices.length < 6 = pour limiter le nombre de choix de réponse à 6 (peut être changer si besoin).
  const addChoice = () => {
    if (choices.length < 6) {
      setChoices([...choices, { choice: "", uuid: crypto.randomUUID() }]);
    }
  };

  function errorMessage() {
    console.log("Error")
  }

  //---fonction pour supprimer un choix de réponse du state.
  //---choices.filter = pour filtrer les choix de réponse et supprimer le choix
  //   de réponse associé au bouton cliqué.
  const removeChoice = (index) => {
    const newChoices = choices.filter((_, i) => i !== index);
    setChoices(newChoices);
  };

  //---fonction pour modifier un choix de réponse.
  //---newChoices = pour créer une copie du tableau choices
  const handleChoiceChange = (index, value) => {
    const newChoices = [...choices];
    newChoices[index] = { ...newChoices[index], choice: value };
    setChoices(newChoices);
  };

  const [state, setState] = useState(false);

  const do2shits = (formData) => {
    createQuestionAction(formData);
    action();
  }



  return (
    <div className={styles.createquestionform}>
      <form className={styles.form} action={choices.length >= 2 ? (state ? createQuestionActionFinish : do2shits) : errorMessage}>
        <div className={styles.backbtn}>
          <Tertiarybutton text="Back to types" theme="dark" clickaction={action} />
        </div>
        <div className={styles.create}>
          {
            questionType === "Normal multiple choice" ? (
              <label className={styles.choicelabel}>Add the chain elements. (max. 4)</label>
            ) : questionType === "Find the intruder" ? (
              <label className={styles.choicelabel}>Add the comparison elements. (max. 5)</label>
            ) : questionType === "Identify the sound" ? (
              <label className={styles.choicelabel}>Add the sound to identify.</label>
            ) : null
          }

          <div className={styles.choices}>
            {questionType == "Find the intruder" && <div className={styles.dropzone}>
              <Dropzone updateProfile={false} uploadQuestionImage={true} addChoiceFn={addImageChoice} />
            </div>}

            {choices && choices.map((choiceObject, i) => (
              <div className={styles.choicecontainer} key={choiceObject.uuid}>
                {/*---Bouton radio : sert à cocher la bonne réponse*/}
                <label className={styles.label}>
                  <span className={styles.letter}>{i == 0 ? "A." : i == 1 ? "B." : i == 2 ? "C." : i == 3 ? "D." : "E."}</span>
                  <input
                    type="radio"
                    id="correctAnswer"
                    name="correctAnswer"
                    checked
                    value={choiceObject.uuid}
                    required
                    className={styles.radio}
                  
                  />
                  <span className={styles.checkmark}></span>
                  <div className={styles.remove}>
                    <Tertiarybutton text="Remove" theme="dark" clickaction={() => removeChoice(i)} />
                  </div>
                </label>

                {/*---Input : sert à remplir les choix de réponse*/}
                {questionType == "Normal multiple choice" && (
                  <input
                    type="text"
                    value={choiceObject.choice}
                    name="choices"
                    //---onChange = chaque fois que l'utilisateur change la valeur de l'input, la fonction
                    //   handleChoiceChange est appelée avec l'index du choix et sa nouvelle valeur.
                    onChange={(e) => handleChoiceChange(i, e.target.value)}
                    placeholder={`Choice ${i + 1}`}
                  />
                )}
                {questionType == "Find the intruder" && (
                  <div className={styles.choice}>
                    {/* Send the key to the server*/}
                      <input className={styles.radio} type="hidden" value={`https://utfs.io/f/${choiceObject.imageKey}`} name="choices" />
                    {/* Only to show the image */}
                    <img className={styles.image} src={choiceObject.imageKey !== "" ? `https://utfs.io/f/${choiceObject.imageKey}` : "https://placehold.co/400"} />
                  </div>
                )}

                <input
                  type="hidden"
                  name="choices_uuid"
                  value={choiceObject.uuid}
                />
              </div>
            ))}
          </div>


          {/*---Bouton : sert à ajouter un choix de réponse*/}
          {/*---type="button" : pour pas submit le form*/}
          {/*---onClick : appelle addChoice pour ajouter un choix de réponse*/}
          {choices && choices.length < 6 && questionType == "Normal multiple choice" && (
            <button type="button" onClick={addChoice}>
              Add a choice
            </button>
          )}
        </div>

        <div className={styles.submitmenu}>
          <input type="hidden" name="questionType" value={questionType} />
          <label className={styles.title} htmlFor="title">Title:</label>
          <input className={styles.input} required type="text" id="title" placeholder="Ask your question..." name="title" />
          <input
            type="hidden"
            id="quizzSlug"
            name="quizzSlug"
            value={quizzSlug}
          />
          <div className={styles.btncontainer}>
            {/*---Bouton pour ajouter une question et sauvgarder les données dans la database.*/}
            <Secondarybutton text="Add a question" theme="dark" clickaction={() => setState(false)} />
            <Primarybutton text="Finish quiz" theme="dark" clickaction={() => setState(true)} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateQuestionForm;
