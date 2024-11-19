import React from 'react'
import styles from './fiftyfifty.module.css'
import PrimaryButton from '../primarybutton/primarybutton'
import SecondaryButton from '../secondarybutton/secondarybutton'

const fiftyfifty = ({ type, title, text }) => {
  return (
    <section className={styles.fiftyfifty}>
      {type === "right" ? (
        <img src="https://placehold.co/1080x1920" alt="" className={styles.img} />
      ) : (
        <></>
      )}
      <div className={styles.contentcontainer}>
        <div className={styles.content}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.text}>{text}</p>
          <div className={styles.buttons}>
            <PrimaryButton text="Launch a quiz" theme="light"/>
            <SecondaryButton text="Create your account" theme="light"/>
          </div>
        </div>
      </div>
      {type === "left" ? (
        <img src="https://placehold.co/1080x1920" alt="" className={styles.img} />
      ) : (
        <></>
      )}
    </section>
  )
}

export default fiftyfifty