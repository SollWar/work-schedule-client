'use client'
import { CalendarDropDown } from './CalendarDropDown'
import { getContrastTextColor } from '@/src/utils/colorsUtils'
import { CalendarLoader } from './CalendarLoader/CalendarLoader'
import { getDaysInMonth, getFirstWeekdayOfMonth } from '@/src/utils/dateUtils'
import { useDateStore } from '@/src/stores/dateStore'
import { useScheduleStore } from '@/src/stores/scheduleStore'
import { useScheduleEditable } from '@/src/hooks/useScheduleEditable'
import { useEffect, useMemo, useState } from 'react'
import { BottomBar } from '../BottomBar/BottomBar'
import { useMainStore } from '@/src/stores/mainStore'
import { useThemeStore } from '@/src/stores/themeStore'
import AcceptButton from '@/src/app/settings/components/AcceptButton'

const weekDays = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']

export const Calendar = () => {
  const { mainData } = useMainStore()
  const { isLoading, scheduleList, entities, type, schedule_id } =
    useScheduleStore()
  const { year, month } = useDateStore()
  const { themeConst } = useThemeStore()

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
      mainData?.user.access_id === 1
        ? entities
        : type === 'workplace'
        ? entities
        : entities.filter((worker) => worker.editable === 1),
    [entities, type]
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
        ? editableEntities.includes(val) || val === '0' || val === ''
        : false

    return (
      <div
        key={`${val}-${ind}`}
        className="aspect-square rounded-[6px]"
        style={{ backgroundColor, color: textColor }}
      >
        <CalendarDropDown
          enabled={mainData?.user.access_id === 1 ? true : enabled}
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
            style={{
              background: themeConst.background,
            }}
            className={`text-center text-xl rounded-[6px]`}
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
        <AcceptButton
          acceptClick={handleSave}
          cancelClick={handleCancel}
          topStyle={'grid grid-cols-2 gap-2 mt-1'}
          height={'48px'}
          disabled={false}
        />
      )}
    </div>
  )
}
