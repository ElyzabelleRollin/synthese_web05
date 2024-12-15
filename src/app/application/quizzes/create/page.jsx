//Imports:
import CreateQuizzForm from "@/app/_components/quizzes/CreateQuizzForm";
import styles from "@/app/_components/quizzes/CreateQuizPage.module.css";
import Footer from "@/app/_components/footer/footer";

//Page to create a new quiz:
const CreateQuizPage = () => {
  return (
    <div className={styles.createquizpage}>
      <CreateQuizzForm />
      <Footer />
    </div>
  );
};

export default CreateQuizPage;
