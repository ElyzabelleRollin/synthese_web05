import React from 'react'
import styles from './loader.module.css'

const loader = () => {
    return (
        <div className={styles.loading}>
            <div className={`${styles.loop} ${styles.cubes}`}>
                <div className={`${styles.item} ${styles.cubes}`}></div>
                <div className={`${styles.item} ${styles.cubes}`}></div>
                <div className={`${styles.item} ${styles.cubes}`}></div>
                <div className={`${styles.item} ${styles.cubes}`}></div>
                <div className={`${styles.item} ${styles.cubes}`}></div>
                <div className={`${styles.item} ${styles.cubes}`}></div>
            </div>
        </div>
    )
}

export default loader