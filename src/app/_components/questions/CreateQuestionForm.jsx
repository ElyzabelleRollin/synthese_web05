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
    questionType == "Normal multiple choice"
      ? [
          { choice: "", imageKey: "", uuid: crypto.randomUUID() },
          { choice: "", imageKey: "", uuid: crypto.randomUUID() },
        ]
      : []
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

  //Add a choice to the state
  //Limited to 6 choices (can be changed if needed):
  const addChoice = () => {
    if (choices.length < 6) {
      setChoices([...choices, { choice: "", uuid: crypto.randomUUID() }]); //Update the state
    }
  };

  //Send a message to the console
  //if there's an error:
  function errorMessage() {
    console.log("Error");
  }

  //Delete a choice from the state:
  const removeChoice = (index) => {
    //Filter the choices and remove the choice associated to the button clicked:
    const newChoices = choices.filter((_, i) => i !== index);
    setChoices(newChoices); //Update the state
  };

  //Handle the modification of a choice:
  const handleChoiceChange = (index, value) => {
    const newChoices = [...choices]; //Create a copy of the choices array
    newChoices[index] = { ...newChoices[index], choice: value }; //Update the wanted choice
    setChoices(newChoices); //Update the state
  };

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
      <form
        className={styles.form}
        action={
          choices.length >= 2
            ? isFormFinished
              ? createQuestionActionFinish
              : do2shits
            : errorMessage
        }
      >
        <div className={styles.backbtn}>
          <Tertiarybutton
            text="Back to types"
            theme="dark"
            clickaction={onSelectQuestionType}
          />
        </div>
        <div className={styles.create}>
          {questionType === "Normal multiple choice" ? (
            <label className={styles.choicelabel}>
              Add the chain elements. (max. 4)
            </label>
          ) : questionType === "Find the intruder" ? (
            <label className={styles.choicelabel}>
              Add the comparison elements. (max. 5)
            </label>
          ) : questionType === "Identify the sound" ? (
            <label className={styles.choicelabel}>
              Add the sound to identify.
            </label>
          ) : null}

          <div className={styles.choices}>
            {questionType == "Identify the sound" && (
              <div className={styles.dropzone}>
                <Dropzone
                  updateProfile={false}
                  uploadQuestionImage={false}
                  uploadSound={true}
                  addSoundFn={(uploadedSound) => setSound(uploadedSound)}
                />
                {sound && (
                  <button type="button" onClick={playSound}>
                    Play sound
                  </button>
                )}
                <input
                  type="hidden"
                  name="sound"
                  value={sound ? `https://utfs.io/f/${sound}` : null}
                  required
                />
              </div>
            )}
            {(questionType == "Find the intruder" ||
              questionType == "Identify the sound") && (
              <div className={styles.dropzone}>
                <Dropzone
                  updateProfile={false}
                  uploadQuestionImage={true}
                  addChoiceFn={addImageChoice}
                />
              </div>
            )}

            {choices &&
              choices.map((choiceObject, i) => (
                <div className={styles.choicecontainer} key={choiceObject.uuid}>
                  {/*---Radio button :used to select the correct answer*/}
                  <label className={styles.label}>
                    <span className={styles.letter}>
                      {i == 0
                        ? "A."
                        : i == 1
                        ? "B."
                        : i == 2
                        ? "C."
                        : i == 3
                        ? "D."
                        : "E."}
                    </span>
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
                      <Tertiarybutton
                        text="Remove"
                        theme="dark"
                        clickaction={() => removeChoice(i)}
                      />
                    </div>
                  </label>

                  {/*---Used to fill the form*/}
                  {questionType == "Normal multiple choice" && (
                    <input
                      type="text"
                      value={choiceObject.choice}
                      name="choices"
                      //Update the state when the input value changes:
                      onChange={(e) => handleChoiceChange(i, e.target.value)}
                      placeholder={`Choice ${i + 1}`}
                    />
                  )}
                  {(questionType == "Find the intruder" ||
                    questionType == "Identify the sound") && (
                    <div className={styles.choice}>
                      {/* Send the image url to the server*/}
                      <input
                        className={styles.radio}
                        type="hidden"
                        value={`https://utfs.io/f/${choiceObject.imageKey}`}
                        name="choices"
                      />
                      {/* Only to display the image for the user to see */}
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
                  {/* Send the uuid of the choice to the server*/}
                  <input
                    type="hidden"
                    name="choices_uuid"
                    value={choiceObject.uuid}
                  />
                </div>
              ))}
          </div>
          {choices &&
            choices.length < 6 &&
            questionType == "Normal multiple choice" && (
              //Button to add a new choice:
              //Type="button" to not submit the form:
              <button type="button" onClick={addChoice}>
                Add a choice
              </button>
            )}
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
            {/*Button to add a new question*/}
            <Secondarybutton
              text="Add a question"
              theme="dark"
              clickaction={() => setIsFormFinished(false)}
            />
            {/*Button to end the quiz editing*/}
            <Primarybutton
              text="Finish quiz"
              theme="dark"
              clickaction={() => setIsFormFinished(true)}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateQuestionForm;
