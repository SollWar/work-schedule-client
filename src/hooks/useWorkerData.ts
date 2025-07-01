import { useEffect, useState } from 'react'
import { Worker } from '../types/Worker'
import fetchTyped from '../utils/fetchTyped'
import { useMainStore } from '../stores/useMainStore'
import { Workplace, WorkplaceForSetting } from '../types/Workplace'
import { useGetData } from '../app/settings/hooks/useGetData'
import { useUpdateWorkerData } from '../app/settings/worker/hooks/useUpdateWorkerData'

export const useWorkerData = () => {
  const [worker, setWorker] = useState<Worker>()
  const [workerDataLoaded, setWorkerDataLoaded] = useState(false)
  const { updateWorkplace } = useUpdateWorkerData()
  const [workplaces, setWorkplaces] = useState<Workplace[]>([])
  const { mainData, mainStoreInit } = useMainStore()
  const [updateMode, setUpdateMode] = useState(false)
  const { workplaces: allWorkplaces, getWorkplaces: getAllWorkplaces } =
    useGetData()
  const [workplacesForSetting, setWorkplacesForSetting] = useState<
    WorkplaceForSetting[]
  >([])
  const [prevWorkplacesForSetting, setPrevWorkplacesForSetting] = useState<
    WorkplaceForSetting[]
  >([])

  useEffect(() => {
    if (allWorkplaces.length > 0) {
      generateWorkplacesForSetting()
    }
  }, [allWorkplaces, workplaces])

  const enableUpdateMode = () => {
    if (!updateMode) {
      setPrevWorkplacesForSetting(workplacesForSetting)
      setUpdateMode(true)
    }
  }

  const disableUpdateMode = () => {
    if (updateMode) {
      setWorkplacesForSetting(prevWorkplacesForSetting)
      setPrevWorkplacesForSetting([])
      setUpdateMode(false)
    }
  }

  const doUpdateWorkplace = async () => {
    if (worker) {
      await updateWorkplace(worker.id, workplacesForSetting)
      await getWorkerWorkplaces(worker.id)
    }
    disableUpdateMode()
  }

  const notUpdateWorkplace = () => {
    disableUpdateMode()
  }

  const updateWorkplaceEnabled = (id: string, enabled: boolean) => {
    enableUpdateMode()
    setWorkplacesForSetting((prev) =>
      prev.map((wp) => (wp.id === id ? { ...wp, enabled } : wp))
    )
  }

  const updateWorkplaceEditable = (id: string, editable: number) => {
    enableUpdateMode()
    setWorkplacesForSetting((prev) =>
      prev.map((wp) => (wp.id === id ? { ...wp, editable } : wp))
    )
  }

  const generateWorkplacesForSetting = () => {
    const mapFromWorkplaces = new Map<string, Workplace>(
      workplaces.map((item) => [item.id, item])
    )

    const result: WorkplaceForSetting[] = allWorkplaces.map((item) => {
      const match = mapFromWorkplaces.get(item.id)

      return {
        ...item,
        enabled: !!match,
        editable: match?.editable,
      }
    })
    setWorkplacesForSetting(result)
  }

  const getWorkerData = async (workerId: string | null) => {
    const response = await fetchTyped<Worker>(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/worker?id=${workerId}`,
      {
        method: 'GET',
      }
    )
    setWorker(response)
    if (response.id === mainData?.user.id) {
      mainStoreInit()
    }
  }

  const getWorkerWorkplaces = async (workerId: string | null) => {
    await getAllWorkplaces()
    const response = await fetchTyped<WorkplaceForSetting[]>(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/workplace/user?worker_id=${workerId}`,
      {
        method: 'GET',
      }
    )
    setWorkplaces(response)

    setWorkerDataLoaded(true)
  }

  return {
    worker,
    workplacesForSetting,
    getWorkerData,
    getWorkerWorkplaces,
    updateWorkplaceEditable,
    updateWorkplaceEnabled,
    notUpdateWorkplace,
    doUpdateWorkplace,
    updateMode,
    workerDataLoaded,
  }
}
