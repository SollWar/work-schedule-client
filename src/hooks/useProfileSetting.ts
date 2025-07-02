import { useEffect, useState } from 'react'
import { useMainStore } from '../stores/mainStore'
import { TelegramAuth } from '../types/Worker'
import fetchTyped from '../utils/fetchTyped'

export const useProfileSetting = () => {
  const { mainData } = useMainStore()
  const [telegramIds, setTelegramIds] = useState<TelegramAuth[]>([])

  const initSettingData = async () => {
    if (mainData) {
      const result = await fetchTyped<TelegramAuth[]>(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/telegram?id=${mainData?.user.id}`
      )
      setTelegramIds(result)
    }
  }

  useEffect(() => {
    initSettingData()
  }, [mainData])

  return {
    telegramIds,
  }
}
