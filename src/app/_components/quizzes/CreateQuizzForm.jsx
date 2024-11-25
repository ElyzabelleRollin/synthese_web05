import { createQuizzAction } from "@/app/_actions/createQuizzAction";
import styles from "./CreateQuizForm.module.css";
import Primarybutton from "../primarybutton/primarybutton";

const CreateQuizzForm = () => {
	return (
		<form action={createQuizzAction} className={styles.createform}>
			<h1 className={styles.title}>Create a new quiz</h1>
			<label htmlFor="title" className={styles.label}>Name your quiz</label>
			<input type="text" id="title" name="title" placeholder="Give me a title..." className={styles.input}/>
			<label htmlFor="description" className={styles.label}>Describe your creation</label>
			<textarea type="text" id={styles.description} name="description" placeholder="Please don't leave me empty..." maxLength={500} className={styles.input}/>
			<div className={styles.button}>
				<Primarybutton text="Create" theme="dark" />
			</div>
		</form>
	);
};

export default CreateQuizzForm;
