'use client'
import { useSearchParams } from 'next/navigation'
import WorkerSetting from '../settings/components/Setting/WorkerSetting'

const WorkerComponent = () => {
  const searchParams = useSearchParams()
  const workerId = searchParams.get('id')
  const telegramId = searchParams.get('tid')
  const workerName = searchParams.get('wname')

  return (
    <WorkerSetting
      workerId={workerId ?? 'new'}
      telegramIdReq={telegramId ?? ''}
      nameReq={workerName ?? ''}
    />
  )
}

export default WorkerComponent
