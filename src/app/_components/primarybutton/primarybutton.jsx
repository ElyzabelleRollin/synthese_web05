import React from "react";
import styles from "./primarybutton.module.css";
import Link from "next/link";
import ArrowRight from "../icons/arrowright";
import ArrowLeft from "../icons/arrowleft";
import TrashCan from "../icons/trashcan";
import Login from "../icons/login";
import Logout from "../icons/logout";
import Edit from "../icons/edit";

const primarybutton = ({
	text,
	iconleft,
	iconright,
	theme,
	link,
	clickaction,
}) => {
	const buttonClass = `${styles.primarybutton} ${theme ? styles[theme] : ""}`;

	return (
		<div className={buttonClass}>
			{link ? (
				<Link href={link} className={styles.link}>
					{iconleft ? (
						<div className={`${styles.iconleft} ${styles.icon}`}>
							{iconleft === "ArrowRight" ? (
								<ArrowRight />
							) : iconleft === "ArrowLeft" ? (
								<ArrowLeft />
							) : iconleft === "TrashCan" ? (
								<TrashCan />
							) : iconleft === "Login" ? (
								<Login />
							) : iconleft === "Logout" ? (
								<Logout />
							) : iconleft === "Edit" ? (
								<Edit />
							) : null}
						</div>
					) : null}

					<p className={styles.label}>{text}</p>

					{iconright ? (
						<div className={`${styles.iconright} ${styles.icon}`}>
							{iconright === "ArrowRight" ? (
								<ArrowRight />
							) : iconright === "ArrowLeft" ? (
								<ArrowLeft />
							) : iconright === "TrashCan" ? (
								<TrashCan />
							) : iconright === "Login" ? (
								<Login />
							) : iconright === "Logout" ? (
								<Logout />
							) : iconright === "Edit" ? (
								<Edit />
							) : null}
						</div>
					) : null}
				</Link>
			) : (
				<button className={styles.link} onClick={clickaction ? clickaction : null} type={clickaction ? "button" : "submit"}>
					{iconleft ? (
						<div className={`${styles.iconleft} ${styles.icon}`}>
							{iconleft === "ArrowRight" ? (
								<ArrowRight />
							) : iconleft === "ArrowLeft" ? (
								<ArrowLeft />
							) : iconleft === "TrashCan" ? (
								<TrashCan />
							) : iconleft === "Login" ? (
								<Login />
							) : iconleft === "Logout" ? (
								<Logout />
							) : iconleft === "Edit" ? (
								<Edit />
							) : null}
						</div>
					) : null}

					<p className={styles.label}>{text}</p>

					{iconright ? (
						<div className={`${styles.iconright} ${styles.icon}`}>
							{iconright === "ArrowRight" ? (
								<ArrowRight />
							) : iconright === "ArrowLeft" ? (
								<ArrowLeft />
							) : iconright === "TrashCan" ? (
								<TrashCan />
							) : iconright === "Login" ? (
								<Login />
							) : iconright === "Logout" ? (
								<Logout />
							) : iconright === "Edit" ? (
								<Edit />
							) : null}
						</div>
					) : null}
				</button>
			)}
		</div>
	);
};

export default primarybutton;
