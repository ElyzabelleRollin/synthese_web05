"use client";

import { useState } from "react";
import { createQuestionAction } from "@/app/_actions/createQuestionAction";
import Dropzone from "../dropzone/Dropzone";

const CreateQuestionForm = ({ quizzSlug, questionType, action }) => {

  //---useState = pour stocker les choix de réponse avec leur uuid dynamiquement dans un tableau d'object.
  const [choices, setChoices] = useState(questionType== "Normal multiple choice"?[
    { choice: "", imageKey: "", uuid: crypto.randomUUID() },
    { choice: "", imageKey: "", uuid: crypto.randomUUID() },
  ]: []);

  const addImageChoice = (imageKey) => {
    setChoices(current => [...current, {choice: '', imageKey, uuid: crypto.randomUUID()}]);
  };

  //---fonction pour ajouter un choix de réponse au state.
  //---choices.length < 6 = pour limiter le nombre de choix de réponse à 6 (peut être changer si besoin).
  const addChoice = () => {
    if (choices.length < 6) {
      setChoices([...choices, { choice: "", uuid: crypto.randomUUID() }]);
    }
  };

  //---fonction pour supprimer un choix de réponse du state.
  //---choices.filter = pour filtrer les choix de réponse et supprimer le choix
  //   de réponse associé au bouton cliqué.
  const removeChoice = (index) => {
    const newChoices = choices.filter((_, i) => i !== index);
    setChoices(newChoices);
    // DecreaseKey();
  };

  //---fonction pour modifier un choix de réponse.
  //---newChoices = pour créer une copie du tableau choices
  const handleChoiceChange = (index, value) => {
    const newChoices = [...choices];
    newChoices[index] = { ...newChoices[index], choice: value };
    setChoices(newChoices);
  };
  return (
    <div style={{ border: "1px solid red" }}>
      <form action={createQuestionAction}>
        {/*---Bouton pour ajouter une question et sauvgarder les données dans la database.*/}
        <input
          type="submit"
          value="Add a question"
          className="bg-slate-500 rounded-xl p-2 hover:bg-slate-600 "
        />
        <label htmlFor="title">Question title:</label>
        <input required type="text" id="title" name="title" />
        <input
          type="hidden"
          id="quizzSlug"
          name="quizzSlug"
          value={quizzSlug}
        />

        {/*---Label pour les choix, peut être enlever si besoin.*/}
        <label>Choices:</label>
        {questionType == "Find the intruder" && <Dropzone updateProfile={false} uploadQuestionImage={true} addChoiceFn={addImageChoice} />}
        
        {choices && choices.map((choiceObject, i) => (
          <div key={choiceObject.uuid}>
            {/*---Bouton radio : sert à cocher la bonne réponse*/}
            <input
              type="radio"
              id="correctAnswer"
              name="correctAnswer"
              value={choiceObject.uuid}
              required
            />

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
              <div>
                {/* Send the key to the server*/}
                <input type="hidden" value={`https://utfs.io/f/${choiceObject.imageKey}`} name="choices"/>
                {/* Only to show the image */}
                <img src={choiceObject.imageKey !== "" ? `https://utfs.io/f/${choiceObject.imageKey}` : "https://placehold.co/400"}/>
              </div>
            )}

            <input
              type="hidden"
              name="choices_uuid"
              value={choiceObject.uuid}
            />

            {/*---Bouton : sert à supprimer un choix de réponse*/}
            {/*---choices.length > 2 = pour limiter le nombre de choix de réponse à minimum 2*/}
            {/*---onClick : appelle RemoveChoice pour supprimer le choix de réponse cliqué*/}
            {choices.length > 2 && (
              <button type="button" onClick={() => removeChoice(i)}>
                Remove
              </button>
            )}
          </div>
        ))}

        {/*---Bouton : sert à ajouter un choix de réponse*/}
        {/*---type="button" : pour pas submit le form*/}
        {/*---onClick : appelle addChoice pour ajouter un choix de réponse*/}
        {choices && choices.length < 6 && (
          <button type="button" onClick={addChoice}>
            Add a choice
          </button>
        )}
      </form>
      <button onClick={action}>Go back to question types</button>
    </div>
  );
};

export default CreateQuestionForm;
