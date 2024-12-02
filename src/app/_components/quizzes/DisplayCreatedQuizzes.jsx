import React from "react";
import Link from "next/link";
import { averageScore } from "@/app/_actions/quiz";
import { createClient } from "@/app/_lib/supabase/server";
import { deleteQuiz } from "@/app/_actions/delete";
import Primarybutton from "../primarybutton/primarybutton";
import Tertiarybutton from "../tertiarybutton/tertiarybutton";
import styles from "./DisplayCreatedQuizzes.module.css";

const DisplayCreatedQuizzes = async ({ quizzes }) => {
	const supabase = createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();
	return (
		<div className={styles.createdlist}>
			<h2 className={styles.title}>Quizzes created</h2>
			{quizzes && quizzes.length > 0 ? (
				<div className={styles.createdquizzes}>
					{quizzes.map((quiz) => (
						<div key={quiz.id} className={styles.card}>
							<h2 className={styles.quiztitle}>{quiz.name}</h2>
							<div className={styles.stats}>
								{quiz.created_by == user.id && (
									<>
										<p>Times played: {quiz.attempts ? quiz.attempts : 0}</p>
										<p>
											Average result: {averageScore(quiz.id)} / {getNbQuestions(quiz.id)}
										</p>
									</>
								)}
							</div>
							{quiz.created_by == user.id && (
								<div className={styles.buttons}>
									<Primarybutton
										text="Edit"
										iconleft="Edit"
										theme="dark"
										link={`/application/quizzes/${quiz.slug}/edit`}
									/>

									<form action={deleteQuiz(quiz.id)}>
										<div className={styles.deletebtn}>
											<Primarybutton text="Delete" iconleft="TrashCan" theme="dark" />
										</div>
									</form>

									<div className={styles.play}>
										<Tertiarybutton
											text="Play"
											iconright="ArrowRight"
											theme="dark"
											link={`/application/quizzes/${quiz.slug}`}
										/>
									</div>
								</div>
							)}
						</div>
					))}
				</div>
			) : (
				<p>No quizzes found.</p>
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

export default DisplayCreatedQuizzes;
