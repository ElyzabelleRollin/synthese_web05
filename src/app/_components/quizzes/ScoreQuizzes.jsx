import style from "./ScoreQuizzes.module.css";
const ScoreQuizzes = ({ averageScore, attempts, nbQuestions }) => {

    return (
        <div className={style.stats}>
            <p>Number of attempts: {attempts}</p>
            <p>Average result: {averageScore} / {nbQuestions || "Loading..."} </p>
        </div>
    )
}

export default ScoreQuizzes;