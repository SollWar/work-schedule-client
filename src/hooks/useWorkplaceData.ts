import { useState } from 'react'
import { Workplace } from '../types/Workplace'
import fetchTyped from '../utils/fetchTyped'

export const useWorkplaceData = () => {
  const [workplace, setWorkplace] = useState<Workplace>()

  const getWorkplaceData = async (workplaceId: string | null) => {
    const response = await fetchTyped<Workplace>(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/workplace?id=${workplaceId}`,
      {
        method: 'GET',
      }
    )
    setWorkplace(response)
  }

  return { workplace, getWorkplaceData }
}
