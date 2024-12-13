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
