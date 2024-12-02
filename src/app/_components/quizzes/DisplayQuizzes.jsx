import React from "react";
import Link from "next/link"; // Make sure Link is imported
import { createClient } from "@/app/_lib/supabase/server";
import styles from "./DisplayCreatedQuizzes.module.css";
import Tertiarybutton from "../tertiarybutton/tertiarybutton";

const DisplayQuizzes = async ({ quizzes }) => {
	return (
		<div className={styles.createdlist}>
			<h2 className={styles.title}>Quizzes played</h2>
			{quizzes && quizzes.length > 0 ? (
				<div className={styles.createdquizzes}>
					{quizzes.map((quizz) => (
						<div key={quizz.id} className={styles.card}>
							<h2 className={styles.quiztitle}>{quizz.quizzes.name}</h2>
							<div className={styles.stats}>
								<p>
									Highest score: {quizz.result} / {getNbQuestions(quizz.quizzes.id)}
								</p>
								<p>Times played: {quizz.attempts}</p>
							</div>
							{quizz.quizzes ? (
								<Tertiarybutton
									text="Play"
									iconright="ArrowRight"
									theme="dark"
									link={`/application/quizzes/${quizz.quizzes.slug}`}
								/>
							) : (
								<Tertiarybutton
									text="Play"
									iconright="ArrowRight"
									theme="dark"
									link={`/application/quizzes/${quizz.slug}`}
								/>
							)}
						</div>
					))}
				</div>
			) : (
				<p>No quizzes available</p>
			)}
		</div>
	);
};

const getNbQuestions = async (quizId) => {
	const supabase = createClient();
	const { data: questions, error } = await supabase
		.from("questions")
		.select("*")
		.eq("quizz_id", quizId);
	if (error) console.log("[GET NB QUESTIONS:]", error);

	return questions.length;
};

export default DisplayQuizzes;
