'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useMainStore } from '../stores/useMainStore'
import { getContrastTextColor } from '../utils/colorsUtils'
import { useEffect, useState } from 'react'
import ModalInput from './components/Dialog/ModalInput'
import ModalColorPicker from './components/Dialog/ModalColorPicker'
import { useUpdateUserData } from './hooks/useUpdateUserData'
import { useGetData } from './hooks/useGetData'

const accessType = ['Обычный', 'Админ']

const SettingsPage = () => {
  const { getWorkers, getWorkplaces, workers, workplaces } = useGetData()
  const { mainData, reloadMainStore } = useMainStore()
  const [nameModalOpen, setNameModalOpen] = useState(false)
  const [colorPickerModalOpen, setColorPickerModalOpen] = useState(false)
  const [nameInput, setNameInput] = useState(mainData?.user.name ?? '')
  const { updateColor, updateName } = useUpdateUserData()
  const [loading, setLoading] = useState(false)
  const [accessId] = useState(1)
  const [workersListOpen, setWorkersListOpen] = useState(false)
  const [workplacesListOpen, setWorkplacesListOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (!mainData) {
      router.replace('/')
    }
  }, [])

  const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value)
  }

  const handleColorUpdate = async (color: string) => {
    await updateColor(color)
    await reloadMainStore()
    setColorPickerModalOpen(false)
  }

  const handleNameUpdate = async (name: string) => {
    setLoading(true)
    await updateName(name)
    await reloadMainStore()
    setNameModalOpen(false)
    setLoading(false)
  }

  return (
    <div>
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
          setColorPickerModalOpen(false)
        }}
        closeButton={false}
        isOpen={colorPickerModalOpen}
      >
        <ModalColorPicker
          onClose={() => {
            setColorPickerModalOpen(false)
          }}
          userName={mainData?.user.name ?? 'null'}
          initColor={mainData?.user.color ?? '#2B7FFF'}
          selectColor={handleColorUpdate}
        />
      </ModalInput>
      <div className="h-14 bg-white flex justify-between my-1 p-1">
        <div className="flex flex-row items-center">
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

          <div className="ms-4 text-xl font-semibold">Настройки</div>
        </div>
      </div>
      <div className="flex flex-col text-white">
        <div
          onClick={() => {
            setNameModalOpen(true)
          }}
          className="mx-2 mt-2 py-3 px-2 flex flex-row items-center justify-between  bg-[#2B7FFF] rounded-[6px]"
        >
          <div className=" ">Отображаемое имя</div>
          <div className="flex flex-row h-full items-center text-white">
            <div className="me-2 flex items-center justify-center">
              {mainData?.user.name ?? 'null'}
            </div>
            <div className=" ">{' >'}</div>
          </div>
        </div>

        <div
          onClick={() => {
            setColorPickerModalOpen(true)
          }}
          className="mx-2 mt-2 px-2 h-[48px] flex flex-row items-center justify-between bg-[#2B7FFF] rounded-[6px]"
        >
          <div className=" ">Цвет в расписании</div>
          <div className="flex flex-row h-full items-center">
            <div
              style={{
                background: mainData?.user.color ?? '#0070F3',
                color: getContrastTextColor(mainData?.user.color ?? '#0070F3'),
              }}
              className="h-[90%] aspect-square me-2 flex items-center justify-center border-2 border-white rounded-[6px]"
            >
              27
            </div>
            <div className=" text-white">{' >'}</div>
          </div>
        </div>
        <div className="mx-2 mt-2 py-3 px-2 flex flex-row items-center justify-between  bg-[#747475] rounded-[6px]">
          <div className=" ">TelegramID для входа</div>
          <div className="flex flex-row h-full items-center text-gray-300">
            <div className="me-2 flex items-center justify-center">
              {mainData?.user.id}
            </div>
            <div className=" ">{' >'}</div>
          </div>
        </div>
        <div className="mx-2 mt-2 py-3 px-2 flex flex-row items-center justify-between  bg-[#747475] rounded-[6px]">
          <div className=" ">Уровень доступа</div>
          <div className="flex flex-row h-full items-center text-gray-300">
            <div className="me-4 flex items-center justify-center">
              {accessType[accessId]}
            </div>
          </div>
        </div>
        {accessId === 1 && (
          <>
            <div
              onClick={() => {
                if (!workersListOpen) {
                  getWorkers()
                }
                setWorkersListOpen(!workersListOpen)
              }}
              className={
                'mx-2 mt-2 py-3 px-2 flex flex-row items-center justify-between rounded-[6px] cursor-pointer ' +
                (accessId === 1 ? 'bg-[#2B7FFF]' : 'bg-[#747475]')
              }
            >
              <div className="">Список пользователей</div>
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
                  key={worker.id}
                  className="mt-1 ms-4 py-2 px-2 bg-[#2B7FFF] rounded-[6px]"
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
              <div className="">Список магазинов</div>
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
                  className="mt-1 ms-4 py-2 px-2 bg-[#2B7FFF] rounded-[6px]"
                >
                  <div>{workplace.name}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default SettingsPage
