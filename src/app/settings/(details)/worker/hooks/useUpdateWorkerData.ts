import { WorkplaceForSetting } from '@/src/types/Workplace'
import { fetchWithAuth } from '@/src/utils/fetchTyped'

export const useUpdateWorkerData = () => {
  const deleteWorker = async (workerId: string) => {
    const response = await fetchWithAuth<boolean>(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/worker/delete`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: workerId,
        }),
      }
    )
    return response
  }
  const createWorker = async (
    name: string,
    color: string,
    access_id: string,
    telegram_id: string
  ): Promise<string> => {
    const response = await fetchWithAuth<string>(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/worker/create`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          color: color,
          access_id: access_id,
          telegram_id: telegram_id,
        }),
      }
    )
    return response
  }

  const updateWorkplace = async (
    workerId: string,
    workplaces: WorkplaceForSetting[]
  ): Promise<boolean> => {
    const response = await fetchWithAuth<boolean>(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/worker/update/workplaces`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          workerId: workerId,
          workplaces: workplaces,
        }),
      }
    )
    return response
  }

  const updateAccess = async (
    accessId: number,
    workerId: string
  ): Promise<boolean> => {
    const response = await fetchWithAuth<boolean>(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/worker/update`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: workerId,
          access_id: accessId,
        }),
      }
    )
    return response
  }

  const updateName = async (
    name: string,
    workerId: string
  ): Promise<boolean> => {
    const response = await fetchWithAuth<boolean>(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/worker/update`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: workerId,
          name: name,
        }),
      }
    )
    return response
  }
  const updateColor = async (
    color: string,
    workerId: string
  ): Promise<boolean> => {
    const response = await fetchWithAuth<boolean>(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/worker/update`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: workerId,
          color: color,
        }),
      }
    )
    console.log(response)
    return response
  }
  return {
    updateColor,
    updateName,
    updateWorkplace,
    createWorker,
    deleteWorker,
    updateAccess,
  }
}
