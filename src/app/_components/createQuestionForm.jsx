"use client";

import { useState } from "react";
import { createQuestionAction } from "../_actions/createQuestionAction";


const CreateQuestionForm = ({ quizzSlug }) => {

    //ustestate = pour stocker les choix de réponse dynamiquement dans un tableau
    const [choices, setChoices] = useState(['', '']);
    //deuxieme state stocker la valeur de ma bonne réponse uuid postion 0 par défaut, cocher uuid sur postion de celui cliqué
    //trouver library généerer uuid
    // const [choices1, setChoices1] = useState([{choice:'', uuid:}, {}]);




    //fonction pour ajouter un choix de réponse au state
    //choices.length < 6 = pour limiter le nombre de choix de réponse à 6
    const addChoice = () => {
        if (choices.length < 6) {
            setChoices([...choices, '']);
        }
    };

    //fonction pour supprimer un choix de réponse du state
    //choices.filter = pour filtrer les choix de réponse et supprimer le choix de réponse cliqué
    const removeChoice = (index) => {
        const newChoices = choices.filter((_, i) => i !== index);
        setChoices(newChoices);
    };

    //fonction pour modifier un choix de réponse
    //newChoices = pour créer une copie du tableau choices
    const handleChoiceChange = (index, value) => {
        const newChoices = [...choices];
        newChoices[index] = value;
        setChoices(newChoices);
    };

    return (
        <div>
            <form action={createQuestionAction}>

                {/* Bouton pour ajouter une question et sauvgarder les données dans la database*/}
                <input type="submit" value="Add a question" />
                <label htmlFor="title">Question title:</label>
                <input type="text" id="title" name="title" />
                <input type="hidden" id="quizzSlug" name="quizzSlug" value={quizzSlug} />

                <label>Choices:</label>
                {/*.map to display choices*/}
                {choices.map((choice, i) => (
                    <div key={i}>
                        <input
                            type="text"
                            value={choice}
                            name="choices"
                            //onChange = each time the user changes the input, the handleChoiceChange function is called with the i of the choice and the new value
                            onChange={(e) => handleChoiceChange(i, e.target.value)}
                            placeholder={`Choice ${i + 1}`}
                        />
                        {/*choices.length > 2 = pour limiter le nombre de choix de réponse à min 2*/}
                        {choices.length > 2 && (
                            <button
                                //type="button" = pour pas submit le form
                                type="button"
                                //onClick : appelle RemoveChoice pour supprimer le choix de réponse cliqué
                                onClick={() => removeChoice(i)}
                            >
                                Remove
                            </button>
                        )}
                    </div>
                ))}

            </form>
            {/* limite le nombre de choix de réponse à 6*/}
            {/* onClick : appelle addChoice pour ajouter un choix de réponse*/}
            {choices.length < 6 && (
                <button type="button" onClick={addChoice}>Add a choice</button>
            )}
        </div>
    );
};

export default CreateQuestionForm;