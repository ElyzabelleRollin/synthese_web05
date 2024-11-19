
import QuestionsList from "@/_components/QuestionsList2";
import { createClient } from "@/app/_lib/supabase/server";

const QuizzPage = async ({ params }) => {
    //récupère le slug du quizz dans l'url
    const quizzSlug = params.quizzSlug;

    //communiquer avec la db
    const supabase = createClient();

    //récupère le quizz depuis la db avec son slug
    const { data: quizz, error } = await supabase.from("quizzes").select().eq("slug", quizzSlug).single();
    console.log(quizz);

    //récupère les questions depuis la db avec l'id du quizz
    const { data: questions, error: questionsError } = await supabase.from("questions").select().eq("quizz_id", quizz.id);
    console.log(questions);

    return (
        <div>
            <h1>{quizz.name}</h1>
            <p>{quizz.description}</p>
            <QuestionsList questions={questions} />

        </div>
    );

};

export default QuizzPage;