import React from 'react'
import styles from './heroquizzes.module.css'
import PrimaryButton from '../primarybutton/primarybutton'
import SecondaryButton from '../secondarybutton/secondarybutton'

const HeroQuizzes = () => {

    return (
        <section className={styles.heroQuizzes}>
            <img src="https://utfs.io/f/OJp1c0WpBPn044zNChP2dNPhVZpEjKqvARmbMJkY57cLWaws" alt="hero background" className={styles.herobg} />
            <div className={styles.content}>
                <h1 className={styles.title}>Choose Your Quiz Adventure!</h1>
                <p className={styles.text}>Step into the world of fun and learning! Explore a variety of exciting quizzes designed to challenge your mind and spark your curiosity. Whether you're competing with friends, testing your knowledge, or just having a good time, there’s a quiz waiting for everyone. Ready to dive in? Let the games begin!</p>
                <div className={styles.buttons}>
                    <PrimaryButton text="Create your own quiz!" iconright="ArrowRight" theme="light" link={"/application/quizzes/create"}/>
                </div>
            </div>
        </section>
    )
}

export default HeroQuizzes