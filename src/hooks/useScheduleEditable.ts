import { useState } from 'react'
import fetchTyped from '../utils/fetchTyped'
import { useScheduleStore } from '../stores/scheduleStore'
import { ScheduleType } from '../types/Schedule'

export const useScheduleEditable = () => {
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
  }

  const saveChanges = async (
    type: ScheduleType,
    id: string,
    year: number,
    month: number
  ) => {
    updatingSchedule()
    const response = await fetchTyped<boolean>(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/schedule/update`,
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
