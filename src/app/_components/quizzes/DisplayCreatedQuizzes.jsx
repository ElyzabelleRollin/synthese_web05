'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { deleteQuizByQuizId } from '@/app/_actions/delete';
import { getNbQuestions } from '@/app/_actions/quiz';
import Primarybutton from '../primarybutton/primarybutton';
import Tertiarybutton from '../tertiarybutton/tertiarybutton';
import styles from './DisplayCreatedQuizzes.module.css';
import ScoreQuizzes from './ScoreQuizzes';
import RealTime from './RealTime';

const DisplayCreatedQuizzes = ({ quizzes, creatorId, userId }) => {
	const [questionsCount, setQuestionsCount] = useState({});
	const [playAnimAttempts, setPlayAnimAttempts] = useState(false);
	const [PlayAnimAverage, setPlayAnimAverage] = useState(false);

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

	// here add state for object containing attempts and averageScore in parent component
	const [currentScore, setCurrentScore] = useState({
		attempts: 0,
		average: 0,
		id: null,
	});

  useEffect(() => {
    ToggleAnimAttempts();
  }, [currentScore.attempts]);

  useEffect(() => {
    ToggleAnimAverage();
  }, [currentScore.average]);

	function ToggleAnimAttempts() {
		setTimeout(() => {
			setPlayAnimAttempts(true);
		}, 1000);
		setPlayAnimAttempts(false);
	}
	
  function ToggleAnimAverage() {
		setTimeout(() => {
			setPlayAnimAverage(true);
		}, 1000);
		setPlayAnimAverage(false);
	}

	// console.log(currentScore);

	return (
		<div className={styles.createdlist}>
			<h2 className={styles.title}>Quizzes created</h2>
			{/* here add realtime component */}
			<RealTime userId={creatorId} setCurrentScore={setCurrentScore} />
			{quizzes && quizzes.length > 0 ? (
				<div className={styles.createdquizzes}>
					{quizzes.map((quiz) => (
						<div key={quiz.id} className={styles.card}>
							<h2 className={styles.quiztitle}>{quiz.name}</h2>
							{quiz.created_by == userId && (
								<>
									{/* If the quiz is banned, show the reason */}
									{quiz.banned && (
										<div>
											<p>Banned</p>
											<p>{quiz.banned_reason}</p>
										</div>
									)}
									{currentScore.id === quiz.id ? (
										<ScoreQuizzes
											attempts={currentScore.attempts}
											averageScore={currentScore.average}
											nbQuestions={questionsCount[quiz.id]}
                      playAttempts={playAnimAttempts}
                      playAverage={PlayAnimAverage}
										/>
									) : (
										<ScoreQuizzes
											attempts={quiz.attempts ? quiz.attempts : 0}
											averageScore={quiz.average ? quiz.average : 0}
											nbQuestions={questionsCount[quiz.id]}
                      playAttempts={playAnimAttempts}
                      playAverage={PlayAnimAverage}
										/>
									)}
								</>
							)}
							<div className={styles.buttons}>
								{quiz.created_by == userId && (
									<>
										<Primarybutton
											text="Edit"
											theme="dark"
											iconright="Edit"
											link={`/application/quizzes/${quiz.slug}/edit`}
										/>

										<form action={() => deleteQuiz(quiz.id)}>
											<div className={styles.deletebtn}>
												<Primarybutton text="Delete" iconleft="TrashCan" theme="dark" />
											</div>
										</form>
									</>
								)}
								{/* If the quiz is not banned, show the link to the quiz */}
								{!quiz.banned && (
									<div className={styles.play}>
										<Tertiarybutton
											text="Play"
											theme="dark"
											iconright="ArrowRight"
											link={`/application/quizzes/${quiz.slug}`}
										/>
									</div>
								)}
							</div>
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
