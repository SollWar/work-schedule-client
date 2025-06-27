import fetchTyped from '@/app/utils/fetchTyped'

export const useUpdateWorkplaceData = () => {
  const updateName = async (
    name: string,
    workplaceId: string
  ): Promise<boolean> => {
    const response = await fetchTyped<boolean>(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/workplace/update`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: workplaceId,
          name: name,
        }),
      }
    )
    return response
  }
  const updateColor = async (
    color: string,
    workplaceId: string
  ): Promise<boolean> => {
    const response = await fetchTyped<boolean>(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/workplace/update`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: workplaceId,
          color: color,
        }),
      }
    )
    return response
  }
  return { updateColor, updateName }
}
