export interface Schedule {
  worker_id: string
  year: number
  month: number
  schedule: string
}

export type ScheduleType = 'worker' | 'workplace' | 'admin'
