'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useMainStore } from '../../stores/useMainStore'
import { useEffect, useState } from 'react'
import { useGetData } from './hooks/useGetData'
import WorkerSetting from './components/Setting/WorkerSetting'

//const accessType = ['Обычный', 'Админ']

const SettingsPage = () => {
  const { getWorkers, getWorkplaces, workers, workplaces } = useGetData()
  const { mainData } = useMainStore()
  const [accessId, setAccessId] = useState(0)
  const [workersListOpen, setWorkersListOpen] = useState(true)
  const [workplacesListOpen, setWorkplacesListOpen] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!mainData) {
      router.replace('/')
    } else {
      if (mainData.user.access_id !== 1) {
        router.replace(`/worker?id=${mainData.user.id}`)
      }
      setAccessId(mainData.user.access_id)
      getWorkers()
      getWorkplaces()
    }
  }, [])

  return (
    <div>
      <div className="h-12 bg-white grid grid-cols-3 items-center my-1 p-1">
        <button
          onClick={() => {
            router.back()
          }}
          className="bg-[#2B7FFF] px-4 h-full w-fit rounded-[6px] justify-self-start"
        >
          <Image
            src="/arrow_back.svg"
            alt="Назад"
            width={24}
            height={24}
            priority={true}
          />
        </button>

        <div className="ms-4 text-xl w-fit font-semibold justify-self-center">
          Настройки
        </div>

        <div></div>
      </div>
      {accessId === 1 && (
        <div className="mb-2">
          {/* <div className="ms-2 mt-1 text-black">Админка</div> */}
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
            className={`mx-2 overflow-hidden transition-all duration-300 ease-in-out`}
            style={{
              maxHeight: workersListOpen
                ? `${workers.length * 3 + 3}rem`
                : '0rem',
            }}
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
            <div
              onClick={() => {
                router.push(`/worker?id=${'new'}`)
              }}
              key={'workplace new'}
              className="mt-1 ms-4 py-2 px-1 bg-white border-2 border-[#2B7FFF] rounded-[6px] text-black"
            >
              <div>Новый работник</div>
            </div>
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
            className={`mx-2 overflow-hidden transition-all duration-300 ease-in-out`}
            style={{
              maxHeight: workplacesListOpen
                ? `${workplaces.length * 3 + 3}rem`
                : '0rem',
            }}
          >
            {workplaces.map((workplace) => (
              <div
                onClick={() => {
                  router.push(`/workplace?id=${workplace.id}`)
                }}
                key={workplace.id}
                className="mt-1 ms-4 py-2 px-2 bg-[#2B7FFF] rounded-[6px] text-white"
              >
                <div>{workplace.name}</div>
              </div>
            ))}
            <div
              onClick={() => {
                router.push(`/workplace?id=${'new'}`)
              }}
              key={'workplace new'}
              className="mt-1 ms-4 py-2 px-1 bg-white border-2 border-[#2B7FFF] rounded-[6px] text-black"
            >
              <div>Новый магазин</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SettingsPage
