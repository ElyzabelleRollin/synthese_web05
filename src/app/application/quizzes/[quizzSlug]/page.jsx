import React from "react";
import QuestionsList from "../../../_components/questions/QuestionsList";
import { createClient } from "@/app/_lib/supabase/server";

const QuizPage = async ({ params }) => {
    const { quizzSlug } = params;
    const supabase = createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    const { data: quiz, error } = await supabase
        .from("quizzes")
        .select("*")
        .eq("slug", quizzSlug)
        .single();
        if(error)console.log("[PAGE QUIZ SLUG, QUIZ FETCH]", error)
    
    const { data: questions } = await supabase
        .from("questions")
        .select("*")
        .eq("quizz_id", quiz.id);
        if(error)console.log("[PAGE QUIZ SLUG, QUESTION FETCH]", error)

    return (
        <div>
            <h1>{quiz.name}</h1>
            <p>{quiz.description}</p>
            <QuestionsList questions={questions} quizId={quiz.id} userID={user.id} />
        </div>
    );
};

export default QuizPage;
