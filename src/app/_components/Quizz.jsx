import Link from "next/link";
import { createClient } from "../_lib/supabase/server";

const Quizz = async ({ quizz }) => {

    const supabase = createClient();

    //how to get the questions from the quizz id ?
    const { data: questions, error: questionsError } = await supabase.from("questions").select().eq("quizz_id", quizz.id);
    console.log(questions);

    return (
        <div>
            <h1>{quizz.name}</h1>
            <p>{quizz.description}</p>
            <Link href={`/quizz/${quizz.slug}`}> Play a quizz </Link>
        </div>
    );
};

export default Quizz;
