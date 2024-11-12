import React from 'react'
import styles from './header.module.css'
import { logout } from "../../_actions/auth";

const header = () => {
  return (
    <div className={styles.header}>
        <form action={logout}>
          <button className="bg-gray-400 p-2"> Logout</button>
        </form>
    </div>
  )
}

export default header