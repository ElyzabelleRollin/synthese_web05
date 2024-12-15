import React from 'react'
import styles from './hero.module.css'
import PrimaryButton from '../primarybutton/primarybutton'
import SecondaryButton from '../secondarybutton/secondarybutton'
import { createClient } from '@/app/_lib/supabase/server'

const hero = async () => {
    const supabase = createClient();

    //Get the user
    const {
        data: { user },
    } = await supabase.auth.getUser();

    //fetch the xp from the profile of the user
    const { data: profile, error } = await supabase
        .from('profiles')
        .select('xp')
        .eq('id', user.id)
        .single();

    return (
        <section className={styles.hero}>
            <img src="https://utfs.io/f/OJp1c0WpBPn0qcaEMohVeiQAv6hO9UoGC0PMpsbXZKn1Wzfk" alt="hero background" className={styles.herobg} />
            <div className={styles.content}>
                <h1 className={styles.title}>Interactive Quizzes, Unlimited Fun!</h1>
                <p className={styles.text}>Engage with exciting, real-time quizzes designed to bring people together. Whether you're at home, in the classroom, or hosting a virtual event, our platform offers endless possibilities to learn, connect, and compete. Create your own custom quizzes, explore trending topics, or challenge friends and family to see who comes out on top.</p>
                <div className={styles.buttons}>
                    <PrimaryButton text="Find a quiz" iconright="ArrowRight" theme="light" link="/application/quizzes" />
                    {/* Only users with 1000 xp or more can see the create quiz button */}
                    {profile.xp >= 1000 ? <SecondaryButton text="Create your own quiz!" iconright="ArrowRight" theme="light" link={"/application/quizzes/create"} /> : null}
                </div>
            </div>
        </section>
    )
}

export default hero