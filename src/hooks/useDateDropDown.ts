import { useDateStore } from '../stores/useDateStore'
import { useScheduleStore } from '../stores/useScheduleStore'

export const useDateDropDown = (dateType: 'year' | 'month') => {
  const { year, month, changeDate } = useDateStore()
  const { getSchedule, type, schedule_id } = useScheduleStore()

  // useEffect(() => {
  //   getSchedule(type, mainData!.user.id, year, month)
  // }, [])

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
