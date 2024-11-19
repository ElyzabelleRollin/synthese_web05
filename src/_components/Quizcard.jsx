import React from 'react'
import Link from 'next/link'
import styles from './Quizcard.module.css'

const Quizcard = async ({cardkey, title, description, link}) => {
  return (
    <div className={styles.card} key={cardkey}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        <Link href={link} className={styles.link}>Play Now!</Link>
    </div>
  )
}

export default Quizcard