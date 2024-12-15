//Imports:
import CreateAQuizToggle from "@/app/_components/questions/CreateAQuizToggle";
import { createClient } from "@/app/_lib/supabase/server";

//Page to edit a quiz:
const EditQuizzPage = async ({ params }) => {
  const quizzSlug = params.quizzSlug; //Get the slug of the quiz
  const supabase = createClient(); //Access the Supabase

  //Get the quiz id:
  const { data: quiz, error } = await supabase
    .from("quizzes")
    .select("id")
    .eq("slug", quizzSlug)
    .single();
  if (error) console.log("[GET QUIZ]", error);

  //Get all the questions for the quiz:
  const { data: questions, errorQuestions } = await supabase
    .from("questions")
    .select("*")
    .eq("quizz_id", quiz.id);
  if (errorQuestions) console.log("[GET QUESTIONS]", error);

  //Get the user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  //fetch the xp from the profile of the user
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("xp")
    .eq("id", user.id)
    .single();

  return (
    <div>
      <CreateAQuizToggle
        quizzSlug={quizzSlug}
        questions={questions}
        userXp={profile.xp}
      />
    </div>
  );
};

export default EditQuizzPage;
