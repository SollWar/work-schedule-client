import { useEffect, useState } from 'react'
import { fetchWithAuth } from '../utils/fetchTyped'
import { useMainStore } from '../stores/mainStore'

export const useTelegramAuth = () => {
  const [telegramInitData, setTelegramInitData] = useState('')
  const { authString, setAuthString } = useMainStore()

  useEffect(() => {
    const importWebApp = async () => {
      const { default: WebApp } = await import('@twa-dev/sdk')

      WebApp.ready()
      WebApp.expand()

      setTelegramInitData(WebApp.initData)
    }

    if (typeof window !== 'undefined') {
      importWebApp()
    }
  }, [])

  useEffect(() => {
    if (telegramInitData !== '' && authString === '') {
      telegramAuth()
    }
  }, [telegramInitData, authString])

  const telegramAuth = async () => {
    try {
      const result = await fetchWithAuth<string>(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/login/telegram`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            initData: telegramInitData,
          }),
        }
      )
      setAuthString(result)
    } catch (e) {
      setAuthString('none')
      console.log(e)
    }
  }

  return { telegramInitData }
}
