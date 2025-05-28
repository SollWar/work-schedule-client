import { useState } from 'react'

export const useScheduleEditable = (daysInMonth: number) => {
  const [oldSchedule, setOldSchedule] = useState<string[]>(() =>
    new Array(daysInMonth).fill('0')
  )
  const [newSchedule, setNewSchedule] = useState<string[]>(() => [
    ...oldSchedule,
  ])

  const startEditing = (currentSchedule: string[]) => {
    setOldSchedule(currentSchedule)
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
    setNewSchedule([...oldSchedule])
  }

  const saveChanges = () => {
    setOldSchedule([...newSchedule])
  }

  return {
    newSchedule,
    oldSchedule,
    startEditing,
    updateDay,
    cancelEditing,
    saveChanges,
  }
}
