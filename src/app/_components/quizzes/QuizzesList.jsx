//Imports:
import { createClient } from "@/app/_lib/supabase/server";
import Quizcard from "@/app/_components/quizzes/Quizcard";
import styles from "./QuizzesList.module.css";

//Shows every quiz unless it's banned:
const QuizzesList = async ({ children, quizzes, amount }) => {
  return (
    <div className={styles.list}>
      {children}
      {quizzes.map((quizz, id) =>
        quizz.banned ? null : amount && id >= amount ? null : (
          <Quizcard key={quizz.id} quiz={quizz} />
        )
      )}
    </div>
  );
};
export default QuizzesList;
