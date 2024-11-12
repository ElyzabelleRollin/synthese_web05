"use client";
import CreateQuestionForm from "@/app/_components/createQuestionForm";
import QuestionType from "@/app/_components/questionType";
import { UploadDropzone } from "@/utils/uploadthing";

const EditQuizzPage = () => {
    return (
        <div>
            <QuestionType type="Normal multiple choice" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos." />
            <QuestionType type="Find the intruder" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos." />
            <QuestionType type="Identify the sound" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos." />


            <CreateQuestionForm />


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
    )
};

export default EditQuizzPage;