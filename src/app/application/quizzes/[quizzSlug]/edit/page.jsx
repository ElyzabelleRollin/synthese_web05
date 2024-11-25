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
      {/* <div className="flex gap-4 p-4">
        <QuestionType
          type="Normal multiple choice"
          description="You have to choose the correct answer"
        />
        <QuestionType
          type="Find the intruder"
          description="You have to find the intruder"
        />
        <QuestionType
          type="Identify the sound"
          description="A sound is played. You have to identify the sound"
        />
      </div>

      <CreateQuestionForm quizzSlug={quizzSlug} /> */}

      {/* <UploadDropzone
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                    // Do something with the response
                    console.log("Files: ", res);
                    alert("Upload Completed");
                }}
                onUploadError={(error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                }}
                onBeforeUploadBegin={(files) => {
                    return files.map((file) => {
                        const blob = file.slice(0, file.size, file.type);
                        const newFile = new File(
                            [blob],
                            "monEmail." + file.name.split(".").pop(),
                            { type: file.type }
                        );
                        return newFile;
                    });
                }}
            /> */}
    </div>
  );
};

export default EditQuizzPage;
