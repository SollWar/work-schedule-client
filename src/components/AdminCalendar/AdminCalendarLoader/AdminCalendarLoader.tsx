'use client'

import React from 'react'

import styles from './AdminCalendarLoader.module.css'

interface LoaderProps {
  workplaceCount: number
}

export const AdminCalendarLLoader = ({ workplaceCount }: LoaderProps) => {
  const loaders = new Array(workplaceCount).fill(0)

  return (
    <div className={styles.main}>
      {loaders.map((_, index) => (
        <div key={`loader_${index}`} className={styles.card}></div>
      ))}
    </div>
  )
}
