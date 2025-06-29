'use client'
import { useSearchParams } from 'next/navigation'
import WorkerSetting from '../settings/components/Setting/WorkerSetting'

const WorkerComponent = () => {
  const searchParams = useSearchParams()
  const workerId = searchParams.get('id')

  return <WorkerSetting workerId={workerId ?? 'new'} />
}

export default WorkerComponent
