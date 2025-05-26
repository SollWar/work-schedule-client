'use client'
import { getContrastTextColor } from '@/app/utils/colorsUtils'
import { CalendarEntities } from '../Calendar/Calendar'
import { useEffect, useState } from 'react'
import { BottomBarLoader } from './BottomBarLoader/BottomBarLoader'

export interface BottomBarEntities extends CalendarEntities {
  count: number
}

interface BottomBarProps {
  entities: BottomBarEntities[]
}

export const BottomBar = ({ entities }: BottomBarProps) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (entities.length > 0) {
      setIsVisible(true)
    }
  }, [entities])

  return (
    <div className="relative">
      <div
        className={`transition-opacity duration-400 ease-in-out ${
          isVisible ? 'opacity-100' : 'opacity-50 pointer-events-none'
        }`}
      >
        <div className="grid grid-cols-2 gap-2">
          {entities.map((val, ind) => (
            <div
              key={ind}
              style={{
                background: val.color,
                color: getContrastTextColor(val.color),
              }}
              className="flex flex-row items-center justify-between text-xl h-12 p-2 rounded-[6px]"
            >
              <div>{val.name}</div>
              <div>{val.count}</div>
            </div>
          ))}
        </div>
      </div>
      {!isVisible && (
        <div className="absolute inset-0">
          <BottomBarLoader />
        </div>
      )}
    </div>
  )
}
