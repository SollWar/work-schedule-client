import { create } from 'zustand'
import { getDaysInMonth } from '../utils/dateUtils'
import { Workplace } from '../types/Workplace'
import { Worker } from '../types/Worker'
import { ScheduleType } from '../types/Schedule'
import { fetchSchedule } from '../utils/fetchSchedule'

interface AdminSchedule {
  scheduleList: string[]
  entities: Worker[]
  selected: Workplace
}

interface ScheduleStoreState {
  scheduleList: string[]
  entities: Worker[] | Workplace[]
  currentSelected: Worker | Workplace | null
  isLoading: boolean
  type: ScheduleType
  schedule_id: string
  updatingSchedule: () => void
  setSchedule: (schedule: string[]) => void
  getSchedule: (
    type: ScheduleType,
    id: string,
    year: number,
    month: number
  ) => void
  adminSchedule: AdminSchedule[]
  getAdminSchedule: (
    workplaces: Workplace[],
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
  adminSchedule: [],
  updatingSchedule() {
    set({ isLoading: true, scheduleList: [], entities: [] })
  },
  setSchedule(schedule) {
    set((prev) => ({
      ...prev,
      scheduleList: schedule,
    }))
  },
  async getAdminSchedule(workplaces, year, month) {
    const adminSchedule: AdminSchedule[] = []
    const adminSelected: Worker = {
      id: 'admin',
      name: 'Все',
      color: '',
      access_id: 0,
    }
    set({
      adminSchedule: [],
      isLoading: true,
      scheduleList: [],
      entities: [],
      schedule_id: '',
      currentSelected: adminSelected,
    })

    await Promise.all(
      workplaces.map(async (value) => {
        const schedule = await fetchSchedule('workplace', value.id, year, month)

        if (schedule.schedule && schedule.entities && schedule.selected) {
          adminSchedule.push({
            scheduleList: schedule.schedule.schedule.split(','),
            entities: schedule.entities as Worker[],
            selected: schedule.selected as Workplace,
          })
        }
      })
    )

    adminSchedule.sort((a, b) => a.selected.name.localeCompare(b.selected.name))

    set({
      schedule_id: 'admin',
      adminSchedule: adminSchedule,
      currentSelected: adminSelected,
      isLoading: false,
    })
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
        const { schedule, selected, entities } = await fetchSchedule(
          type,
          id,
          year,
          month
        )

        if (schedule && schedule?.schedule !== '') {
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
        const { schedule, selected, entities } = await fetchSchedule(
          type,
          id,
          year,
          month
        )

        if (schedule && schedule?.schedule !== '') {
          set({
            schedule_id: id,
            scheduleList: schedule.schedule.split(','),
            type: 'workplace',
            entities: entities,
            currentSelected: selected,
            isLoading: false,
          })
        } else {
          set({
            schedule_id: id,
            scheduleList: new Array(getDaysInMonth(year, month)).fill('0'),
            type: 'workplace',
            entities: entities,
            currentSelected: selected,
            isLoading: false,
          })
        }
      } catch {
        set({ isLoading: false })
      }
    }
  },
}))
