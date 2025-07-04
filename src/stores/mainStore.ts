import { create } from 'zustand'
import fetchTyped from '../utils/fetchTyped'
import { MainData } from '../types/MainData'
import { Workplace } from '../types/Workplace'
import { Worker } from '../types/Worker'
import { ScheduleType } from '../types/Schedule'

interface MainStoreState {
  mainData: MainData | null
  authString: string
  error: 'no_user' | ''
  initData: () => { selected: Worker | Workplace; type: ScheduleType }
  mainStoreInit: () => void
  setAuthString: (authString: string) => void
}

export const useMainStore = create<MainStoreState>((set, get) => ({
  mainData: null,
  authString: '',
  error: '',
  initData() {
    const currMainData = get().mainData
    const user: Worker = currMainData?.user ?? {
      id: '0',
      name: 'null',
      color: 'null',
      access_id: 1,
    }
    if (currMainData) {
      if (currMainData.availableWorkplaces.length > 1) {
        return { selected: currMainData.availableWorkers[0], type: 'worker' }
      } else if (currMainData.availableWorkplaces.length > 0) {
        return {
          selected: currMainData.availableWorkplaces[0],
          type: 'workplace',
        }
      } else {
        return {
          selected: user,
          type: 'workplace',
        }
      }
    } else
      return {
        selected: user,
        type: 'workplace',
      }
  },
  setAuthString(authString) {
    set((prev) => ({
      ...prev,
      authString,
    }))
  },
  async mainStoreInit() {
    try {
      const result = await fetchTyped<MainData>(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/main`,
        {
          headers: {
            Authorization: get().authString,
          },
        }
      )
      set((prev) => ({
        ...prev,
        mainData: null,
      }))
      set((prev) => ({
        ...prev,
        mainData: result,
      }))
    } catch {
      set((prev) => ({
        ...prev,
        mainData: null,
        error: 'no_user',
      }))
    }
  },
}))
