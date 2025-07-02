import { useEffect } from 'react'
import { useDateStore } from '../stores/useDateStore'
import { useScheduleStore } from '../stores/useScheduleStore'
import { useSchedule } from './useSchedule'

export const useDateDropDown = (dateType: 'year' | 'month') => {
  const { year, month, currentMonth, currentYear, changeDate } = useDateStore()
  const { getSchedule, type, schedule_id, currentSelected } = useScheduleStore()
  const { getScheduleState } = useSchedule()

  useEffect(() => {
    if (currentSelected?.id === 'admin') {
      changeDate({ year: currentYear, month: currentMonth })
    }
  }, [currentSelected])

  const selectDate = (val: number) => {
    if (dateType === 'year') {
      changeDate({ year: val })
      getSchedule(type, schedule_id, val, month, getScheduleState)
    } else {
      changeDate({ month: val })
      getSchedule(type, schedule_id, year, val, getScheduleState)
    }
  }

  return { year, month, selectDate }
}
