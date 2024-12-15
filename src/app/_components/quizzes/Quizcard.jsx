import React from "react";
import Link from "next/link";
import styles from "./Quizcard.module.css";
import Tertiarybutton from "../tertiarybutton/tertiarybutton";

const img1 = "https://utfs.io/f/OJp1c0WpBPn0kKwPvP57sGifEKcJg3aZhTW16SDjr5uRNVQ9";
const img2 = "https://utfs.io/f/OJp1c0WpBPn0jII6CBdkI7bQlj2KsdM1huw5S9ncGXiaxOoe";
const img3 = "https://utfs.io/f/OJp1c0WpBPn098Y6bSA2afMwtFmke6nGb3gTSzZlsIPj5hU8";

const Quizcard = async ({ quiz }) => {
	let rand = Math.floor(Math.random() * 3);
	let img;

	if (rand === 0) {
		img = img1;
	} else if (rand === 1) {
		img = img2;
	} else {
		img = img3;
	}

	return (
		<div className={styles.card}>
			<img src={img} alt="card image" className={styles.img} />
			<h2 className={styles.title}>{quiz.name}</h2>
			<p className={styles.description}>{quiz.description}</p>
			<div className={styles.btn}>
				<Tertiarybutton
					text="Play Now!"
					iconright="ArrowRight"
					theme="dark"
					link={`/application/quizzes/${quiz.slug}`}
				/>
			</div>
		</div>
	);
};

export default Quizcard;
