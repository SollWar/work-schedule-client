'use client'
import { useSearchParams } from 'next/navigation'
import UserSetting from '../settings/components/Setting/WorkerSetting'

const WorkerComponent = () => {
  const searchParams = useSearchParams()
  const workerId = searchParams.get('id')

  return <UserSetting workerId={workerId ?? 'new'} />
}

export default WorkerComponent
