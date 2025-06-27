'use client'
import { useRouter } from 'next/navigation'
import { useMainStore } from '../stores/useMainStore'
import { useEffect, useState } from 'react'
import { useGetData } from './hooks/useGetData'
import UserSetting from './components/UserSetting/UserSetting'

const accessType = ['Обычный', 'Админ']

const SettingsPage = () => {
  const { getWorkers, getWorkplaces, workers, workplaces } = useGetData()
  const { mainData } = useMainStore()
  const [accessId, setAccessId] = useState(0)
  const [workersListOpen, setWorkersListOpen] = useState(false)
  const [workplacesListOpen, setWorkplacesListOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!mainData) {
      router.replace('/')
    } else {
      setAccessId(mainData.user.access_id)
    }
  }, [])

  return (
    <div>
      <UserSetting workerId={mainData?.user.id!} />
      {accessId === 1 && (
        <div className="mb-2">
          <div className="ms-2 mt-1 text-black">Админка</div>
          <div
            onClick={() => {
              if (!workersListOpen) {
                getWorkers()
              }
              setWorkersListOpen(!workersListOpen)
            }}
            className={
              'mx-2 mt-1 py-3 px-2 flex flex-row items-center justify-between rounded-[6px] cursor-pointer ' +
              (accessId === 1 ? 'bg-[#2B7FFF]' : 'bg-[#747475]')
            }
          >
            <div className="text-white">Список пользователей</div>
            <div className="flex flex-row h-full items-center text-gray-300">
              <div className="me-4 flex items-center justify-center">
                {workersListOpen ? 'Закрыть' : 'Открыть'}
              </div>
            </div>
          </div>

          <div
            className={`mx-2 overflow-hidden transition-all duration-300 ease-in-out ${
              workersListOpen ? 'max-h-40' : 'max-h-0'
            }`}
          >
            {workers.map((worker) => (
              <div
                onClick={() => {
                  router.push(`/worker?id=${worker.id}`)
                }}
                key={worker.id}
                className="mt-1 ms-4 py-2 px-2 bg-[#2B7FFF] rounded-[6px] text-white"
              >
                <div>{worker.name}</div>
              </div>
            ))}
          </div>
          <div
            onClick={() => {
              if (!workplacesListOpen) {
                getWorkplaces()
              }
              setWorkplacesListOpen(!workplacesListOpen)
            }}
            className={
              'mx-2 mt-2 py-3 px-2 flex flex-row items-center justify-between rounded-[6px] cursor-pointer ' +
              (accessId === 1 ? 'bg-[#2B7FFF]' : 'bg-[#747475]')
            }
          >
            <div className="text-white">Список магазинов</div>
            <div className="flex flex-row h-full items-center text-gray-300">
              <div className="me-4 flex items-center justify-center">
                {workplacesListOpen ? 'Закрыть' : 'Открыть'}
              </div>
            </div>
          </div>

          <div
            className={`mx-2 overflow-hidden transition-all duration-300 ease-in-out ${
              workplacesListOpen ? 'max-h-40' : 'max-h-0'
            }`}
          >
            {workplaces.map((workplace) => (
              <div
                key={workplace.id}
                className="mt-1 ms-4 py-2 px-2 bg-[#2B7FFF] rounded-[6px] text-white"
              >
                <div>{workplace.name}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default SettingsPage
