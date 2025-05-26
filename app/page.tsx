'use client'
import { useEffect, useState } from 'react'
import { Calendar, CalendarEntities } from './Components/Calendar/Calendar'
import { calendarMoke } from './Components/moke/calendar'
import { TopBar } from './Components/TopBar/TopBar'
import { BottomBar, BottomBarEntities } from './Components/BottomBar/BottomBar'
import { mokeBottomBarEntities } from './Components/moke/bottomBar'

export default function Home() {
  const [calendarEntities, setCalendarEntities] = useState<CalendarEntities[]>(
    []
  )
  const [bottomBarEntities, setBottomBarEntities] = useState<
    BottomBarEntities[]
  >([])
  useEffect(() => {
    const timeout = setTimeout(() => {
      setBottomBarEntities(mokeBottomBarEntities)
      setCalendarEntities([
        { id: '1', name: 'Никита', color: '#4CAF50' },
        { id: '2', name: 'Дима', color: '#3F3030' },
      ])
    }, 2000)

    return () => clearTimeout(timeout)
  }, [])

  return (
    <>
      <TopBar />
      <div className="px-1">
        <Calendar
          year={calendarMoke.year}
          month={calendarMoke.month}
          entities={calendarEntities}
          schedule={calendarMoke.schedule}
        />
      </div>
      <div className="p-1">
        <BottomBar entities={bottomBarEntities} />
      </div>
    </>
  )
}
