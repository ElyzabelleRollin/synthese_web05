
const ScoreQuizzes = ({ averageScore, attempts, nbQuestions }) => {

    return (
        <div>
            <p>Number of attempts: {attempts}</p>
            <p>Average result: {averageScore} / {nbQuestions}</p>
        </div>
    )
}

export default ScoreQuizzes;