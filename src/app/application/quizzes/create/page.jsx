//Imports:
import CreateQuizzForm from "@/app/_components/quizzes/CreateQuizzForm";
import styles from "@/app/_components/quizzes/CreateQuizPage.module.css";
import { createClient } from "@/app/_lib/supabase/server";
import { redirect } from "next/navigation";

const CreateQuizzPage = async () => {
    //Access to the database
    const supabase = createClient();

    //Get the user
    const {
        data: { user },
    } = await supabase.auth.getUser();

    //fetch the xp from the profile of the user
    const { data: profile, error } = await supabase
        .from('profiles')
        .select('xp')
        .eq('id', user.id)
        .single();

    //if the user has less than 1000 xp, redirect to the home page
    if (profile.xp < 1000) {
        redirect("/");
    }

    return (
        <div className={styles.createquizpage}>
            <CreateQuizzForm />
            <Footer />
        </div>
    )
};

export default CreateQuizPage;
