import { useSearchParams } from 'next/navigation'
import WorkplaceSetting from '../settings/components/Setting/WorkplaceSetting'

const WorkplaceComponent = () => {
  const searchParams = useSearchParams()
  const workplaceId = searchParams.get('id')

  return <WorkplaceSetting workplaceId={workplaceId ?? 'new'} />
}

export default WorkplaceComponent
