import { useMainStore } from '@/app/stores/useMainStore'
import fetchTyped from '@/app/utils/fetchTyped'

export const useUpdateUserData = () => {
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
  return { updateColor, updateName }
}
