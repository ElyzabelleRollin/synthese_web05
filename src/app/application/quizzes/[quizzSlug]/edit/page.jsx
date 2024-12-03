"use client";
import CreateQuestionForm from "@/app/_components/questions/CreateQuestionForm";
import QuestionType from "@/app/_components/questions/QuestionType";
import { UploadDropzone } from "@/utils/uploadthing";
import CreateAQuizToggle from "@/app/_components/questions/CreateAQuizToggle";

const EditQuizzPage = ({ params }) => {
  const quizzSlug = params.quizzSlug;

  return (
    <div>
      <CreateAQuizToggle quizzSlug={quizzSlug} />
    </div>
  );
};

export default EditQuizzPage;
