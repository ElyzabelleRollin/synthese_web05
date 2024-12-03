"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { deleteQuiz } from "@/app/_actions/delete";
import { getNbQuestions } from "@/app/_actions/quiz";
import Primarybutton from "../primarybutton/primarybutton";
import Tertiarybutton from "../tertiarybutton/tertiarybutton";
import styles from "./DisplayCreatedQuizzes.module.css";

const DisplayCreatedQuizzes = ({ quizzes, userId }) => {
	const [questionsCount, setQuestionsCount] = useState({});

	console.log(quizzes);

	useEffect(() => {
		// Fetch the number of questions for all quizzes
		const fetchQuestionsCounts = async () => {
			const counts = {};
			for (const quiz of quizzes) {
				counts[quiz.id] = await getNbQuestions(quiz.id);
			}
			setQuestionsCount(counts);
		};

		fetchQuestionsCounts();
	}, [quizzes]);

	return (
		<div className={styles.createdlist}>
			<h2 className={styles.title}>Quizzes created</h2>
			{quizzes && quizzes.length > 0 ? (
				<div className={styles.createdquizzes}>
					{quizzes.map((quiz) => (
						<div key={quiz.id} className={styles.card}>
							<h2 className={styles.quiztitle}>{quiz.name}</h2>
							<div className={styles.stats}>
								{quiz.created_by == userId && (
									<>
										<p>Times played: {quiz.attempts ? quiz.attempts : 0}</p>
										<p>
											Average result: {quiz.average_score ? quiz.average_score : 0}
										</p>
									</>
								)}
							</div>
							{quiz.created_by == userId && (
								<div className={styles.buttons}>
									<Primarybutton
										text="Edit"
										iconleft="Edit"
										theme="dark"
										link={`/application/quizzes/${quiz.slug}/edit`}
									/>

									{/* <form action={() => deleteQuiz(quiz.id)}>
										<div className={styles.deletebtn}>
											<Primarybutton text="Delete" iconleft="TrashCan" theme="dark" />
										</div>
									</form> */}

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

export default DisplayCreatedQuizzes;