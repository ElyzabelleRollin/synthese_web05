import { createClient } from "@/app/_lib/supabase/server";
import Quizcard from "@/app/_components/quizzes/Quizcard";
import styles from "./QuizzesList.module.css";

const QuizzesList = async ({ quizzes }) => {
    return (
        <div className={styles.list}>
            {quizzes.map((quizz) => (
                <Quizcard key={quizz.id} quiz={quizz} />
            ))}
        </div>
    );
};

export default QuizzesList;