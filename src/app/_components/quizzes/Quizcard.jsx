import React from "react";
import Link from "next/link";
import styles from "./Quizcard.module.css";
import Tertiarybutton from "../tertiarybutton/tertiarybutton";

const Quizcard = async ({ quiz }) => {
	return (
		<div className={styles.card}>
			<h2 className={styles.title}>{quiz.name}</h2>
			<p className={styles.description}>{quiz.description}</p>
			<div className={styles.btn}>
				<Tertiarybutton
					text="Play Now!"
					iconright="ArrowRight"
					theme="dark"
					link={`/application/quizzes/${quiz.slug}`}
				/>
			</div>
		</div>
	);
};

export default Quizcard;
