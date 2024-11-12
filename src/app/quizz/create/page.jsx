import CreateQuizzForm from "@/app/_components/createQuizzForm";
import QuestionType from "@/app/_components/questionType";

const CreateQuizzPage = () => {
    return (
        <div>
            <h1>Create a new quizz</h1>

            <CreateQuizzForm />

            <QuestionType type="Compléter la suite" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos." />
            <QuestionType type="Trouver l'intrus" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos." />
            <QuestionType type="Identifier le son" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos." />
        </div>
    )
};

export default CreateQuizzPage;
