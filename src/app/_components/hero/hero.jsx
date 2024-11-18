import React from 'react'
import styles from './hero.module.css'
import PrimaryButton from '../primarybutton/primarybutton'
import SecondaryButton from '../secondarybutton/secondarybutton'

const hero = () => {

    return (
        <section className={styles.hero}>
            <img src="https://placehold.co/1920x1080" alt="hero background" className={styles.herobg} />
            <div className={styles.content}>
                <h1 className={styles.title}>Interactive Quizzes, Unlimited Fun!</h1>
                <p className={styles.text}>Engage with exciting, real-time quizzes designed to bring people together. Whether you're at home, in the classroom, or hosting a virtual event, our platform offers endless possibilities to learn, connect, and compete. Create your own custom quizzes, explore trending topics, or challenge friends and family to see who comes out on top.</p>
                <div className={styles.buttons}>
                    <PrimaryButton text="Launch a quiz" theme="light"/>
                    <SecondaryButton text="Create your own quiz!" theme="light"/>
                </div>
            </div>
        </section>
    )
}

export default hero