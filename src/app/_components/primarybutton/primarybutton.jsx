import React from 'react'
import styles from './primarybutton.module.css'
import Link from 'next/link'

const primarybutton = ({ text, iconleft, iconright, theme, link }) => {
  const buttonClass = `${styles.primarybutton} ${theme ? styles[theme] : ''}`;
  if (!link) {
    link = '/'
  }

  return (
    <div className={buttonClass}>
      <Link href={link} className={styles.link}>
        {iconleft ? (
          <img src={iconleft} alt="icon" />
        ) : (
          <></>
        )}
        <p className={styles.label}>{text}</p>
        {iconright ? (
          <img src={iconright} alt="icon" />
        ) : (
          <></>
        )}
      </Link>
    </div>
  )
}

export default primarybutton