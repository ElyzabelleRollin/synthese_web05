import style from "./ScoreQuizzes.module.css";
const ScoreQuizzes = ({ averageScore, attempts, nbQuestions, playAttempts, playAverage }) => {

    return (
        <div className={style.stats}>
            <p>Number of attempts: <span className={`${style.num} ${playAttempts ? style.inactive : style.active}`}> {attempts}</span></p>
            <p>Average result: <span className={`${style.num} ${playAverage ? style.inactive : style.active}`}> {averageScore} / {nbQuestions || "Loading..."}</span> </p>
        </div>
    )
}

export default ScoreQuizzes;