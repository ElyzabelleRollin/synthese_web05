import React from 'react'
import styles from './fiftyfifty.module.css'
import PrimaryButton from '../primarybutton/primarybutton'
import SecondaryButton from '../secondarybutton/secondarybutton'

const fiftyfifty = ({ type, title, text, img }) => {
  return (
    <section className={styles.fiftyfifty}>
      {type === "right" ? (
        <img src={img} alt="" className={styles.img} />
      ) : (
        <></>
      )}
      <div className={styles.contentcontainer}>
        <div className={styles.content}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.text}>{text}</p>
          <div className={styles.buttons}>
            <PrimaryButton text="Find a quiz" iconright="ArrowRight" theme="light" link="/application/quizzes"/>
            <SecondaryButton text="Create your account" theme="light" link={"/auth/login"}/>
          </div>
        </div>
      </div>
      {type === "left" ? (
        <img src={img} alt="" className={styles.img} />
      ) : (
        <></>
      )}
    </section>
  )
}

export default fiftyfifty