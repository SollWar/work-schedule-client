'use client'
import { useEffect, useState } from 'react'
import { Calendar } from './components/Calendar/Calendar'
import { TopBar } from './components/TopBar/TopBar'
import { useMainStore } from './stores/useMainStore'

export default function Home() {
  const [loading, setLoading] = useState(true)
  const { mainData, mainStoreInit } = useMainStore()

  useEffect(() => {
    mainStoreInit('2')
  }, [])

  useEffect(() => {
    if (mainData) {
      setLoading(false)
    }
  }, [mainData])

  return (
    <>
      {loading ? (
        'LOADING...'
      ) : (
        <div>
          <TopBar />
          <div className="px-1">
            <Calendar />
          </div>
        </div>
      )}
    </>
  )
}
