/* eslint-disable @next/next/no-img-element */
'use client'
import { useEffect, useState } from 'react'
import { Calendar } from '../components/Calendar/Calendar'
import { TopBar } from '../components/TopBar/TopBar'
import { useMainStore } from '../stores/mainStore'
import { useSystemTheme } from '../hooks/useSystemTheme'
import styles from './page.module.css'
import { useTelegramAuth } from '../hooks/useTelegramAuth'
import { useThemeStore } from '../stores/themeStore'
import { useToastStore } from '../stores/toastStore'
import RequestPage from './components/RequestPage/RequestPage'
import { useScheduleStore } from '../stores/scheduleStore'
import AdminCalendar from '../components/AdminCalendar/AdminCalendar'

export default function Home() {
  useSystemTheme()
  const { toast } = useToastStore()
  const { themeConst } = useThemeStore()
  const { mainData, mainStoreInit, telegramId, error } = useMainStore()
  const { telegramInitData } = useTelegramAuth()
  const { currentSelected } = useScheduleStore()
  const [loading, setLoading] = useState(mainData === null)

  useEffect(() => {
    if (telegramInitData !== '' && telegramId !== '') {
      mainStoreInit()
    }
  }, [telegramId, telegramInitData])

  useEffect(() => {
    if (error === 'no_user') {
      toast('Пользователь не найден')
    }
  }, [error])

  useEffect(() => {
    if (mainData && telegramId !== '') {
      setLoading(false)
    }
  }, [mainData, telegramId])

  if (loading)
    return (
      <div className={styles.main}>
        <div className={styles.body}>
          {error === 'no_user' ? (
            <RequestPage />
          ) : (
            <div>
              <img
                src="/icon.png"
                alt="Иконка приложения"
                width={128}
                height={128}
              />
              <div className={styles.loader}></div>
            </div>
          )}
        </div>
      </div>
    )
  else
    return (
      <div className={`bg-[${themeConst.background}]`}>
        <TopBar />
        <div className={'px-1'}>
          {currentSelected?.id === 'admin' ? <AdminCalendar /> : <Calendar />}
        </div>
      </div>
    )
}
