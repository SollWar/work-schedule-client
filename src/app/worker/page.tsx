'use client'
import { Suspense } from 'react'
import WorkerComponent from './WorkerComponent'

const WorkerPage = () => {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <WorkerComponent />
    </Suspense>
  )
}

export default WorkerPage
