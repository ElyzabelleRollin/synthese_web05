//Imports:
"use client";

import { useState } from "react";
import { createQuestionAction } from "@/app/_actions/createQuestionAction";
import { createQuestionActionFinish } from "@/app/_actions/createQuestionAction";
import Dropzone from "../dropzone/Dropzone";
import styles from "./CreateQuestionForm.module.css";
import Primarybutton from "../primarybutton/primarybutton";
import Secondarybutton from "../secondarybutton/secondarybutton";
import Tertiarybutton from "../tertiarybutton/tertiarybutton";

//Composant to create a question depending on the type of question:
const CreateQuestionForm = ({
  quizzSlug,
  questionType,
  onSelectQuestionType,
}) => {
  //Store the choices with their uuid dynamically in an array of objects:
  const [choices, setChoices] = useState(
    []
  );
  const [sound, setSound] = useState(null); //Store the sound for Identify the sound type's questions
  const [isFormFinished, setIsFormFinished] = useState(false); //Check if the form is finished

  //Add an image to a choice:
  const addImageChoice = (imageKey) => {
    setChoices((current) => [
      ...current,
      { choice: "", imageKey, uuid: crypto.randomUUID() },
    ]);
  };

  //---fonction pour ajouter un choix de réponse au state.
  //---choices.length < 6 = pour limiter le nombre de choix de réponse à 6 (peut être changer si besoin).
  const addChoice = () => {
    if (choices.length < 6) {
      setChoices([...choices, { choice: "", uuid: crypto.randomUUID() }]);
    }
  };

  function errorMessage() {
    console.log("Error");
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
    onSelectQuestionType();
  };

  //Play the sound
  function playSound() {
    if (!sound) {
      console.error("No sound available to play!");
      return;
    }
    const audio = new Audio(`https://utfs.io/f/${sound}`);
    audio.play().catch((err) => console.error("Error playing audio:", err));
  }



  return (
    <div className={styles.createquestionform}>
      <form className={styles.form} action={choices.length >= 2 ? (state ? createQuestionActionFinish : do2shits) : errorMessage}>
        <div className={styles.backbtn}>
          <Tertiarybutton
            text="Back to types"
            iconleft="ArrowLeft"
            theme="dark"
            clickaction={onSelectQuestionType}
          />
        </div>
        <div className={styles.create}>
          {questionType === "Normal multiple choice" ? (
            <label className={styles.choicelabel}>Add the chain elements. (max. 4)</label>
          ) : questionType === "Find the intruder" ? (
            <label className={styles.choicelabel}>
              Add the comparison elements. (max. 5)
            </label>
          ) : questionType === "Identify the sound" ? (
            sound == null ? (
            <label className={styles.choicelabel}>Add the sound to identify.</label>
          ) : (
            <label className={styles.choicelabel}>Add images to identify the sound (max.5).</label>
          )
          ) : null}


          <div className={styles.choices}>
            {questionType == "Identify the sound" && (
              <>{sound == null ?
                <div className={styles.dropzone}>
                  <Dropzone
                    updateProfile={false}
                    uploadQuestionImage={false}
                    uploadSound={true}
                    addSoundFn={(uploadedSound) => setSound(uploadedSound)}
                  />
                </div> : null}
                {sound && (
                  <button className={styles.playsoundbtn} type="button" onClick={playSound}>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                      className={styles.playicon}
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          d="M21.4086 9.35258C23.5305 10.5065 23.5305 13.4935 21.4086 14.6474L8.59662 21.6145C6.53435 22.736 4 21.2763 4 18.9671L4 5.0329C4 2.72368 6.53435 1.26402 8.59661 2.38548L21.4086 9.35258Z"
                          fill="#ffffff"
                        ></path>
                      </g>
                    </svg>
                  </button>
                )}
                <input
                  type="hidden"
                  name="sound"
                  value={sound ? `https://utfs.io/f/${sound}` : null}
                  required
                />
              </>
            )}
            {(questionType == "Find the intruder" ||
              questionType == "Identify the sound") && (
                sound != null ? (
                  choices.length < 5 ? (
                    <div className={styles.dropzone}>
                      <Dropzone
                        updateProfile={false}
                        uploadQuestionImage={true}
                        addChoiceFn={addImageChoice}
                      />
                    </div>
                  ) : null
                ) : null
              )}

            {choices && choices.map((choiceObject, i) => (
              <div className={`${styles.choicecontainer} ${questionType == "Normal multiple choice" ? styles.normal : questionType == "Find the intruder" ? styles.intruder : styles.sound}`} key={choiceObject.uuid}>
                {/*---Bouton radio : sert à cocher la bonne réponse*/}
                <label className={styles.label}>
                  <span className={styles.letter}>
                    {i == 0 ? "A." : i == 1 ? "B." : i == 2 ? "C." : i == 3 ? "D." : "E."}
                  </span>
                  <input
                    type="radio"
                    id="correctAnswer"
                    name="correctAnswer"
                    checked
                    value={choiceObject.uuid}
                    required
                    className={`${styles.radio} ${questionType == "Normal multiple choice" ? styles.normal : questionType == "Find the intruder" ? styles.intruder : questionType == "Identify the sound" ? styles.sound : null}`}
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
                {questionType == "Normal multiple choice" && (
                  <input
                    type="text"
                    value={choiceObject.choice}
                    name="choices"
                    required
                    //---onChange = chaque fois que l'utilisateur change la valeur de l'input, la fonction
                    //   handleChoiceChange est appelée avec l'index du choix et sa nouvelle valeur.
                    onChange={(e) => handleChoiceChange(i, e.target.value)}
                    placeholder={`Choice ${i + 1}`}
                    className={styles.inputtxt}
                  />
                )}
                {(questionType == "Find the intruder" ||
                  questionType == "Identify the sound") && (
                    <div className={styles.selection}>
                      {/* Send the key to the server*/}
                      <input
                        className={styles.radio}
                        type="hidden"
                        value={`https://utfs.io/f/${choiceObject.imageKey}`}
                        name="choices"
                      />
                      {/* Only to show the image */}
                      <img
                        className={styles.image}
                        src={
                          choiceObject.imageKey !== ""
                            ? `https://utfs.io/f/${choiceObject.imageKey}`
                            : "https://placehold.co/400"
                        }
                      />
                    </div>
                  )}

                <input type="hidden" name="choices_uuid" value={choiceObject.uuid} />
              </div>
            ))}

            {/*---Bouton : sert à ajouter un choix de réponse*/}
            {/*---type="button" : pour pas submit le form*/}
            {/*---onClick : appelle addChoice pour ajouter un choix de réponse*/}
            {choices && choices.length < 4 && questionType == "Normal multiple choice" && (
              <button className={styles.addbtn} type="button" onClick={addChoice}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12.75 9C12.75 8.58579 12.4142 8.25 12 8.25C11.5858 8.25 11.25 8.58579 11.25 9L11.25 11.25H9C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75H11.25V15C11.25 15.4142 11.5858 15.75 12 15.75C12.4142 15.75 12.75 15.4142 12.75 15L12.75 12.75H15C15.4142 12.75 15.75 12.4142 15.75 12C15.75 11.5858 15.4142 11.25 15 11.25H12.75V9Z"
                      fill="#374151"
                    ></path>
                  </g>
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className={styles.submitmenu}>
          <input type="hidden" name="questionType" value={questionType} />
          <label className={styles.title} htmlFor="title">
            Title:
          </label>
          <input
            className={styles.input}
            required
            type="text"
            id="title"
            placeholder="Ask your question..."
            name="title"
          />
          <input
            type="hidden"
            id="quizzSlug"
            name="quizzSlug"
            value={quizzSlug}
          />
          <div className={styles.btncontainer}>
            {/*---Bouton pour ajouter une question et sauvgarder les données dans la database.*/}
            <Secondarybutton
              text="Add a question"
              theme="dark"
              clickaction={() => setState(false)}
            />
            <Primarybutton
              text="Finish quiz"
              theme="dark"
              clickaction={() => setState(true)}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateQuestionForm;
