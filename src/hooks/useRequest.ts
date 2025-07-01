import { useState } from 'react'
import fetchTyped from '../utils/fetchTyped'
import { Request } from '../types/Request'

export const useRequest = () => {
  const [requests, setRequests] = useState<Request[]>([])
  const [requestsAvailable, setRequestsAvailable] = useState<boolean | null>(
    null
  )
  const getRequests = async () => {
    const response = await fetchTyped<Request[]>(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/request/all`,
      {
        method: 'GET',
      }
    )

    setRequestsAvailable(!(response.length === 0))
    setRequests(response)
  }
  const deleteRequest = async (telegramId: string) => {
    const response = await fetchTyped<boolean>(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/request/delete`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          telegram_id: telegramId,
        }),
      }
    )
    return response
  }
  const createRequest = async (
    telegramId: string,
    workerName: string,
    workplaceName: string
  ): Promise<boolean> => {
    const response = await fetchTyped<boolean>(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/request/create`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          telegram_id: telegramId,
          worker_name: workerName,
          workplace_name: workplaceName,
        }),
      }
    )
    return response
  }

  return {
    requests,
    getRequests,
    createRequest,
    deleteRequest,
    requestsAvailable,
  }
}
