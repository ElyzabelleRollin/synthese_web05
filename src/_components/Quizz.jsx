import { createClient } from "@/app/_lib/supabase/server";
import Link from "next/link";


const Quizz = async ({ quizz }) => {

    //communique avec la db
    const supabase = createClient();

    //récupère les questions depuis la db avec l'id du quizz
    // const { data: questions, error: questionsError } = await supabase.from("questions").select().eq("quizz_id", quizz.id);
    // console.log(questions);

    return (
        <div>
            <h1>{quizz.name}</h1>
            <p>{quizz.description}</p>
            <Link href={`/application/quizzes/${quizz.slug}`}> Go to the quizz </Link>
        </div>
    );
};

export default Quizz;
