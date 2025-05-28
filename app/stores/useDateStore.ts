import { create } from 'zustand'

interface DateStoreState {
  year: number
  month: number
  changeDate: (params: { year?: number; month?: number }) => void
}

const now = new Date()

export const useDateStore = create<DateStoreState>((set) => ({
  year: now.getFullYear(),
  month: now.getMonth() + 1,
  changeDate(params) {
    set((prev) => ({
      ...prev,
      ...(params.year !== undefined && { year: params.year }),
      ...(params.month !== undefined && { month: params.month }),
    }))
  },
}))
