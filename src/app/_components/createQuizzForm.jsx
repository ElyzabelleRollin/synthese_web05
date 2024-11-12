const CreateQuizzForm = () => {
    return (
        <form action="/">
            <label htmlFor="title">Title:</label>
            <input type="text" id="title" name="title" />
            <input type="submit" value="Finish the Quizz" />
        </form>
    )
};

export default CreateQuizzForm;
