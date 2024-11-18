'use server';

import { redirect } from "next/navigation";
import { createClient } from "../_lib/supabase/server";

export const createQuizzAction = async (formData) => {
    //récupère les données du formulaire
    const title = formData.get('title');
    const description = formData.get('description');

    //pour communiquer avec la db
    const supabase = createClient();

    //UPSERT le nouveau quizz (mix de insert et update, permet de rajouter data:newQuizz pour avoir accès au slug pour la redirection)
    const { data: newQuizz, error } = await supabase.from("quizzes").upsert({
        name: title,
        description: description,
    }).select().single();

    //redirect vers la page de modification du quizz qu'on vient de créer
    redirect(`/application/quizzes/${newQuizz.slug}/edit`);
};