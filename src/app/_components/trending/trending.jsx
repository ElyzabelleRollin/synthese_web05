import { createClient } from "@/app/_lib/supabase/server";
import React from "react";
import QuizzesList from "../quizzes/QuizzesList";
import styles from "./trending.module.css";
import Link from "next/link";
import Primarybutton from "../primarybutton/primarybutton";
import Tertiarybutton from "../tertiarybutton/tertiarybutton";

const trending = async () => {
	const supabase = createClient();
	const searchQuery = ""; // Retrieve the search query from the URL

	// Fetch quizzes based on the search query in the name column
	const { data: quizzes } = await supabase
		.from("quizzes")
		.select("*")
		.ilike("name", `%${searchQuery}%`);

	return (
		<section className={styles.trending}>
			<div className={styles.titlebar}>
				<h2 className={styles.title}>Trending quizzes</h2>
				<div className={styles.button}>
					<Tertiarybutton text="View more" iconright="ArrowRight" theme="dark" link={"/application/quizzes"}/>
				</div>
			</div>
			<div className={styles.list}>
				<QuizzesList quizzes={quizzes} amount={4}>
					<div className={styles.widecard}>
						<h2 className={styles.title}>Create your own!</h2>
						<p className={styles.description}>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae possimus
							nostrum ea pariatur harum nobis quo tenetur quaerat necessitatibus perspiciatis!
						</p>
						<div className={styles.button}>
							<Primarybutton
								text="Create your own!"
								iconright="ArrowRight"
								theme="dark"
								link={"/application/quizzes/create"}
							/>
						</div>
					</div>
				</QuizzesList>
			</div>
		</section>
	);
};

export default trending;
