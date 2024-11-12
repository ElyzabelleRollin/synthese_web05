import React from 'react'
import styles from './fiftyfifty.module.css'
import PrimaryButton from '../primarybutton/primarybutton'
import SecondaryButton from '../secondarybutton/secondarybutton'

const fiftyfifty = ({ type }) => {
  return (
    <section className={styles.fiftyfifty}>
      {type === "right" ? (
        <img src="https://placehold.co/1080x1920" alt="" className={styles.img} />
      ) : (
        <></>
      )}
      <div className={styles.contentcontainer}>
        <div className={styles.content}>
          <h2 className={styles.title}>Lorem ipsum</h2>
          <p className={styles.text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet animi inventore et cum eum dolorem, perspiciatis voluptatum illum porro quis.</p>
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