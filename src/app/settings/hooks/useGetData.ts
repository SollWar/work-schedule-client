import { Workplace } from '@/src/types/Workplace'
import { Worker } from '@/src/types/Worker'
import fetchTyped from '@/src/utils/fetchTyped'
import { useState } from 'react'

export const useGetData = () => {
  const [workers, setWorkers] = useState<Worker[]>([])
  const [workplaces, setWorkplaces] = useState<Workplace[]>([])

  const getWorkers = async () => {
    const response = await fetchTyped<Worker[]>(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/worker/all`,
      {
        method: 'GET',
      }
    )
    setWorkers(response)
  }

  const getWorkplaces = async () => {
    const response = await fetchTyped<Workplace[]>(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/workplace/all`,
      {
        method: 'GET',
      }
    )
    setWorkplaces(response)
  }

  return { getWorkers, getWorkplaces, workers, workplaces }
}
