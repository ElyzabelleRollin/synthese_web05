import React from 'react'
import styles from './tertiarybutton.module.css'
import Link from 'next/link'

const tertiarybutton = ({ text, iconleft, iconright, theme }) => {
  const buttonClass = `${styles.tertiarybutton} ${theme ? styles[theme] : ''}`;
  
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

export default tertiarybutton