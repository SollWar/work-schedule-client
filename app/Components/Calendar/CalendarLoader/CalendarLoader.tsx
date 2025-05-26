'use client'

import React from 'react'

import styles from './CalendarLoader.module.css'

interface LoaderProps {
  daysInMonth: number
  offsetArray: number[]
}

export const CalendarLoader = ({ daysInMonth, offsetArray }: LoaderProps) => {
  const loaders = new Array(daysInMonth).fill(0)

  return (
    <div className={styles.main}>
      {offsetArray.map((_, index) => (
        <div key={`fake_loader_${index}`}></div>
      ))}
      {loaders.map((_, index) => (
        <div key={`loader_${index}`} className={styles.card}></div>
      ))}
    </div>
  )
}
