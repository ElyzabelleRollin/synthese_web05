import { createClient } from "@/app/_lib/supabase/server";
import Quizcard from "@/_components/Quizcard";

const QuizzesList = async ({ quizzes }) => {
    return (
        <div>
            {quizzes.map((quizz) => (
                <Quizcard key={quizz.id} quiz={quizz} />
            ))}
        </div>
    );
};

export default QuizzesList;