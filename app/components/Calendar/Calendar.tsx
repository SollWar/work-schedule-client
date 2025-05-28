'use client'
import { CalendarDropDown } from './CalendarDropDown'
import { getContrastTextColor } from '@/app/utils/colorsUtils'
import { CalendarLoader } from './CalendarLoader/CalendarLoader'
import { getDaysInMonth, getFirstWeekdayOfMonth } from '@/app/utils/dateUtils'
import { useDateStore } from '@/app/stores/useDateStore'
import { useScheduleStore } from '@/app/stores/useScheduleStore'
import { useScheduleEditable } from '@/app/hooks/useScheduleEditable'
import { useMemo, useState } from 'react'

export interface CalendarEntities {
  id: string
  name: string
  color: string
}

export const Calendar = () => {
  const { isLoading, scheduleList, entities } = useScheduleStore()
  const { year, month } = useDateStore()
  const [editable, setEditable] = useState(false)
  const daysInMonth = getDaysInMonth(year, month)
  const offset = getFirstWeekdayOfMonth(year, month) - 1
  const offsetArray = new Array(offset).fill(0)
  const entityMap = new Map(entities.map((e) => [e.id, e]))

  const { newSchedule, startEditing, updateDay, cancelEditing, saveChanges } =
    useScheduleEditable(daysInMonth)

  // Текущее отображаемое расписание (оригинальное или редактируемое)
  const displaySchedule = editable ? newSchedule : scheduleList

  const handleDayChange = (day: number, value: string) => {
    if (!editable) {
      startEditing(scheduleList)
      setEditable(true)
    }
    updateDay(day, value)
  }

  const handleSave = () => {
    saveChanges()
    setEditable(false)
    console.log('Saving schedule:', newSchedule)
    // Здесь можно добавить вызов API для сохранения
  }

  const handleCancel = () => {
    cancelEditing()
    setEditable(false)
  }

  return (
    <div className="relative">
      <div
        className={`transition-opacity duration-400 ease-in-out ${
          !isLoading ? 'opacity-100' : 'opacity-50 pointer-events-none'
        }`}
      >
        {displaySchedule.length > 0 ? (
          <div className="grid grid-cols-7 gap-0.5">
            {offsetArray.map((_, ind) => (
              <div
                className="bg-transparent aspect-square rounded-[6px]"
                key={`offset-${ind}`}
              />
            ))}
            {displaySchedule.map((val, ind) => (
              <div
                key={val + ind}
                className="aspect-square rounded-[6px]"
                style={{
                  background:
                    val === 'X'
                      ? 'red'
                      : entityMap.get(val)?.color ?? '#FFFFFF',
                  color:
                    val === 'X'
                      ? 'white'
                      : getContrastTextColor(
                          entityMap.get(val)?.color ?? '#FFFFFF'
                        ),
                }}
              >
                <CalendarDropDown
                  day={ind}
                  onSelectChange={handleDayChange}
                  items={entities}
                >
                  {ind + 1}
                </CalendarDropDown>
              </div>
            ))}
          </div>
        ) : (
          ''
        )}
      </div>
      {isLoading && (
        <div className=" ">
          <CalendarLoader offsetArray={offsetArray} daysInMonth={daysInMonth} />
        </div>
      )}
      {editable && (
        <div className="grid grid-cols-2 gap-2 mt-1">
          <button
            onClick={handleSave}
            className="flex flex-row text-white bg-amber-500 items-center justify-start text-xl h-12 p-2 rounded-[6px]"
          >
            Сохранить
          </button>
          <button
            onClick={handleCancel}
            className="flex flex-row text-white bg-amber-800 items-center justify-end text-xl h-12 p-2 rounded-[6px]"
          >
            Отмена
          </button>
        </div>
      )}
    </div>
  )
}
