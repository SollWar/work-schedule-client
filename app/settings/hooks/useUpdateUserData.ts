import { WorkplaceForSetting } from '@/app/types/Workplace'
import fetchTyped from '@/app/utils/fetchTyped'

export const useUpdateUserData = () => {
  const updateWorkplace = async (
    workerId: string,
    workplaces: WorkplaceForSetting[]
  ): Promise<boolean> => {
    const response = await fetchTyped<boolean>(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/update/workplaces`,
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

  const updateName = async (
    name: string,
    workerId: string
  ): Promise<boolean> => {
    const response = await fetchTyped<boolean>(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/update`,
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
    const response = await fetchTyped<boolean>(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/update`,
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
  return { updateColor, updateName, updateWorkplace }
}
