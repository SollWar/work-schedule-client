import { Schedule, ScheduleType } from '../types/Schedule'
import { Workplace } from '../types/Workplace'
import { Worker } from '../types/Worker'
import fetchTyped from '../utils/fetchTyped'
import { getDaysInMonth } from '../utils/dateUtils'

export const fetchSchedule = async (
  type: ScheduleType,
  id: string,
  year: number,
  month: number
): Promise<{
  schedule?: Schedule
  selected?: Worker | Workplace
  entities?: Worker[] | Workplace[]
  error?: string
}> => {
  if (type === 'worker') {
    try {
      const [schedule, selected, entities] = await Promise.all([
        fetchTyped<Schedule>(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/schedule/worker?worker_id=${id}&year=${year}&month=${month}`
        ),
        fetchTyped<Worker>(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/worker/?id=${id}`
        ),
        fetchTyped<Workplace[]>(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/workplace/user?worker_id=${id}`
        ),
      ])

      return {
        schedule,
        selected,
        entities,
      }
    } catch (e) {
      return {
        error: String(e),
      }
    }
  } else if (type === 'workplace') {
    try {
      const [schedules, selected, entities] = await Promise.all([
        fetchTyped<Schedule[]>(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/schedule/workplace?workplace_id=${id}&year=${year}&month=${month}`
        ),
        fetchTyped<Workplace>(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/workplace/?id=${id}`
        ),
        fetchTyped<Workplace[]>(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/worker/workplace?workplace_id=${id}`
        ),
      ])

      const scheduleList: string[] = new Array(
        getDaysInMonth(year, month)
      ).fill('0')

      const daysInMonth = getDaysInMonth(year, month)
      const scheduleMap = schedules.map((val) => ({
        workerId: val.worker_id,
        days: val.schedule.split(','),
      }))

      const conflictDays = new Set<number>()

      for (let i = 0; i < daysInMonth; i++) {
        let foundWorkerId: string | null = null
        let hasConflict = false

        for (const { workerId, days } of scheduleMap) {
          if (days[i] !== '0' && days[i] === id) {
            if (foundWorkerId === null) {
              foundWorkerId = workerId
            } else if (foundWorkerId !== workerId) {
              hasConflict = true
              break
            }
          }
        }

        if (hasConflict) {
          conflictDays.add(i)
          scheduleList[i] = 'X'
        } else if (foundWorkerId) {
          scheduleList[i] = foundWorkerId
        }
      }

      const schedule: Schedule = {
        worker_id: selected.id,
        schedule: scheduleList.join(),
        year,
        month,
      }

      return { schedule, selected, entities }
    } catch (e) {
      return { error: String(e) }
    }
  }
  return { error: 'Что-то пошло не так' }
}
