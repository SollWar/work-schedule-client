'use client'
import { useSearchParams } from 'next/navigation'
import UserSetting from '../settings/components/UserSetting/UserSetting'

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
