import { useEffect, useState } from 'react'
import fetchTyped from '../utils/fetchTyped'

export const useTelegramAuth = () => {
  const [telegramInitData, setTelegramInitData] = useState('')
  const [telegramId, setTelegramId] = useState('')

  useEffect(() => {
    setTelegramInitData('6376611308')
    // const importWebApp = async () => {
    //   const { default: WebApp } = await import('@twa-dev/sdk')

    //   WebApp.ready()
    //   WebApp.expand()

    //   setTelegramInitData(WebApp.initData)
    // }

    // if (typeof window !== 'undefined') {
    //   importWebApp()
    // }
  }, [])

  useEffect(() => {
    if (telegramInitData !== '') {
      telegramAuth()
    }
  }, [telegramInitData])

  const telegramAuth = async () => {
    const result = await fetchTyped<string>(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/tAuth/?initData=${telegramInitData}`
    )

    setTelegramId(result)
  }

  return { telegramId }
}
