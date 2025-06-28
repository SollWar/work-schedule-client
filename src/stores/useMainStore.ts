import { create } from 'zustand'
import fetchTyped from '../utils/fetchTyped'
import { MainData } from '../types/MainData'

interface MainStoreState {
  mainData: MainData | null
  telegramId: string | null
  mainStoreInit: () => void
  setTelegramId: (telegramId: string) => void
  reloadMainStore: () => Promise<void>
}

export const useMainStore = create<MainStoreState>((set) => ({
  mainData: null,
  telegramId: null,
  setTelegramId(telegramId) {
    set({
      telegramId: telegramId,
    })
  },
  async reloadMainStore() {
    const result = await fetchTyped<MainData>(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/main`
    )
    set({
      mainData: null,
    })
    set({
      mainData: result,
    })
  },
  async mainStoreInit() {
    const result = await fetchTyped<MainData>(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/main`
    )
    set({
      mainData: result,
    })
  },
}))
