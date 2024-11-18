import { createClient } from "@/app/_lib/supabase/server";
import Quizz from "./Quizz";

const QuizzesList = async () => {
    const supabase = createClient();

    const { data: quizzes, error } = await supabase.from("quizzes").select();
    // console.log(quizzes);

    return (
        <div>
            <h1>Quizzes list</h1>
            {quizzes.map((quizz) => (
                <div key={quizz.id}>
                    <Quizz quizz={quizz} />
                </div>
            ))}
        </div>
    );
};

export default QuizzesList;