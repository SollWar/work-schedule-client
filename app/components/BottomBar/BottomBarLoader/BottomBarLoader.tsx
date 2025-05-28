import React from 'react'
import styles from './BottomBarLoader.module.css'

export const BottomBarLoader = () => {
  const loaders = new Array(2).fill(0)

  return (
    <div className={styles.main}>
      {loaders.map((_, index) => (
        <div key={`loader_${index}`} className={styles.card}></div>
      ))}
    </div>
  )
}
