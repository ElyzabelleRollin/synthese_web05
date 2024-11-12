'use server';

import { redirect } from "next/navigation";
import { createClient } from "../_lib/supabase/server";

export const createQuizzAction = async (formData) => {
    const title = formData.get('title');
    console.log(title);

    //pour communiquer avec la db
    const supabase = createClient();

    //INSERT new quizz
    // const { error } = await supabase.from("quizzes").insert({
    //     name: title,
    // });

    const { data: quizz, error: quizzError } = await supabase.from("quizzes")
        .select()
        .order('created_at', { ascending: false })
        .limit(1);
    console.log(quizz);
    //redirect vers la page de modification du quizz
    redirect(`/quizz/${quizz.slug}/edit`);
};