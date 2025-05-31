import { useState } from 'react'
import fetchTyped from '../utils/fetchTyped'
import { useScheduleStore } from '../stores/useScheduleStore'
import { useCounterStore } from '../stores/useCounterStore'

export const useScheduleEditable = () => {
  const { calcCounter } = useCounterStore()
  const { getSchedule, scheduleList, updatingSchedule } = useScheduleStore()
  const [newSchedule, setNewSchedule] = useState<string[]>(() => [
    ...scheduleList,
  ])

  const startEditing = (currentSchedule: string[]) => {
    setNewSchedule([...currentSchedule])
  }

  const updateDay = (dayIndex: number, value: string) => {
    setNewSchedule((prev) => {
      const updated = [...prev]
      updated[dayIndex] = value
      return updated
    })
  }

  const cancelEditing = () => {
    setNewSchedule([...scheduleList])
    calcCounter(scheduleList)
  }

  const saveChanges = async (
    type: 'worker' | 'workplace',
    id: string,
    year: number,
    month: number
  ) => {
    updatingSchedule()
    const response = await fetchTyped<boolean>(
      'http://localhost:3001/api/up_schedule',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: type,
          id: id,
          year: year.toString(),
          month: month.toString(),
          schedule: newSchedule.join(','),
        }),
      }
    )
    if (response) {
      getSchedule(type, id, year, month)
    }
  }

  return {
    newSchedule,
    startEditing,
    updateDay,
    cancelEditing,
    saveChanges,
  }
}
