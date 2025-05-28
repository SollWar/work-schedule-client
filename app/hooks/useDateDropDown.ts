import { useEffect } from 'react'
import { useDateStore } from '../stores/useDateStore'
import { useMainStore } from '../stores/useMainStore'
import { useScheduleStore } from '../stores/useScheduleStore'

export const useDateDropDown = (type: 'year' | 'month') => {
  const { mainData } = useMainStore()
  const { year, month, changeDate } = useDateStore()
  const { getSchedule } = useScheduleStore()

  useEffect(() => {
    getSchedule('worker', mainData!.user.id, year, month)
  }, [])

  const selectDate = (val: number) => {
    if (type === 'year') {
      changeDate({ year: val })
      getSchedule('worker', mainData!.user.id, val, month)
    } else {
      changeDate({ month: val })
      getSchedule('worker', mainData!.user.id, year, val)
    }
  }

  return { year, month, selectDate }
}
