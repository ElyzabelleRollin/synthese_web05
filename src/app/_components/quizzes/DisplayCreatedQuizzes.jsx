"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { averageScore } from "@/app/_actions/quiz";
import { createClient } from "@/app/_lib/supabase/server";
import { deleteQuiz } from "@/app/_actions/delete";
import { getNbQuestions } from "@/app/_actions/quiz";

const DisplayCreatedQuizzes = ({ quizzes, userId }) => {
	const [questionsCount, setQuestionsCount] = useState({});

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
		<div>
			{quizzes && quizzes.length > 0 ? (
				<div className="grid grid-cols-3 gap-4">
					{quizzes.map((quiz) => (
						<div key={quiz.id} className="border p-4 bg-slate-400">
							<h2>{quiz.name}</h2>
							{quiz.created_by == userId && (
								<>
									<p>Number of attempts: {quiz.attempts ? quiz.attempts : 0}</p>
									<p>
										Average result: {quiz.average} /{" "}
										{questionsCount[quiz.id] || "Loading..."}
									</p>
								</>
							)}
							<Link href={`/application/quizzes/${quiz.slug}`}>
								Go to the quiz
							</Link>
							{quiz.created_by == userId && (
								<div>
									<Link href={`/application/quizzes/${quiz.slug}/edit`}>
										Edit
									</Link>
									<form action={() => deleteQuiz(quiz.id)}>
										<button type="submit">Delete</button>
									</form>
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