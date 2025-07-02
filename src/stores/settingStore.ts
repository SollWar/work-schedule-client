import { create } from 'zustand'

interface SettingStoreState {
  requestsListOpen: boolean
  workersListOpen: boolean
  workplacesListOpen: boolean
  setListOpen: (
    type: 'requestsListOpen' | 'workersListOpen' | 'workplacesListOpen',
    value: boolean
  ) => void
}

export const useSettingStore = create<SettingStoreState>((set) => ({
  requestsListOpen: false,
  workersListOpen: false,
  workplacesListOpen: false,
  setListOpen(type, value) {
    set((prev) => ({
      ...prev,
      [type]: value,
    }))
  },
}))
