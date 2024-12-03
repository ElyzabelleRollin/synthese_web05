import React from "react";
import styles from "./primarybutton.module.css";
import Link from "next/link";

const primarybutton = ({ text, iconleft, iconright, theme, link, clickaction }) => {
	const buttonClass = `${styles.primarybutton} ${theme ? styles[theme] : ""}`;

	return (
		<div className={buttonClass}>
			{link ? (
				<Link href={link} className={styles.link}>
					{iconleft ? <img src={iconleft} alt="icon" /> : <></>}
					<p className={styles.label}>{text}</p>
					{iconright ? <img src={iconright} alt="icon" /> : <></>}
				</Link>
			) : (
				<button className={styles.link} onClick={clickaction ? clickaction : null}>
					{iconleft ? <img src={iconleft} alt="icon" /> : <></>}
					<p className={styles.label}>{text}</p>
					{iconright ? <img src={iconright} alt="icon" /> : <></>}
				</button>
			)}
		</div>
	);
};

export default primarybutton;
