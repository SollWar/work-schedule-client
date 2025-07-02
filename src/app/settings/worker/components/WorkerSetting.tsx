/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'
import { useUpdateWorkerData } from '../hooks/useUpdateWorkerData'
import ModalInput from '../../components/Modals/ModalInput'
import ModalColorPicker from '../../components/Modals/ModalColorPicker'
import { getContrastTextColor } from '@/src/utils/colorsUtils'
import { useRouter } from 'next/navigation'
import { useWorkerData } from '@/src/hooks/useWorkerData'
import { useMainStore } from '@/src/stores/mainStore'
import AcceptButton from '../../components/AcceptButton'
import { useToastStore } from '@/src/stores/toastStore'
import { useRequest } from '@/src/hooks/useRequest'

interface WorkerSettingProps {
  telegramIdReq: string
  nameReq: string
  workerId: string
}

const WorkerSetting = ({
  nameReq,
  workerId,
  telegramIdReq,
}: WorkerSettingProps) => {
  //const toast = useToastStore((s) => s.toast)
  const { toast } = useToastStore()
  const { deleteRequest } = useRequest()
  const [nameModalOpen, setNameModalOpen] = useState(false)
  const [telegramIdModalOpen, setTelegramIdModalOpen] = useState(false)
  const [name, setName] = useState(nameReq)
  const [telegramId, setTelegramId] = useState(telegramIdReq)
  const [color, setColor] = useState('#0070F3')
  const [colorPickerModalOpen, setColorPickerModalOpen] = useState(false)
  const { mainData } = useMainStore()
  const [nameInput, setNameInput] = useState(nameReq)
  const [telegraIdInput, setTelegramIdInput] = useState(telegramIdReq)
  const { updateColor, updateName, createWorker, deleteWorker, updateAccess } =
    useUpdateWorkerData()
  const [loading, setLoading] = useState(false)
  const {
    worker,
    workplacesForSetting,
    updateMode,
    getWorkerWorkplaces,
    getWorkerData,
    updateWorkplaceEditable,
    updateWorkplaceEnabled,
    notUpdateWorkplace,
    doUpdateWorkplace,
    workerDataLoaded,
    workerTelegramId,
  } = useWorkerData()
  const router = useRouter()

  useEffect(() => {
    if (workerId !== 'new') {
      getWorkerData(workerId)
      getWorkerWorkplaces(workerId)
    }
  }, [])

  useEffect(() => {
    if (worker) {
      setNameInput(worker.name)
      setName(worker.name)
      setTelegramId(workerTelegramId)
      setTelegramIdInput(workerTelegramId)
      setColor(worker.color)
    } else {
      setNameInput('')
    }
  }, [worker])

  const handleDeleteWorker = async (workerId: string) => {
    await deleteWorker(workerId)
    toast(name + ' удален')
    router.back()
  }

  const handleDeleteRequest = async () => {
    await deleteRequest(telegramIdReq)
    toast('Запрос ' + nameReq + ' удален')
    router.back()
  }

  const handleWorkplaceEditable = (id: string, editable: number) => {
    updateWorkplaceEditable(id, editable)
  }

  const handleWorkplaceEnabled = (id: string, enabled: boolean) => {
    updateWorkplaceEnabled(id, enabled)
  }

  const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value)
  }

  const handleTelegramIdInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTelegramIdInput(e.target.value)
  }

  const handleColorUpdate = async (color: string) => {
    setColor(color)
    if (worker) {
      setLoading(true)
      await updateColor(color, worker.id)
      await getWorkerData(worker.id)
      setLoading(true)
      setColorPickerModalOpen(false)
      toast('Цвет обновлен')
    } else {
      setColorPickerModalOpen(false)
    }
  }

  const handleNameUpdate = async (name: string) => {
    setName(name)
    if (worker) {
      setLoading(true)
      await updateName(name, worker.id)
      await getWorkerData(worker.id)
      setNameModalOpen(false)
      setLoading(false)
      toast('Имя обновлено')
    } else {
      setNameModalOpen(false)
    }
  }

  const handleAccecUpdate = async (accessId: number) => {
    if (worker) {
      setLoading(true)
      await updateAccess(accessId, worker.id)
      await getWorkerData(worker.id)
      setNameModalOpen(false)
      setLoading(false)
      toast('Доступ обновлен')
    }
  }

  const handleTelegramIdUpdate = async (telegramId: string) => {
    setTelegramId(telegramId)
    if (worker) {
    } else {
      setTelegramIdModalOpen(false)
    }
  }

  const handleCreateWorker = async (
    name: string,
    color: string,
    telegramId: string
  ) => {
    if (!name.trim()) {
      toast('Введите имя работника')
      return
    }
    if (!color.trim()) {
      toast('Выберите цвет')
      return
    }
    if (!telegramId.trim()) {
      toast('Введите TelegramID')
      return
    }

    if (telegramIdReq !== '' && nameReq !== '' && workerId === 'new') {
      await deleteRequest(telegramIdReq)
    }
    await createWorker(name, color, '0', telegramId)

    toast(name + ' создан')
    router.back()
  }

  return (
    <>
      <ModalInput
        onClose={() => {
          setNameModalOpen(false)
        }}
        closeButton={false}
        isOpen={nameModalOpen}
      >
        <div className="mb-2">Введите имя</div>
        <div className="flex items-center justify-center mb-4">
          <input
            type="text"
            value={nameInput}
            onChange={handleNameInputChange}
            autoFocus={true}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleNameUpdate(nameInput)
              }
            }}
            className="py-2 px-4 w-full border-1 border-[#2B7FFF] rounded-[6px]"
          ></input>
        </div>
        <AcceptButton
          acceptClick={() => {
            handleNameUpdate(nameInput)
          }}
          cancelClick={() => {
            setNameModalOpen(false)
          }}
          topStyle={'grid grid-cols-2 gap-2 mt-1'}
          height={'44px'}
          disabled={loading}
        />
      </ModalInput>
      <ModalInput
        onClose={() => {
          setTelegramIdModalOpen(false)
        }}
        closeButton={false}
        isOpen={telegramIdModalOpen}
      >
        <div className="mb-2">Введите TelegramID</div>
        <div className="flex items-center justify-center mb-2">
          <input
            type="text"
            value={telegraIdInput}
            onChange={handleTelegramIdInputChange}
            autoFocus={true}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleTelegramIdUpdate(telegraIdInput)
              }
            }}
            className="py-2 px-4 w-full border-1 border-[#2B7FFF] rounded-[6px]"
          ></input>
        </div>
        <AcceptButton
          acceptClick={() => {
            handleTelegramIdUpdate(telegraIdInput)
          }}
          cancelClick={() => {
            setTelegramIdModalOpen(false)
          }}
          disabled={loading}
          topStyle={'grid grid-cols-2 gap-2 mt-1 h-[44px]'}
          height="44px"
        />
      </ModalInput>
      <ModalInput
        onClose={() => {
          setColorPickerModalOpen(false)
        }}
        closeButton={false}
        isOpen={colorPickerModalOpen}
      >
        <ModalColorPicker
          onClose={() => {
            setColorPickerModalOpen(false)
          }}
          userName={name}
          initColor={color}
          selectColor={handleColorUpdate}
        />
      </ModalInput>
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
        {(workerId !== 'new' || telegramIdReq !== '') && (
          <button
            onClick={() => {
              if (
                telegramIdReq !== '' &&
                nameReq !== '' &&
                workerId === 'new'
              ) {
                handleDeleteRequest()
              } else {
                handleDeleteWorker(workerId)
              }
            }}
            className="bg-white px-4 h-full w-fit rounded-[6px] justify-self-end"
          >
            <img src="/trash.svg" alt="Удалить" width={24} height={24} />
          </button>
        )}
      </div>
      <div className="flex flex-col text-white">
        <div
          onClick={() => {
            setNameModalOpen(true)
          }}
          className="mx-2 mt-1 px-2 h-[48px] flex flex-row items-center justify-between bg-[#2B7FFF] rounded-[6px]"
        >
          <div className=" ">Отображаемое имя</div>
          <div className="flex flex-row h-full items-center text-white">
            {workerId === 'new' || workerDataLoaded ? (
              <div className="me-2 flex items-center justify-center">
                {name}
              </div>
            ) : (
              <img
                className="me-2"
                src="/dot_loader.svg"
                alt="Загрузка"
                width={56}
                height={36}
              />
            )}
            <div className=" ">{' >'}</div>
          </div>
        </div>

        <div
          onClick={() => {
            setColorPickerModalOpen(true)
          }}
          className="mx-2 mt-1 px-2 h-[48px] flex flex-row items-center justify-between bg-[#2B7FFF] rounded-[6px]"
        >
          <div className=" ">Цвет в расписании</div>
          <div className="flex flex-row h-full items-center">
            {workerId === 'new' || workerDataLoaded ? (
              <div
                style={{
                  background: color,
                  color: getContrastTextColor(color),
                }}
                className="h-[90%] aspect-square me-2 flex items-center justify-center border-2 border-white rounded-[6px]"
              >
                27
              </div>
            ) : (
              <img
                className="me-2"
                src="/dot_loader.svg"
                alt="Загрузка"
                width={56}
                height={36}
              />
            )}

            <div className=" text-white">{' >'}</div>
          </div>
        </div>
        <div
          onClick={() => {
            if (workerId === 'new') setTelegramIdModalOpen(true)
          }}
          className="mx-2 mt-1 px-2 h-[48px] flex flex-row items-center justify-between rounded-[6px]"
          style={{
            background: workerId === 'new' ? '#2B7FFF' : 'gray',
          }}
        >
          <div className=" ">TelegramID</div>
          <div className="flex flex-row h-full items-center text-white">
            {workerId === 'new' || workerDataLoaded ? (
              <div className="me-2 flex items-center justify-center">
                {telegramId}
              </div>
            ) : (
              <img
                className="me-2"
                src="/dot_loader.svg"
                alt="Загрузка"
                width={56}
                height={36}
              />
            )}

            <div className=" ">{' >'}</div>
          </div>
        </div>
        {mainData?.user.access_id === 1 && workerId !== 'new' && (
          <div className="mx-2 mt-1 px-2 h-[48px] flex flex-row items-center justify-between bg-[#2B7FFF] rounded-[6px]">
            <div className=" ">Администратор</div>
            <div className="flex flex-row h-full items-center text-white">
              {workerDataLoaded || loading ? (
                <input
                  className="size-8"
                  type="checkbox"
                  checked={worker?.access_id === 1}
                  onChange={(e) => {
                    handleAccecUpdate(e.target.checked ? 1 : 0)
                  }}
                />
              ) : (
                <img
                  className="me-2"
                  src="/dot_loader.svg"
                  alt="Загрузка"
                  width={56}
                  height={36}
                />
              )}
            </div>
          </div>
        )}

        {mainData?.user.access_id === 1 && workerId !== 'new' && (
          <div>
            {workerDataLoaded === false ? (
              <div className="h-[48px] mt-1 mx-2 py-2 px-2 rounded-[6px] text-white flex flex-col bg-slate-300 animate-pulse" />
            ) : (
              workplacesForSetting.map((workplace) => (
                <div
                  key={'workplace_' + workplace.id}
                  className="mt-1 mx-2 py-2 px-2 bg-[#2B7FFF] rounded-[6px] text-white flex flex-col"
                >
                  <div className="flex flex-row items-center justify-between">
                    <div>{workplace.name}</div>
                    <input
                      className="size-8"
                      type="checkbox"
                      checked={workplace.enabled}
                      onChange={(e) => {
                        handleWorkplaceEnabled(workplace.id, e.target.checked)
                      }}
                    />
                  </div>
                  {workplace.enabled && (
                    <div className="bg-white mt-1">
                      <div className="flex flex-row items-center justify-between">
                        <div
                          className="py-1 flex-1 border-2 border-white flex justify-center"
                          style={{
                            background: !workplace.editable
                              ? '#2B7FFF'
                              : 'white',
                            color: !workplace.editable ? 'white' : 'black',
                          }}
                          onClick={() => {
                            handleWorkplaceEditable(workplace.id, 0)
                          }}
                        >
                          Чтение
                        </div>
                        <div
                          className="py-1 flex-1 border-2 border-white flex justify-center"
                          style={{
                            background: workplace.editable
                              ? '#2B7FFF'
                              : 'white',
                            color: workplace.editable ? 'white' : 'black',
                          }}
                          onClick={() => {
                            handleWorkplaceEditable(workplace.id, 1)
                          }}
                        >
                          Запись
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
            {updateMode && (
              <AcceptButton
                acceptClick={async () => {
                  await doUpdateWorkplace()
                  toast('Назначения обновлены')
                }}
                cancelClick={notUpdateWorkplace}
                disabled={loading}
                topStyle="grid grid-cols-2 gap-2 mt-2 mx-2"
                height={'48px'}
              />
            )}
          </div>
        )}
        {workerId === 'new' ? (
          <AcceptButton
            acceptClick={() => {
              handleCreateWorker(name, color, telegramId)
            }}
            cancelClick={router.back}
            disabled={loading}
            topStyle="grid grid-cols-2 gap-2 mt-2 mx-2"
            height={'48px'}
          />
        ) : (
          ''
        )}
      </div>
    </>
  )
}

export default WorkerSetting
