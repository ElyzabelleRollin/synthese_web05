//Component pour une liste de questions
//En params, un tableau de questions qui vient d'un quizz

import AnswersList from "./AnswersList";

const QuestionsList = ({ questions }) => {

    console.log(questions);

    return (
        <div>
            {questions.map((question) => (
                <div key={question.id}>
                    <h2>{question.text}</h2>
                    {/* {JSON.parse(question.answers)} */}
                    <AnswersList answers={JSON.parse(question.answers)} />
                    {console.log(JSON.parse(question.answers))}
                </div>
            ))}
        </div>
    );
};

export default QuestionsList;
