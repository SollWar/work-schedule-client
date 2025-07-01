import { create } from 'zustand'
import fetchTyped from '../utils/fetchTyped'
import { Schedule } from '../types/Schedule'
import { getDaysInMonth } from '../utils/dateUtils'
import { Workplace } from '../types/Workplace'
import { Worker } from '../types/Worker'

interface ScheduleStoreState {
  scheduleList: string[]
  entities: Worker[] | Workplace[]
  currentSelected: Worker | Workplace | null
  isLoading: boolean
  type: 'worker' | 'workplace'
  schedule_id: string
  updatingSchedule: () => void
  setSchedule: (schedule: string[]) => void
  getSchedule: (
    type: 'worker' | 'workplace',
    id: string,
    year: number,
    month: number
  ) => void
}

export const useScheduleStore = create<ScheduleStoreState>((set) => ({
  entities: [],
  currentSelected: null,
  scheduleList: [],
  isLoading: true,
  type: 'worker',
  schedule_id: '',
  updatingSchedule() {
    set({ isLoading: true, scheduleList: [], entities: [] })
  },
  setSchedule(schedule) {
    set((prev) => ({
      ...prev,
      scheduleList: schedule,
    }))
  },
  async getSchedule(type, id, year, month) {
    set({
      isLoading: true,
      scheduleList: [],
      entities: [],
      schedule_id: '',
      currentSelected: null,
    })
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

        if (schedule.schedule !== '') {
          set({
            schedule_id: id,
            scheduleList: schedule.schedule.split(','),
            type: 'worker',
            entities: entities,
            currentSelected: selected,
            isLoading: false,
          })
        } else {
          set({
            schedule_id: id,
            scheduleList: new Array(getDaysInMonth(year, month)).fill('0'),
            type: 'worker',
            entities: entities,
            currentSelected: selected,
            isLoading: false,
          })
        }
      } catch {
        set({ isLoading: false })
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
        const schedule: string[] = new Array(getDaysInMonth(year, month)).fill(
          '0'
        )

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
            schedule[i] = 'X'
          } else if (foundWorkerId) {
            schedule[i] = foundWorkerId
          }
        }
        set({
          schedule_id: id,
          type: 'workplace',
          entities: entities,
          currentSelected: selected,
          scheduleList: schedule,
          isLoading: false,
        })
      } catch {
        set({ isLoading: false })
      }
    }
  },
}))
