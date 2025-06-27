'use client'
import { useSearchParams } from 'next/navigation'
import WorkplaceSetting from '../settings/components/UserSetting/WorkplaceSetting'

const WorkplacePage = () => {
  const searchParams = useSearchParams()
  const workplaceId = searchParams.get('id')

  if (workplaceId) {
    return <WorkplaceSetting workplaceId={workplaceId} />
  } else {
    return <div>Загрузка...</div>
  }
}

export default WorkplacePage
