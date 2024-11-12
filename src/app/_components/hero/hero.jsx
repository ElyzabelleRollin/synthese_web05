import React from 'react'
import styles from './hero.module.css'
import PrimaryButton from '../primarybutton/primarybutton'
import SecondaryButton from '../secondarybutton/secondarybutton'

const hero = () => {

    return (
        <section className={styles.hero}>
            <img src="https://placehold.co/1920x1080" alt="hero background" className={styles.herobg} />
            <div className={styles.content}>
                <h1 className={styles.title}>Lorem ipsum</h1>
                <p className={styles.text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet animi inventore et cum eum dolorem, perspiciatis voluptatum illum porro quis.</p>
                <div className={styles.buttons}>
                    <PrimaryButton text="Launch a quiz" theme="light"/>
                    <SecondaryButton text="Create your own quiz!" theme="light"/>
                </div>
            </div>
        </section>
    )
}

export default hero