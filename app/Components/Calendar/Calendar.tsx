'use client'
import { CalendarDropDown } from './CalendarDropDown'
import { getContrastTextColor } from '@/app/utils/colorsUtils'
import { CalendarLoader } from './CalendarLoader/CalendarLoader'
import { getDaysInMonth, getFirstWeekdayOfMonth } from '@/app/utils/dateUtils'
import { useEffect, useState } from 'react'

export interface CalendarEntities {
  id: string
  name: string
  color: string
}

interface CalendarProps {
  year: number
  month: number
  entities: CalendarEntities[]
  schedule: string[]
}

export const Calendar = ({
  year,
  month,
  entities,
  schedule,
}: CalendarProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const daysInMonth = getDaysInMonth(year, month)
  const offset = getFirstWeekdayOfMonth(year, month) - 1
  const offsetArray = new Array(offset).fill(0)
  const entityMap = new Map<string, CalendarEntities>(
    entities.map((e) => [e.id, e])
  )

  useEffect(() => {
    if (entities.length > 0 && schedule.length > 0) {
      setIsVisible(true)
    }
  }, [entities, schedule])

  return (
    <div className="relative">
      <div
        className={`transition-opacity duration-400 ease-in-out ${
          isVisible ? 'opacity-100' : 'opacity-50 pointer-events-none'
        }`}
      >
        <div className="grid grid-cols-7 gap-0.5">
          {offsetArray.map((_, ind) => (
            <div
              className="bg-transparent aspect-square rounded-[6px]"
              key={`offset-${ind}`}
            />
          ))}
          {schedule.map((val, ind) => (
            <div
              key={val + ind}
              className="aspect-square rounded-[6px]"
              style={{
                background: entityMap.get(val)?.color ?? '#FFFFFF',
                color: getContrastTextColor(
                  entityMap.get(val)?.color ?? '#FFFFFF'
                ),
              }}
            >
              <CalendarDropDown items={entities}>{ind + 1}</CalendarDropDown>
            </div>
          ))}
        </div>
      </div>
      {!isVisible && (
        <div className="absolute inset-0">
          <CalendarLoader offsetArray={offsetArray} daysInMonth={daysInMonth} />
        </div>
      )}
    </div>
  )
}
