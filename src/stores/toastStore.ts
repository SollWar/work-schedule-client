import { create } from 'zustand'

interface ToastState {
  message: string | null
  show: boolean
  timeoutId: NodeJS.Timeout | null
  toast: (message: string, duration?: number) => void
  hide: () => void
}

export const useToastStore = create<ToastState>((set, get) => ({
  message: null,
  show: false,
  timeoutId: null,

  toast: (message, duration = 1500) => {
    const { timeoutId } = get()
    if (timeoutId) clearTimeout(timeoutId)

    const newTimeout = setTimeout(() => {
      set({ show: false, timeoutId: null })
    }, duration)

    set({ message, show: true, timeoutId: newTimeout })
  },

  hide: () => {
    const { timeoutId } = get()
    if (timeoutId) clearTimeout(timeoutId)
    set({ show: false, timeoutId: null })
  },
}))
