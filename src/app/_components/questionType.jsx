const QuestionType = ({ type, description }) => {
    return (
        <div>
            <h3>{type}</h3>
            <p>{description}</p>
            <button>Add this question</button>
        </div>
    )
};

export default QuestionType;