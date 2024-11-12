import { oauthSigninAction } from "@/app/_actions/auth";
import React from 'react'
import styles from './loginform.module.css'

const loginform = () => {
    return (
        <section className={styles.loginformcontainer}>
            <div className={styles.form}>
                <h1 className={styles.title}>Login to your account</h1>
                <form>
                    <input type="email" name="email" placeholder="Name" className={styles.input} />
                    <input type="password" name="password" placeholder="Email" className={styles.input}/>
                    <button className={styles.emailloginbtn}>Login with email</button>
                </form>
                <form >
                    <button>Create your account with an email</button>
                </form>
                <form action={oauthSigninAction}>
                    <button>Login with Github</button>
                </form>
            </div>
        </section>
    )
}

export default loginform