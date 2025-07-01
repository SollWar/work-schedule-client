import { useEffect, useState } from 'react'
import fetchTyped from '../utils/fetchTyped'

export const useTelegramAuth = () => {
  const [telegramInitData, setTelegramInitData] = useState('')
  const [telegramId, setTelegramId] = useState('')

  useEffect(() => {
    // setTelegramInitData('6376611308')
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
    if (telegramInitData !== '') {
      telegramAuth()
    }
  }, [telegramInitData])

  const telegramAuth = async () => {
    try {
      const result = await fetchTyped<string>(
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

      setTelegramId(result)
    } catch (e) {
      console.log(e)
    }
  }

  return { telegramId, telegramInitData }
}
