import React from 'react';
import Link from 'next/link';
import styles from './QuizCompleted.module.css';
import Primarybutton from '../primarybutton/primarybutton';
import Secondarybutton from '../secondarybutton/secondarybutton';

const QuizCompleted = ({ score, questionsLength, userID, average, earnedXp }) => {
	return (
		<div className={styles.quizCompleted}>
			<h2 className={styles.title}>Quiz Completed!</h2>
			<p className={styles.score}>
				Your score: {score} out of {questionsLength}
			</p>
			<p className={styles.average}>
				The average score is:{' '}
				{average !== null
					? `${average} out of ${questionsLength}`
					: `0 out of ${questionsLength}`}
			</p>
			<p className={styles.earnedXp}>
				You gained: <span className={styles.xp}>{earnedXp} XP</span>
			</p>
			<div className={styles.buttons}>
				<Secondarybutton text="Go back to the quizzes" iconleft="ArrowLeft" theme="dark" link="/application/quizzes" />
				<Primarybutton text="Go to your profile" iconright="ArrowRight" theme="dark" link={`/application/profiles/${userID}`} />
			</div>
		</div>
	);
};

export default QuizCompleted;
