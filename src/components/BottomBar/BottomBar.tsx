'use client'
import { getContrastTextColor } from '@/src/utils/colorsUtils'
import { BottomBarLoader } from './BottomBarLoader/BottomBarLoader'
import { Worker } from '../../types/Worker'
import { Workplace } from '@/src/types/Workplace'
import { useScheduleStore } from '@/src/stores/useScheduleStore'

interface BottomBarProps {
  entities: Worker[] | Workplace[]
  counter: Record<string, number>
}

export const BottomBar = ({ counter }: BottomBarProps) => {
  const { isLoading, entities } = useScheduleStore()

  return (
    <div className="relative">
      <div
        className={`transition-opacity duration-400 ease-in-out ${
          !isLoading ? 'opacity-100' : 'opacity-50 pointer-events-none'
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
              <div>{counter[val.id] ?? 0}</div>
            </div>
          ))}
        </div>
      </div>
      {isLoading && (
        <div className="absolute inset-0">
          <BottomBarLoader />
        </div>
      )}
    </div>
  )
}
