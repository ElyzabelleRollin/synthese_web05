import React from 'react'
import styles from './tertiarybutton.module.css'
import Link from 'next/link'

const tertiarybutton = ({ text, iconleft, iconright, theme, link }) => {
  const buttonClass = `${styles.tertiarybutton} ${theme ? styles[theme] : ''}`;
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

export default tertiarybutton