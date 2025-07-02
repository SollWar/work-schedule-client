import { useEffect } from 'react'
import { useDateStore } from '../stores/dateStore'
import { useScheduleStore } from '../stores/scheduleStore'

export const useDateDropDown = (dateType: 'year' | 'month') => {
  const { year, month, currentMonth, currentYear, changeDate } = useDateStore()
  const { getSchedule, type, schedule_id, currentSelected } = useScheduleStore()

  useEffect(() => {
    if (currentSelected?.id === 'admin') {
      changeDate({ year: currentYear, month: currentMonth })
    }
  }, [currentSelected])

  const selectDate = (val: number) => {
    if (dateType === 'year') {
      changeDate({ year: val })
      getSchedule(type, schedule_id, val, month)
    } else {
      changeDate({ month: val })
      getSchedule(type, schedule_id, year, val)
    }
  }

  return { year, month, selectDate }
}
