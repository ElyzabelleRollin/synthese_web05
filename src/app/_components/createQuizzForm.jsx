import { createQuizzAction } from "../_actions/createQuizzAction";

const CreateQuizzForm = () => {
    return (
        <form action={createQuizzAction}>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" />
            <input type="submit" value="Create" />
        </form>
    )
};

export default CreateQuizzForm;
