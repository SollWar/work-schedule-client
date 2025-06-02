'use client'
import { useEffect, useState } from 'react'
import { Calendar } from './components/Calendar/Calendar'
import { TopBar } from './components/TopBar/TopBar'
import { useMainStore } from './stores/useMainStore'

export default function Home() {
  const { mainData, mainStoreInit } = useMainStore()
  const [loading, setLoading] = useState(mainData === null)

  useEffect(() => {
    mainStoreInit('1')
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
