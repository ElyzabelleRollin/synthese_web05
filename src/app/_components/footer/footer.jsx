import React from 'react'
import styles from './footer.module.css'
import { logout } from "../../_actions/auth";

const footer = () => {
  return (
    <div className={styles.footer}>
        <div className={styles.logo}>
          This is the logo
        </div>
        <div className={styles.copyright}>
          Copyright © 2024 Hoothoot | All rights reserved
        </div>
    </div>
  )
}

export default footer