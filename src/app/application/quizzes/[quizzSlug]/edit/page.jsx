// "use client";
// import CreateQuestionForm from "@/app/_components/questions/CreateQuestionForm";
// import QuestionType from "@/app/_components/questions/QuestionType";
// import { UploadDropzone } from "@/utils/uploadthing";
import CreateAQuizToggle from "@/app/_components/questions/CreateAQuizToggle";
import { createClient } from "@/app/_lib/supabase/server";

const EditQuizzPage = async ({ params }) => {
  const quizzSlug = params.quizzSlug;

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

  return (
    <div>
      <CreateAQuizToggle quizzSlug={quizzSlug} userXp={profile.xp} />
    </div>
  );
};

export default EditQuizzPage;
