"use client";
import { createQuizzAction } from "@/app/_actions/createQuizzAction";
import styles from "./CreateQuizForm.module.css";
import Primarybutton from "../primarybutton/primarybutton";
import { useRef } from "react";
import { useFormState } from "react-dom";

const CreateQuizzForm = () => {


	//envoyer des infos supp au server action-> { message: '', error: null } = initalState
	//recevoir infos/feedback depuis server action -> stateFromServer
	//recoit une nouvelle action (newCreateQuizzAction) qu'on met dans le form
	const [stateFromServer, newCreateQuizzAction] = useFormState(createQuizzAction, { message: '', error: null });

	const descriptionRef = useRef(null);
	const wordCount = useRef(null);

	function CountWords() {
		if (descriptionRef.current.value) {
			wordCount.current.innerText = descriptionRef.current.value.length

			if (descriptionRef.current.value.length >= 200) {
				wordCount.current.style.color = "red"
			}
			else {
				wordCount.current.style.color = "inherit"
			}
		}
		else {
			wordCount.current.innerText = "0"
		}
	}

	return (
		<form action={newCreateQuizzAction} className={styles.createform}>
			<h1 className={styles.title}>Create a new quiz</h1>
			<label htmlFor="title" className={styles.label}>Name your quiz</label>
			<input type="text" id="title" name="title" placeholder="Give me a title..." maxLength={18} className={styles.input} />
			<label htmlFor="description" className={styles.label}>Describe your creation</label>
			<div className={styles.descriptioncontainer}>
				<textarea type="text" id={styles.description} name="description" placeholder="Please don't leave me empty..." onChange={CountWords} maxLength={200} ref={descriptionRef} className={styles.input} />
				<p className={styles.wordcounter}><span ref={wordCount}>0</span>/200</p>
			</div>
			<div className={styles.button}>
				<Primarybutton text="Create" theme="dark" />
			</div>
			{/* afficher l'erreur ZOD */}
			<p className={styles.error}>{stateFromServer.error}</p>
		</form>
	);
};

export default CreateQuizzForm;
