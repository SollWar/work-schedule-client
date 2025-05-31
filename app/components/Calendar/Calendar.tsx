'use client'
import { CalendarDropDown } from './CalendarDropDown'
import { getContrastTextColor } from '@/app/utils/colorsUtils'
import { CalendarLoader } from './CalendarLoader/CalendarLoader'
import { getDaysInMonth, getFirstWeekdayOfMonth } from '@/app/utils/dateUtils'
import { useDateStore } from '@/app/stores/useDateStore'
import { useScheduleStore } from '@/app/stores/useScheduleStore'
import { useScheduleEditable } from '@/app/hooks/useScheduleEditable'
import { useEffect, useMemo, useState } from 'react'
import { BottomBar } from '../BottomBar/BottomBar'
import { useMainStore } from '@/app/stores/useMainStore'

const weekDays = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']

export const Calendar = () => {
  const { mainData } = useMainStore()
  const { isLoading, scheduleList, entities, type, schedule_id } =
    useScheduleStore()
  const { year, month } = useDateStore()

  const [editable, setEditable] = useState(false)
  const [counter, setCounter] = useState<Record<string, number>>({})

  const { newSchedule, startEditing, updateDay, cancelEditing, saveChanges } =
    useScheduleEditable()

  const editableEntities = useMemo(
    () =>
      entities
        .filter((worker) => worker.editable === 1)
        .map((worker) => worker.id),
    [entities]
  )
  const entitiesForDropDown = useMemo(
    () =>
      type === 'workplace'
        ? entities
        : entities.filter((worker) => worker.editable === 1),
    [entities]
  )
  const daysInMonth = useMemo(() => getDaysInMonth(year, month), [year, month])
  const offset = useMemo(
    () => getFirstWeekdayOfMonth(year, month) - 1,
    [year, month]
  )
  const offsetArray = useMemo(() => new Array(offset).fill(0), [offset])
  const entityMap = useMemo(
    () => new Map(entities.map((e) => [e.id, e])),
    [entities]
  )
  const displaySchedule = useMemo(
    () => (editable ? newSchedule : scheduleList),
    [editable, newSchedule, scheduleList]
  )

  useEffect(() => {
    const newCounter = displaySchedule.reduce((acc, item) => {
      acc[item] = (acc[item] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    setCounter(newCounter)
  }, [displaySchedule])

  const handleDayChange = async (day: number, value: string) => {
    if (!editable) {
      startEditing(scheduleList)
      setEditable(true)
    }
    updateDay(day, value)
    console.log(day, value)
  }

  const handleSave = () => {
    saveChanges(type, schedule_id, year, month)
    setEditable(false)
  }

  const handleCancel = () => {
    cancelEditing()
    setEditable(false)
  }

  const renderCalendarDay = (val: string, ind: number) => {
    const backgroundColor =
      val === 'X' ? 'red' : entityMap.get(val)?.color ?? '#FFFFFF'
    const textColor =
      val === 'X' ? 'white' : getContrastTextColor(backgroundColor)
    const userId = mainData?.user.id ?? ''
    const enabled =
      type === 'workplace'
        ? editableEntities.includes(userId)
        : type === 'worker'
        ? editableEntities.includes(val) || val === '0'
        : false

    return (
      <div
        key={`${val}-${ind}`}
        className="aspect-square rounded-[6px]"
        style={{ backgroundColor, color: textColor }}
      >
        <CalendarDropDown
          enabled={enabled}
          day={ind}
          onSelectChange={handleDayChange}
          items={entitiesForDropDown}
        >
          {ind + 1}
        </CalendarDropDown>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-7 gap-0.5 mb-0.5">
        {weekDays.map((day, index) => (
          <div
            key={index}
            className="text-center text-xl bg-amber-200 rounded-[6px]"
          >
            {day}
          </div>
        ))}{' '}
      </div>
      <div
        className={`transition-opacity duration-400 ease-in-out ${
          isLoading ? 'opacity-50 pointer-events-none' : 'opacity-100'
        }`}
      >
        {displaySchedule.length > 0 && (
          <div className="grid grid-cols-7 gap-0.5">
            {offsetArray.map((_, ind) => (
              <div
                className="bg-transparent aspect-square rounded-[6px]"
                key={`offset-${ind}`}
              />
            ))}
            {displaySchedule.map(renderCalendarDay)}
          </div>
        )}
      </div>

      {isLoading && (
        <CalendarLoader offsetArray={offsetArray} daysInMonth={daysInMonth} />
      )}

      <div className="mt-1">
        <BottomBar
          counter={counter}
          entities={mainData?.availableWorkplaces ?? []}
        />
      </div>

      {editable && (
        <div className="grid grid-cols-2 gap-2 mt-1">
          <button
            onClick={handleSave}
            className="flex text-white bg-amber-500 items-center justify-start text-xl h-12 p-2 rounded-[6px]"
          >
            Сохранить
          </button>
          <button
            onClick={handleCancel}
            className="flex text-white bg-amber-800 items-center justify-end text-xl h-12 p-2 rounded-[6px]"
          >
            Отмена
          </button>
        </div>
      )}
    </div>
  )
}
