import { useEffect, useState } from 'react'
import { Worker } from '../types/Worker'
import fetchTyped from '../utils/fetchTyped'
import { useMainStore } from '../stores/useMainStore'
import { Workplace } from '../types/Workplace'
import { useGetData } from '../settings/hooks/useGetData'

interface WorkplaceForSetting extends Workplace {
  enabled?: boolean
}

export const useWorkerData = () => {
  const [worker, setWorker] = useState<Worker>()
  const [workplaces, setWorkplaces] = useState<Workplace[]>([])
  const { mainData, reloadMainStore } = useMainStore()
  const { workplaces: allWorkplaces, getWorkplaces: getAllWorkplaces } =
    useGetData()
  const [workplacesForSetting, setWorkplacesForSetting] = useState<
    WorkplaceForSetting[]
  >([])

  useEffect(() => {
    if (allWorkplaces.length > 0 && workplaces.length > 0) {
      generateWorkplacesForSetting()
    }
  }, [allWorkplaces, workplaces])

  const generateWorkplacesForSetting = () => {
    const mapFromWorkplaces = new Map<string, Workplace>(
      workplaces.map((item) => [item.id, item])
    )

    const result: WorkplaceForSetting[] = allWorkplaces.map((item) => {
      const match = mapFromWorkplaces.get(item.id)

      return {
        ...item,
        enabled: !!match,
        editable: match?.editable, // заменяем null на значение, если есть
      }
    })

    setWorkplacesForSetting(result)
  }

  const getWorkerData = async (workerId: string | null) => {
    const response = await fetchTyped<Worker>(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user?id=${workerId}`,
      {
        method: 'GET',
      }
    )
    setWorker(response)
    if (response.id === mainData?.user.id) {
      reloadMainStore()
    }
  }

  const getWorkerWorkplaces = async (workerId: string | null) => {
    await getAllWorkplaces()
    const response = await fetchTyped<WorkplaceForSetting[]>(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/workplaces?worker_id=${workerId}`,
      {
        method: 'GET',
      }
    )

    setWorkplaces(response)
  }

  return {
    worker,
    workplacesForSetting,
    getWorkerData,
    getWorkerWorkplaces,
  }
}
