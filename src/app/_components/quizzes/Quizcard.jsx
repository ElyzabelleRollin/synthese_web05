import React from 'react'
import Link from 'next/link'
import styles from './Quizcard.module.css'

const Quizcard = ({quiz}) => {
  return (
    <div className={styles.card}>
        <h2 className={styles.title}>{quiz.name}</h2>
        <p className={styles.description}>{quiz.description}</p>
        <Link href={`/application/quizzes/${quiz.slug}`} className={styles.link}>Play Now!</Link>
    </div>
  )
}

export default Quizcard