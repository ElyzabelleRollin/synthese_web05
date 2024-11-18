'use server';

import { redirect } from "next/navigation";
import { createClient } from "../_lib/supabase/server";

export const createQuizzAction = async (formData) => {
    const title = formData.get('title');
    const description = formData.get('description');
    // console.log(title, description);

    //pour communiquer avec la db
    const supabase = createClient();

    //INSERT new quizz remplacer par upsert, .select(slug)
    const { data: newQuizz, error } = await supabase.from("quizzes").upsert({
        name: title,
        description: description,
    }).select().single();

    console.log(newQuizz.slug);

    //get the last quizz created
    // const { data: quizz, error: quizzError } = await supabase.from("quizzes")
    //     .select()
    //     .order('created_at', { ascending: false })
    //     .limit(1)
    //     .single();
    // console.log(quizz);
    // console.log(quizz.slug);

    //redirect vers la page de modification du quizz
    redirect(`/quizz/${newQuizz.slug}/edit`);
};