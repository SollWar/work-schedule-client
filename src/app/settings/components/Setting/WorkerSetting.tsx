import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useUpdateWorkerData } from '../../hooks/useUpdateWorkerData'
import ModalInput from '../Dialog/ModalInput'
import ModalColorPicker from '../Dialog/ModalColorPicker'
import { getContrastTextColor } from '@/src/utils/colorsUtils'
import { useRouter } from 'next/navigation'
import { useWorkerData } from '@/src/hooks/useWorkerData'
import { useMainStore } from '@/src/stores/useMainStore'

interface UserSettingProps {
  workerId: string
}

const UserSetting = ({ workerId }: UserSettingProps) => {
  const [nameModalOpen, setNameModalOpen] = useState(false)
  const [telegramIdModalOpen, setTelegramIdModalOpen] = useState(false)
  const [name, setName] = useState('Работник')
  const [telegramId, setTelegramId] = useState('')
  const [color, setColor] = useState('#0070F3')
  const [colorPickerModalOpen, setColorPickerModalOpen] = useState(false)
  const { mainData } = useMainStore()
  const [nameInput, setNameInput] = useState('')
  const [telegraIdInput, setTelegramIdInput] = useState('')
  const { updateColor, updateName, createWorker, deleteWorker } =
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
      setColor(worker.color)
    } else {
      setNameInput('Работник')
    }
  }, [worker])

  const handleDeleteWorker = async (workerId: string) => {
    await deleteWorker(workerId)
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
    } else {
      setNameModalOpen(false)
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
    console.log(name, color, telegramId)
    if (name !== '' && color !== '' && telegramId !== '') {
      await createWorker(name, color, '0', telegramId)
      router.back()
    }
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
            className="py-2 px-4 w-full border-1 border-[#2B7FFF] rounded-[6px]"
          ></input>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-1">
          <button
            onClick={() => {
              setNameModalOpen(false)
            }}
            style={{
              background: loading ? 'gray' : '#EF4444',
            }}
            disabled={loading}
            className="flex text-white items-center justify-center text-xl p-2 rounded-[6px]"
          >
            Отмена
          </button>
          <button
            onClick={() => {
              handleNameUpdate(nameInput)
            }}
            style={{
              background: loading ? 'gray' : '#12C739',
            }}
            disabled={loading}
            className="flex text-white items-center justify-center text-xl p-2 rounded-[6px]"
          >
            Сохранить
          </button>
        </div>
      </ModalInput>
      <ModalInput
        onClose={() => {
          setTelegramIdModalOpen(false)
        }}
        closeButton={false}
        isOpen={telegramIdModalOpen}
      >
        <div className="mb-2">Введите TelegramID</div>
        <div className="flex items-center justify-center mb-4">
          <input
            type="text"
            value={telegraIdInput}
            onChange={handleTelegramIdInputChange}
            className="py-2 px-4 w-full border-1 border-[#2B7FFF] rounded-[6px]"
          ></input>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-1">
          <button
            onClick={() => {
              setTelegramIdModalOpen(false)
            }}
            style={{
              background: loading ? 'gray' : '#EF4444',
            }}
            disabled={loading}
            className="flex text-white items-center justify-center text-xl p-2 rounded-[6px]"
          >
            Отмена
          </button>
          <button
            onClick={() => {
              handleTelegramIdUpdate(telegraIdInput)
            }}
            style={{
              background: loading ? 'gray' : '#12C739',
            }}
            disabled={loading}
            className="flex text-white items-center justify-center text-xl p-2 rounded-[6px]"
          >
            Сохранить
          </button>
        </div>
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
      <div className="h-12 bg-white flex  my-1 p-1">
        <div className="flex w-full flex-row items-center">
          <button
            onClick={() => {
              router.back()
            }}
            className="bg-[#2B7FFF] px-4 h-full flex items-center rounded-[6px]"
          >
            <Image
              src="/arrow_back.svg"
              alt="Назад"
              width={24}
              height={24}
              priority={true}
            />
          </button>

          <div className="flex flex-row justify-between w-full">
            <div className="ms-4 text-xl font-semibold">Настройки</div>
            {worker?.id === mainData?.user.id ? (
              <div></div>
            ) : (
              <button
                onClick={() => {
                  handleDeleteWorker(workerId)
                }}
                className="bg-[white] px-4 h-full flex items-center rounded-[6px]"
              >
                <Image
                  src="/trash.svg"
                  alt="Удалить"
                  width={24}
                  height={24}
                  priority={true}
                />
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="ms-2">Профиль</div>
      <div className="flex flex-col text-white">
        <div
          onClick={() => {
            setNameModalOpen(true)
          }}
          className="mx-2 mt-2 py-3 px-2 flex flex-row items-center justify-between  bg-[#2B7FFF] rounded-[6px]"
        >
          <div className=" ">Отображаемое имя</div>
          <div className="flex flex-row h-full items-center text-white">
            <div className="me-2 flex items-center justify-center">{name}</div>
            <div className=" ">{' >'}</div>
          </div>
        </div>

        <div
          onClick={() => {
            setColorPickerModalOpen(true)
          }}
          className="mx-2 mt-2 mb-1 px-2 h-[48px] flex flex-row items-center justify-between bg-[#2B7FFF] rounded-[6px]"
        >
          <div className=" ">Цвет в расписании</div>
          <div className="flex flex-row h-full items-center">
            <div
              style={{
                background: color,
                color: getContrastTextColor(color),
              }}
              className="h-[90%] aspect-square me-2 flex items-center justify-center border-2 border-white rounded-[6px]"
            >
              27
            </div>
            <div className=" text-white">{' >'}</div>
          </div>
        </div>
        <div
          onClick={() => {
            setTelegramIdModalOpen(true)
          }}
          className="mx-2 mt-1 py-3 px-2 flex flex-row items-center justify-between  bg-[#2B7FFF] rounded-[6px]"
        >
          <div className=" ">TelegramID</div>
          <div className="flex flex-row h-full items-center text-white">
            <div className="me-2 flex items-center justify-center">
              {telegramId}
            </div>
            <div className=" ">{' >'}</div>
          </div>
        </div>
        {mainData?.user.access_id === 1 && workerId !== 'new' && (
          <div>
            <div className="ms-2 text-black">Назначения</div>
            {workplacesForSetting.length > 0 &&
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
              ))}
            {updateMode && (
              <div className="grid grid-cols-2 gap-2 mt-1 mx-2">
                <button
                  onClick={() => {
                    notUpdateWorkplace()
                  }}
                  style={{
                    background: loading ? 'gray' : '#EF4444',
                  }}
                  disabled={loading}
                  className="flex text-white items-center justify-center text-xl p-1 rounded-[6px]"
                >
                  Отмена
                </button>
                <button
                  onClick={() => {
                    doUpdateWorkplace()
                  }}
                  style={{
                    background: loading ? 'gray' : '#12C739',
                  }}
                  disabled={loading}
                  className="flex text-white items-center justify-center text-xl p-1 rounded-[6px]"
                >
                  Сохранить
                </button>
              </div>
            )}
          </div>
        )}
        {workerId === 'new' ? (
          <div className="grid grid-cols-2 gap-2 mt-1 mx-2">
            <button
              onClick={() => {
                router.back()
              }}
              style={{
                background: loading ? 'gray' : '#EF4444',
              }}
              disabled={loading}
              className="flex text-white items-center justify-center text-xl p-1 rounded-[6px]"
            >
              Отмена
            </button>
            <button
              onClick={() => {
                handleCreateWorker(name, color, telegramId)
              }}
              style={{
                background: loading ? 'gray' : '#12C739',
              }}
              disabled={loading}
              className="flex text-white items-center justify-center text-xl p-1 rounded-[6px]"
            >
              Сохранить
            </button>
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  )
}

export default UserSetting
