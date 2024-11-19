"use client";

import { useState } from "react";
import { createQuestionAction } from "@/app/_actions/createQuestionAction";


const CreateQuestionForm = ({ quizzSlug }) => {

    //---useState = pour stocker les choix de réponse avec leur uuid dynamiquement dans un tableau d'object.
    const [choices, setChoices] = useState([
        { choice: '', uuid: crypto.randomUUID() },
        { choice: '', uuid: crypto.randomUUID() }
    ]);

    //---fonction pour ajouter un choix de réponse au state.
    //---choices.length < 6 = pour limiter le nombre de choix de réponse à 6 (peut être changer si besoin).
    const addChoice = () => {
        if (choices.length < 6) {
            setChoices([...choices, { choice: '', uuid: crypto.randomUUID() }]);
        }
    };

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

    return (
        <div>
            <form action={createQuestionAction}>

                {/*---Bouton pour ajouter une question et sauvgarder les données dans la database.*/}
                <input type="submit" value="Add a question" />
                <label htmlFor="title">Question title:</label>
                <input type="text" id="title" name="title" />
                <input type="hidden" id="quizzSlug" name="quizzSlug" value={quizzSlug} />

                {/*---Label pour les choix, peut être enlever si besoin.*/}
                <label>Choices:</label>

                {choices.map((choiceObject, i) => (
                    <div key={choiceObject.uuid}>

                        {/*---Bouton radio : sert à cocher la bonne réponse*/}
                        <input type="radio" id="correctAnswer" name="correctAnswer" value={choiceObject.uuid} />

                        {/*---Input : sert à remplir les choix de réponse*/}
                        <input
                            type="text"
                            value={choiceObject.choice}
                            name="choices"
                            //---onChange = chaque fois que l'utilisateur change la valeur de l'input, la fonction
                            //   handleChoiceChange est appelée avec l'index du choix et sa nouvelle valeur.
                            onChange={(e) => handleChoiceChange(i, e.target.value)}
                            placeholder={`Choice ${i + 1}`}
                        />

                        <input type="hidden" name="choices_uuid" value={choiceObject.uuid} />

                        {/*---Bouton : sert à supprimer un choix de réponse*/}
                        {/*---choices.length > 2 = pour limiter le nombre de choix de réponse à minimum 2*/}
                        {/*---onClick : appelle RemoveChoice pour supprimer le choix de réponse cliqué*/}
                        {choices.length > 2 && (
                            <button type="button" onClick={() => removeChoice(i)}>Remove</button>
                        )}

                    </div>
                ))}

                {/*---Bouton : sert à ajouter un choix de réponse*/}
                {/*---type="button" : pour pas submit le form*/}
                {/*---onClick : appelle addChoice pour ajouter un choix de réponse*/}
                {choices.length < 6 && (
                    <button type="button" onClick={addChoice}>Add a choice</button>
                )}
            </form>

        </div>
    );
};

export default CreateQuestionForm;