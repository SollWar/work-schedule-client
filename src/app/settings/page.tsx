/* eslint-disable @next/next/no-img-element */
'use client'
import { useRouter } from 'next/navigation'
import { useMainStore } from '../../stores/mainStore'
import { useEffect, useState } from 'react'
import { useGetData } from './hooks/useGetData'
import { useRequest } from '@/src/hooks/useRequest'
import { formatPostgresDate } from '@/src/utils/dateUtils'
import { useSettingStore } from '@/src/stores/settingStore'

//const accessType = ['Обычный', 'Админ']

const SettingsPage = () => {
  const { requestsListOpen, workersListOpen, workplacesListOpen, setListOpen } =
    useSettingStore()
  const { getWorkers, getWorkplaces, workers, workplaces } = useGetData()
  const { requests, requestsAvailable, getRequests } = useRequest()
  const { mainData } = useMainStore()
  const [accessId, setAccessId] = useState(0)
  const router = useRouter()

  useEffect(() => {
    if (!mainData) {
      router.replace('/')
    } else {
      if (mainData.user.access_id !== 1) {
        router.replace(`/settings/worker?id=${mainData.user.id}`)
      }
      setAccessId(mainData.user.access_id)
      if (requestsListOpen) getRequests()
      if (workersListOpen) getWorkers()
      if (workplacesListOpen) getWorkplaces()
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
          <img src="/arrow_back.svg" alt="Назад" width={24} height={24} />
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
              if (!requestsListOpen) {
                getRequests()
              }
              setListOpen('requestsListOpen', !requestsListOpen)
            }}
            className={
              'mx-2 mt-1 py-3 px-2 flex flex-row items-center justify-between rounded-[6px] cursor-pointer ' +
              (accessId === 1 ? 'bg-[#2B7FFF]' : 'bg-[#747475]')
            }
          >
            <div className="text-white">Список запросов</div>
            <div className="flex flex-row h-full items-center text-gray-300">
              <div className="flex items-center justify-center">
                {requestsListOpen ? 'Закрыть' : 'Открыть'}
              </div>
            </div>
          </div>

          <div
            className={`mx-2 overflow-hidden transition-all duration-300 ease-in-out`}
            style={{
              maxHeight: requestsListOpen
                ? `${requests.length * 3 + 6}rem`
                : '0rem',
            }}
          >
            {!requestsAvailable ? (
              <div className="h-[40px] mt-1 ms-4 py-2 px-2 rounded-[6px] text-white bg-slate-300 animate-pulse" />
            ) : requests.length === 0 ? (
              <div className="h-[40px] mt-1 ms-4 py-2 px-2 rounded-[6px] text-white bg-[gray]">
                Запросов нет
              </div>
            ) : (
              requests.map((request) => (
                <div
                  onClick={() => {
                    router.push(
                      `/settings/worker?id=new&tid=${request.telegram_id}&wname=${request.worker_name}`
                    )
                  }}
                  key={request.telegram_id}
                  className="mt-1 ms-4 py-2 flex flex-row justify-between px-2 bg-[#2B7FFF] rounded-[6px] text-white"
                >
                  <div>{request.worker_name}</div>
                  <div>{formatPostgresDate(request.created_at)}</div>
                </div>
              ))
            )}
          </div>
          <div
            onClick={() => {
              if (!workersListOpen) {
                getWorkers()
              }
              setListOpen('workersListOpen', !workersListOpen)
            }}
            className={
              'mx-2 mt-1 py-3 px-2 flex flex-row items-center justify-between rounded-[6px] cursor-pointer ' +
              (accessId === 1 ? 'bg-[#2B7FFF]' : 'bg-[#747475]')
            }
          >
            <div className="text-white">Список пользователей</div>
            <div className="flex flex-row h-full items-center text-gray-300">
              <div className="flex items-center justify-center">
                {workersListOpen ? 'Закрыть' : 'Открыть'}
              </div>
            </div>
          </div>

          <div
            className={`mx-2 overflow-hidden transition-all duration-300 ease-in-out`}
            style={{
              maxHeight: workersListOpen
                ? `${workers.length * 3 + 6}rem`
                : '0rem',
            }}
          >
            {workers.length === 0 ? (
              <div className="h-[40px] mt-1 ms-4 py-2 px-2 rounded-[6px] text-white bg-slate-300 animate-pulse" />
            ) : (
              workers.map((worker) => (
                <div
                  onClick={() => {
                    router.push(`/settings/worker?id=${worker.id}`)
                  }}
                  key={worker.id}
                  className="mt-1 ms-4 py-2 flex flex-row justify-between px-2 bg-[#2B7FFF] rounded-[6px] text-white"
                >
                  <div>{worker.name}</div>
                  <div>{worker.id}</div>
                </div>
              ))
            )}
            <div
              onClick={() => {
                router.push(`/settings/worker?id=${'new'}`)
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
              setListOpen('workplacesListOpen', !workplacesListOpen)
            }}
            className={
              'mx-2 mt-1 py-3 px-2 flex flex-row items-center justify-between rounded-[6px] cursor-pointer ' +
              (accessId === 1 ? 'bg-[#2B7FFF]' : 'bg-[#747475]')
            }
          >
            <div className="text-white">Список магазинов</div>
            <div className="flex flex-row h-full items-center text-gray-300">
              <div className="flex items-center justify-center">
                {workplacesListOpen ? 'Закрыть' : 'Открыть'}
              </div>
            </div>
          </div>

          <div
            className={`mx-2 overflow-hidden transition-all duration-300 ease-in-out`}
            style={{
              maxHeight: workplacesListOpen
                ? `${workplaces.length * 3 + 6}rem`
                : '0rem',
            }}
          >
            {workplaces.length === 0 ? (
              <div className="h-[40px] mt-1 ms-4 py-2 px-2 rounded-[6px] text-white bg-slate-300 animate-pulse" />
            ) : (
              workplaces.map((workplace) => (
                <div
                  onClick={() => {
                    router.push(`/settings/workplace?id=${workplace.id}`)
                  }}
                  key={workplace.id}
                  className="mt-1 ms-4 py-2 flex flex-row justify-between px-2 bg-[#2B7FFF] rounded-[6px] text-white"
                >
                  <div>{workplace.name}</div>
                  <div>{workplace.id}</div>
                </div>
              ))
            )}
            <div
              onClick={() => {
                router.push(`/settings/workplace?id=${'new'}`)
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
