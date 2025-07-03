'use client'
import { Suspense } from 'react'
import WorkplaceComponent from './components/WorkplaceComponent'

const WorkplacePage = () => {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <WorkplaceComponent />
    </Suspense>
  )
}

export default WorkplacePage
