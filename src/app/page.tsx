'use client'
import { useEffect, useState } from 'react'
import { Calendar } from '../components/Calendar/Calendar'
import { TopBar } from '../components/TopBar/TopBar'
import { useMainStore } from '../stores/useMainStore'
import { useSystemTheme } from '../hooks/useSystemTheme'
import Image from 'next/image'
import styles from './page.module.css'
import { useTelegramAuth } from '../hooks/useTelegramAuth'
import { useThemeStore } from '../stores/useThemeStore'

export default function Home() {
  useSystemTheme()
  const { themeConst } = useThemeStore()
  const { mainData, mainStoreInit } = useMainStore()
  const { telegramId } = useTelegramAuth()
  const [loading, setLoading] = useState(mainData === null)

  useEffect(() => {
    if (telegramId !== '') {
      mainStoreInit()
    }
  }, [telegramId])

  useEffect(() => {
    if (mainData) {
      setLoading(false)
    }
  }, [mainData])

  if (loading)
    return (
      <div className={styles.main}>
        <div className={styles.body}>
          <Image
            src="/icon.png"
            alt="Иконка приложения"
            width={128}
            height={128}
            priority={true}
          />
          <div className={styles.loader}></div>
          {/* <div className={styles.error_message}>{authResult}</div> */}
        </div>
      </div>
    )
  else
    return (
      <div className={`bg-[${themeConst.background}]`}>
        <TopBar />
        <div className={'px-1'}>
          <Calendar />
        </div>
      </div>
    )
}
