import { useMainStore } from '@/app/stores/useMainStore'
import fetchTyped from '@/app/utils/fetchTyped'

export const useUpdateUserData = () => {
  const { mainData } = useMainStore()
  const updateName = async (name: string): Promise<boolean> => {
    if (mainData) {
      const response = await fetchTyped<boolean>(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/update`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: mainData.user.id,
            name: name,
          }),
        }
      )
      return response
    }
    return false
  }
  const updateColor = async (color: string): Promise<boolean> => {
    if (mainData) {
      const response = await fetchTyped<boolean>(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/update`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: mainData.user.id,
            color: color,
          }),
        }
      )
      return response
    }
    return false
  }
  return { updateColor, updateName }
}
