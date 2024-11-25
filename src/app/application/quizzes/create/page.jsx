import CreateQuizzForm from "@/app/_components/quizzes/CreateQuizzForm";
import QuestionType from "@/app/_components/questions/QuestionType";
import Footer from "@/app/_components/footer/footer";
import styles from "@/app/_components/quizzes/CreateQuizPage.module.css";

const CreateQuizzPage = () => {
    return (
        <div className={styles.createquizpage}>
            <CreateQuizzForm />
            <Footer />
        </div>
    )
};

export default CreateQuizzPage;
