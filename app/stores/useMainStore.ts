import { create } from 'zustand'
import fetchTyped from '../utils/fetchTyped'
import { MainData } from '../types/MainData'

interface MainStoreState {
  mainData: MainData | null
  mainStoreInit: (telegram_id: string) => void
}

export const useMainStore = create<MainStoreState>((set) => ({
  mainData: null,
  async mainStoreInit(telegram_id) {
    const result = await fetchTyped<MainData>(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/main?telegram_id=${telegram_id}`
    )
    set({
      mainData: result,
    })
  },
}))
