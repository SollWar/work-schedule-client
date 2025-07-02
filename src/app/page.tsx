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
  const { mainData, mainStoreInit, telegramId } = useMainStore()
  const { telegramInitData } = useTelegramAuth()
  const { currentSelected } = useScheduleStore()
  const [loading, setLoading] = useState(mainData === null)

  useEffect(() => {
    if (telegramInitData !== '') {
      mainStoreInit()
    }
    if (telegramId === 'none') {
      toast('Пользователь не найден')
    }
  }, [telegramId, telegramInitData])

  useEffect(() => {
    if (mainData) {
      setLoading(false)
    }
  }, [mainData])

  if (loading)
    return (
      <div className={styles.main}>
        <div className={styles.body}>
          {telegramId === 'none' ? (
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
