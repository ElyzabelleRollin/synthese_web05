import { createQuizzAction } from "@/app/_actions/createQuizzAction";

const CreateQuizzForm = () => {
    return (
        <form action={createQuizzAction}>
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" />
            <label htmlFor="description">Description:</label>
            <input type="text" id="description" name="description" />
            <input type="submit" value="Create" />
        </form>
    )
};

export default CreateQuizzForm;
