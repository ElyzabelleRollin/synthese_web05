'use client';
import React from 'react';
import { updateUsername } from '@/app/_actions/update';
import { useRef } from 'react';
import style from './FormModifyUsername.module.css';
import Tertiarybutton from '../tertiarybutton/tertiarybutton';

const FormModifyUsername = ({name}) => {
	const input = useRef();

	function resetForm(formData) {
		updateUsername(formData);
		input.current.value = '';
	}

	return (
		<form action={resetForm} className={style.form}>
			<input type="varchar" name="newUsername" ref={input} className={style.input} placeholder={name} />
			{/* <button className={style.button}>Modify username</button> */}
			<div className={style.button}>
				<Tertiarybutton text="Modify username" iconright="Edit" theme="dark" />
			</div>
		</form>
	);
};

export default FormModifyUsername;
