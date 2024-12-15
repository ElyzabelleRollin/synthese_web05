//Imports:
'use client';
import React from 'react';
import CreateQuestionForm from './CreateQuestionForm';
import QuestionType from './QuestionType';
import { useState } from 'react';
import styles from './CreateAQuizToggle.module.css';
import Link from 'next/link';

//Component that allows you to choose the type of question:
const CreateAQuizToggle = ({ quizzSlug, questions, userXp }) => {
	const [show, setShow] = useState(true); //Toggle between create question form and question types
	const toggle = () => setShow(!show); //Handle toggle
	const [type, setQuestionType] = useState(); //Store the type of question selected

	//Function to handle the click on a question type:
	function handleClick(type) {
		setQuestionType(type);
		setShow(false);
	}

	return (
		<div className={`${styles.questiontypescontainer} ${show && styles.show}`}>
			{show && (
				<>
					<div className={styles.questiontypes}>
						<QuestionType
							type="Normal multiple choice"
							description="You have to choose the correct answer"
							action={() => handleClick('Normal multiple choice')} //Allow to access the multiple choice type form
						/>
          {/* Only users with 5000 xp or more can see the find the intruder type */}
          {userXp >= 5000 ? (
  						<QuestionType
  							type="Find the intruder"
  							description="You have to find the intruder"
  							action={() => handleClick('Find the intruder')} //Allow to access the find the intruder type form
  						/>
          ) : null}
          {/* Only users with 10000 xp or more can see the identify the sound type */}
          {userXp >= 10000 ? (
  						<QuestionType
  							type="Identify the sound"
  							description="A sound is played. You have to identify the sound"
  							action={() => handleClick('Identify the sound')} //Allow to access the identify the sound type form
  						/>
          ) : null}
					</div>
					<div className={styles.questionsEdit}>
						<h3 className={styles.editTitle}>Edit</h3>
						<figure className={styles.line}></figure>
						{questions.map((question, i) => (
							<div className={styles.number}>
								<Link key={i} href={`/application/quizzes/${quizzSlug}/edit/${question.id}`}>
									{i + 1}
								</Link>
							</div>
						))}
						<figure className={`${styles.number} ${styles.fig} ${questions.length === 0 && styles.empty}`}></figure>
					</div>
				</>
			)}
			{!show && (
				<CreateQuestionForm
					quizzSlug={quizzSlug}
					questionType={type}
					onSelectQuestionType={toggle} //Allow to go back to the question types
				/>
			)}
		</div>
	);
};
export default CreateAQuizToggle;
