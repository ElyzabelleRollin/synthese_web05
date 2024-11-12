"use client";

import { useState } from "react";


const CreateQuestionForm = () => {

    //ustestate = to store choices dynamically
    const [choices, setChoices] = useState(['', '']);

    //function to add a choice
    const addChoice = () => {
        if (choices.length < 6) {
            setChoices([...choices, '']);
        }
    };

    //function to remove a choice
    const removeChoice = (index) => {
        const newChoices = choices.filter((_, i) => i !== index);
        setChoices(newChoices);
    };

    //function to handle choice change
    const handleChoiceChange = (index, value) => {
        const newChoices = [...choices];
        newChoices[index] = value;
        setChoices(newChoices);
    };

    return (
        <div>
            <form>
                <label htmlFor="title">Question title:</label>
                <input type="text" id="title" name="title" />

                <label>Choices:</label>
                {/*.map to display choices*/}
                {choices.map((choice, i) => (
                    <div key={i}>
                        <input
                            type="text"
                            value={choice}
                            //onChange = each time the user changes the input, the handleChoiceChange function is called with the i of the choice and the new value
                            onChange={(e) => handleChoiceChange(i, e.target.value)}
                            placeholder={`Choice ${i + 1}`}
                        />
                        {/*type="button" = to prevent the form from being submitted*/}
                        {choices.length > 2 && (
                            <button
                                type="button"
                                onClick={() => removeChoice(i)}
                            >
                                Remove
                            </button>
                        )}
                    </div>
                ))}
            </form>
            {choices.length < 6 && (
                <button type="button" onClick={addChoice}>Add a choice</button>
            )}
        </div>
    );
};

export default CreateQuestionForm;