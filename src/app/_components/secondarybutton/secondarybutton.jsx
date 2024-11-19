import React from 'react'
import styles from './secondarybutton.module.css'
import Link from 'next/link'

const secondarybutton = ({ text, iconleft, iconright, theme }) => {
  const buttonClass = `${styles.secondarybutton} ${theme ? styles[theme] : ''}`;

  return (
    <div className={buttonClass}>
      <Link href="/" className={styles.link}>
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

export default secondarybutton