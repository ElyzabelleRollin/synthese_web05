//Imports:
'use client';
import React, { useState } from 'react';
import {
	updateUserBanStatus,
	updateQuizBanStatus,
	editQuiz,
	setUserAsAdmin,
} from '@/app/_actions/admin';
import styles from './admin.module.css';
import Primarybutton from '../primarybutton/primarybutton';
import Secondarybutton from '../secondarybutton/secondarybutton';

const Admin = ({ quizzes, userEmail }) => {
	const [page, setPage] = useState('Ban a user');
	const [emailSuggestions, setEmailSuggestions] = useState([]);
	const [quizNameSuggestions, setQuizNameSuggestions] = useState([]);
	const [inputEmail, setInputEmail] = useState('');
	const [inputQuizName, setInputQuizName] = useState('');

	// Handle email input change and update suggestions
	const handleEmailChange = (value) => {
		setInputEmail(value);
		setEmailSuggestions(
			userEmail
				.map((user) => user.email)
				.filter((email) => email.toLowerCase().includes(value.toLowerCase()))
		);
	};

	// Handle quiz name input change and update suggestions
	const handleQuizNameChange = (value) => {
		setInputQuizName(value);
		setQuizNameSuggestions(
			quizzes
				.map((quiz) => quiz.name)
				.filter((name) => name.toLowerCase().includes(value.toLowerCase()))
		);
	};

	// Render suggestions as dropdown options
	const renderSuggestions = (suggestions, onSelect) => (
		<ul className="suggestion-list">
			{suggestions.map((item, index) => (
				<li
					key={index}
					className="cursor-pointer hover:bg-gray-200 p-2"
					onClick={() => onSelect(item)}
				>
					{item}
				</li>
			))}
		</ul>
	);

	var theme = '';
	return (
		<div className={styles.admin}>
			<h1 className={styles.title}>Options d'admin</h1>
			<nav>
				<ul className={styles.nav}>
					<li>
						{page === 'Ban a user' ? (
							<Primarybutton
								text="Ban a user"
								theme="dark"
								clickaction={() => setPage('Ban a user')}
							/>
						) : (
							<Secondarybutton
								text="Ban a user"
								theme="dark"
								clickaction={() => setPage('Ban a user')}
							/>
						)}
					</li>
					<li>
						{page === 'Unban a user' ? (
							<Primarybutton
								text="Unban a user"
								theme="dark"
								clickaction={() => setPage('Unban a user')}
							/>
						) : (
							<Secondarybutton
								text="Unban a user"
								theme="dark"
								clickaction={() => setPage('Unban a user')}
							/>
						)}
					</li>
					<li>
						{page === 'Ban a quiz' ? (
							<Primarybutton
								text="Ban a quiz"
								theme="dark"
								clickaction={() => setPage('Ban a quiz')}
							/>
						) : (
							<Secondarybutton
								text="Ban a quiz"
								theme="dark"
								clickaction={() => setPage('Ban a quiz')}
							/>
						)}
					</li>
					<li>
						{page === 'Unban a quiz' ? (
							<Primarybutton
								text="Unban a quiz"
								theme="dark"
								clickaction={() => setPage('Unban a quiz')}
							/>
						) : (
							<Secondarybutton
								text="Unban a quiz"
								theme="dark"
								clickaction={() => setPage('Unban a quiz')}
							/>
						)}
					</li>
					<li>
						{page === 'Edit a quiz' ? (
							<Primarybutton
								text="Edit a quiz"
								theme="dark"
								clickaction={() => setPage('Edit a quiz')}
							/>
						) : (
							<Secondarybutton
								text="Edit a quiz"
								theme="dark"
								clickaction={() => setPage('Edit a quiz')}
							/>
						)}
					</li>
					<li>
						{page === 'Set as admin' ? (
							<Primarybutton
								text="Set as admin"
								theme="dark"
								clickaction={() => setPage('Set as admin')}
							/>
						) : (
							<Secondarybutton
								text="Set as admin"
								theme="dark"
								clickaction={() => setPage('Set as admin')}
							/>
						)}
					</li>
					<li>
						{page === 'Remove as admin' ? (
							<Primarybutton
								text="Remove as admin"
								theme="dark"
								clickaction={() => setPage('Remove as admin')}
							/>
						) : (
							<Secondarybutton
								text="Remove as admin"
								theme="dark"
								clickaction={() => setPage('Remove as admin')}
							/>
						)}
					</li>
				</ul>
			</nav>
			{page === 'Ban a user' && (
				<div className={styles.editor}>
					<h1 className={styles.formtitle}>Ban a user</h1>
					<form className={styles.form} action={updateUserBanStatus}>
						<div className={styles.inputcontainer}>
              <label className={styles.label} htmlFor="email">Email</label>
              <input className={styles.input}
                required
                type="email"
                id="email"
                name="email"
                value={inputEmail}
                onChange={(e) => handleEmailChange(e.target.value)}
              />
              {emailSuggestions.length > 0 &&
                inputEmail !== '' &&
                renderSuggestions(emailSuggestions, setInputEmail)}
              <label className={styles.label} htmlFor="reason">Reason</label>
              <input className={styles.input} type="text" id="reason" name="reason" required />
              <input className={styles.input} type="hidden" id="isBanned" name="isBanned" value="true" />
            </div>
						<div className={styles.buttoncontainer}>
							<Primarybutton text="Ban" theme="dark" iconright={'ArrowRight'} />
						</div>
					</form>
				</div>
			)}
			{page === 'Unban a user' && (
				<div className={styles.editor}>
					<h1 className={styles.formtitle}>Unban a user</h1>
					<form className={styles.form} action={updateUserBanStatus}>
						<div className={styles.inputcontainer}>
              <label className={styles.label} htmlFor="email">Email</label>
              <input className={styles.input}
                type="email"
                id="email"
                name="email"
                value={inputEmail}
                required
                onChange={(e) => handleEmailChange(e.target.value)}
              />
              {emailSuggestions.length > 0 &&
                inputEmail !== '' &&
                renderSuggestions(emailSuggestions, setInputEmail)}
              <input className={styles.input} type="hidden" id="isBanned" name="isBanned" value="false" />
            </div>
						<div className={styles.buttoncontainer}>
							<Primarybutton text="Unban" theme="dark" iconright={'ArrowRight'} />
						</div>
					</form>
				</div>
			)}
			{page === 'Ban a quiz' && (
				<div className={styles.editor}>
					<h1 className={styles.formtitle}>Ban a quiz</h1>
					<form className={styles.form} action={updateQuizBanStatus}>
						<div className={styles.inputcontainer}>
              <label className={styles.label} htmlFor="quizName">Quiz name</label>
              <input className={styles.input}
                type="text"
                id="quizName"
                name="quizName"
                value={inputQuizName}
                required
                onChange={(e) => handleQuizNameChange(e.target.value)}
              />
              {quizNameSuggestions.length > 0 &&
                inputQuizName !== '' &&
                renderSuggestions(quizNameSuggestions, setInputQuizName)}
              <label className={styles.label} htmlFor="reason">Reason</label>
              <input className={styles.input} type="hidden" id="isBanned" name="isBanned" value="true" />
              <input className={styles.input} type="text" id="reason" name="reason" required />
            </div>
						<div className={styles.buttoncontainer}>
							<Primarybutton text="Ban" theme="dark" iconright={'ArrowRight'} />
						</div>
					</form>
				</div>
			)}
			{page === 'Unban a quiz' && (
				<div className={styles.editor}>
					<h1 className={styles.formtitle}>Unban a quiz</h1>
					<form className={styles.form} action={updateQuizBanStatus}>
						<div className={styles.inputcontainer}>
              <label className={styles.label} htmlFor="quizName">Quiz name</label>
              <input className={styles.input}
                type="text"
                id="quizName"
                name="quizName"
                value={inputQuizName}
                required
                onChange={(e) => handleQuizNameChange(e.target.value)}
              />
              {quizNameSuggestions.length > 0 &&
                inputQuizName !== '' &&
                renderSuggestions(quizNameSuggestions, setInputQuizName)}
              <input className={styles.input} type="hidden" id="isBanned" name="isBanned" value="false" />
            </div>
						<div className={styles.buttoncontainer}>
							<Primarybutton text="Unban" theme="dark" iconright={'ArrowRight'} />
						</div>
					</form>
				</div>
			)}

			{page === 'Edit a quiz' && (
				<div className={styles.editor}>
					<h1 className={styles.formtitle}>Edit a quiz</h1>
					<form className={styles.form} action={editQuiz}>
						<div className={styles.inputcontainer}>
              <label className={styles.label} htmlFor="quizName">Quiz name</label>
              <input className={styles.input}
                type="text"
                id="quizName"
                name="quizName"
                value={inputQuizName}
                onChange={(e) => handleQuizNameChange(e.target.value)}
              />
              {quizNameSuggestions.length > 0 &&
                inputQuizName !== '' &&
                renderSuggestions(quizNameSuggestions, setInputQuizName)}
            </div>
						<div className={styles.buttoncontainer}>
							<Primarybutton text="Edit" theme="dark" iconright={'ArrowRight'} />
						</div>
					</form>
				</div>
			)}
			{page === 'Set as admin' && (
				<div className={styles.editor}>
					<h1 className={styles.formtitle}>Set as admin</h1>
					<form className={styles.form} action={setUserAsAdmin}>
						<div className={styles.inputcontainer}>
              <label className={styles.label} htmlFor="email">Email</label>
              <input className={styles.input}
                type="email"
                id="email"
                name="email"
                value={inputEmail}
                onChange={(e) => handleEmailChange(e.target.value)}
              />
              {emailSuggestions.length > 0 &&
                inputEmail !== '' &&
                renderSuggestions(emailSuggestions, setInputEmail)}
              <input className={styles.input} type="hidden" id="isAdmin" name="isAdmin" value="true" />
            </div>
						<div className={styles.buttoncontainer}>
							<Primarybutton text="Set as admin" theme="dark" iconright={'ArrowRight'} />
						</div>
					</form>
				</div>
			)}
			{page === 'Remove as admin' && (
				<div className={styles.editor}>
					<h1 className={styles.formtitle}>Remove as admin</h1>
					<form className={styles.form} action={setUserAsAdmin}>
						<div className={styles.inputcontainer}>
              <label className={styles.label} htmlFor="email">Email</label>
              <input className={styles.input}
                type="email"
                id="email"
                name="email"
                value={inputEmail}
                onChange={(e) => handleEmailChange(e.target.value)}
              />
              {emailSuggestions.length > 0 &&
                inputEmail !== '' &&
                renderSuggestions(emailSuggestions, setInputEmail)}
              <input className={styles.input} type="hidden" id="isAdmin" name="isAdmin" value="false" />
            </div>
						<div className={styles.buttoncontainer}>
							<Primarybutton text="Remove as admin" theme="dark" iconright={'ArrowRight'} />
						</div>
					</form>
				</div>
			)}
		</div>
	);
};

export default Admin;
