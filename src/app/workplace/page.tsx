'use client'
import WorkplaceComponent from './WorkplaceComponent'
import { Suspense } from 'react'

const WorkplacePage = () => {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <WorkplaceComponent />
    </Suspense>
  )
}

export default WorkplacePage
