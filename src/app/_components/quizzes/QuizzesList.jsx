import { createClient } from "@/app/_lib/supabase/server";
import Quizcard from "@/app/_components/quizzes/Quizcard";
import styles from "./QuizzesList.module.css";
import { Children } from "react";

const QuizzesList = async ({ children, quizzes, amount }) => {
    return (
        <div className={styles.list}>
            {children}
            {quizzes.map((quizz, id) => (
                amount ? (
                    amount > id ? (
                        <Quizcard key={quizz.id} quiz={quizz} />
                    ) : null
                ):(
                    <Quizcard key={quizz.id} quiz={quizz} />
                )
            ))}
        </div>
    );
};

export default QuizzesList;