import QuestionsList from "@/app/_components/QuestionsList";
import { createClient } from "@/app/_lib/supabase/server";

const QuizzPage = async ({ params }) => {
    const quizzSlug = params.quizzSlug;

    const supabase = createClient();

    const { data: quizz, error } = await supabase.from("quizzes").select().eq("slug", quizzSlug).single();
    console.log(quizz);

    //how to get the questions from the quizz id ?
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