import { create } from 'zustand'

interface CounterStoreState {
  counter: Record<string, number>
  calcCounter: (scheduleList: string[]) => void
}

export const useCounterStore = create<CounterStoreState>((set) => ({
  counter: {},
  calcCounter(scheduleList) {
    const counter: Record<string, number> = {}
    scheduleList.forEach((item) => {
      counter[item] = (counter[item] || 0) + 1
    })
    set({
      counter,
    })
  },
}))
