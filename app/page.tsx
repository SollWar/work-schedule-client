'use client'
import { useEffect, useState } from 'react'
import { Calendar } from './components/Calendar/Calendar'
import { TopBar } from './components/TopBar/TopBar'
import { BottomBar } from './components/BottomBar/BottomBar'
import { useMainStore } from './stores/useMainStore'
import { useScheduleStore } from './stores/useScheduleStore'

export default function Home() {
  const { scheduleList } = useScheduleStore()
  const [loading, setLoading] = useState(true)
  const [counter, setCounter] = useState<Record<string, number>>({})

  const { mainData, mainStoreInit } = useMainStore()

  useEffect(() => {
    mainStoreInit('2')
  }, [])

  useEffect(() => {
    if (mainData) {
      setLoading(false)
    }
  }, [mainData])

  useEffect(() => {
    if (scheduleList.length > 0) {
      const count: Record<string, number> = {}
      scheduleList.forEach((item) => {
        count[item] = (count[item] || 0) + 1
      })
      setCounter(count)
    } else {
      setCounter({})
    }
  }, [scheduleList])

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
          <div className="mt-1 px-1">
            <BottomBar
              counter={counter}
              entities={mainData!.availableWorkplaces}
            />
          </div>
        </div>
      )}
    </>
  )
}
