'use client'
import { useSearchParams } from 'next/navigation'
import fetchTyped from '../utils/fetchTyped'
import { useEffect, useState } from 'react'
import { Worker } from '../types/Worker'
import UserSetting from '../settings/components/UserSetting/UserSetting'
import { useWorkerData } from '../hooks/useWorkerData'

const WorkerPage = () => {
  const searchParams = useSearchParams()
  const workerId = searchParams.get('id')

  if (workerId) {
    return <UserSetting workerId={workerId} />
  } else {
    return <div>Загрузка...</div>
  }
}

export default WorkerPage
