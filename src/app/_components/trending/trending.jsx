import React from 'react'
import styles from './trending.module.css'
import Tertiarybutton from '../tertiarybutton/tertiarybutton'

const trending = () => {
  return (
    <section className={styles.trending}>
      <div className={styles.titlebar}>
        <h2 className={styles.title}>Trending quizzes</h2>
        <div className={styles.button}>
          <Tertiarybutton text="View more" theme="dark" />
        </div>
      </div>
      <div className={styles.list}>
        quizzes list
      </div>
    </section>
  )
}

export default trending