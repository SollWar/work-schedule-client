import { Worker } from '@/app/types/Worker'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useUpdateUserData } from '../../hooks/useUpdateUserData'
import ModalInput from '../Dialog/ModalInput'
import ModalColorPicker from '../Dialog/ModalColorPicker'
import { getContrastTextColor } from '@/app/utils/colorsUtils'
import { useMainStore } from '@/app/stores/useMainStore'
import { useRouter } from 'next/navigation'
import { useWorkerData } from '@/app/hooks/useWorkerData'
import { useGetData } from '../../hooks/useGetData'

interface UserSettingProps {
  workerId: string
}

const UserSetting = ({ workerId }: UserSettingProps) => {
  const [nameModalOpen, setNameModalOpen] = useState(false)
  const [colorPickerModalOpen, setColorPickerModalOpen] = useState(false)
  const [nameInput, setNameInput] = useState('')
  const { updateColor, updateName } = useUpdateUserData()
  const [loading, setLoading] = useState(false)
  const { worker, workplacesForSetting, getWorkerWorkplaces, getWorkerData } =
    useWorkerData()
  const [checked1, setChecked1] = useState<boolean>(false)
  const [checked2, setChecked2] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    getWorkerData(workerId)
    getWorkerWorkplaces(workerId)
  }, [])

  useEffect(() => {
    if (worker) {
      setNameInput(worker.name)
    }
  }, [worker])

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked1(event.target.checked)
  }

  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked2(event.target.checked)
  }

  const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value)
  }

  const handleColorUpdate = async (color: string) => {
    if (worker) {
      setLoading(true)
      await updateColor(color, worker.id)
      await getWorkerData(worker.id)
      setLoading(true)
      setColorPickerModalOpen(false)
    }
  }

  const handleNameUpdate = async (name: string) => {
    if (worker) {
      setLoading(true)
      await updateName(name, worker.id)
      await getWorkerData(worker.id)
      setNameModalOpen(false)
      setLoading(false)
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
          setColorPickerModalOpen(false)
        }}
        closeButton={false}
        isOpen={colorPickerModalOpen}
      >
        <ModalColorPicker
          onClose={() => {
            setColorPickerModalOpen(false)
          }}
          userName={worker?.name ?? 'null'}
          initColor={worker?.color ?? '#2B7FFF'}
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
              {worker?.name ?? 'null'}
            </div>
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
                background: worker?.color ?? '#0070F3',
                color: getContrastTextColor(worker?.color ?? '#0070F3'),
              }}
              className="h-[90%] aspect-square me-2 flex items-center justify-center border-2 border-white rounded-[6px]"
            >
              27
            </div>
            <div className=" text-white">{' >'}</div>
          </div>
        </div>
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
                  onChange={handleChange1}
                />
              </div>
              {workplace.enabled && (
                <div className="bg-white mt-1">
                  <div className="flex flex-row items-center justify-between">
                    <div
                      className="py-1 flex-1 border-2 border-white flex justify-center"
                      style={{
                        background: !workplace.editable ? '#2B7FFF' : 'white',
                        color: !workplace.editable ? 'white' : 'black',
                      }}
                    >
                      Чтение
                    </div>
                    <div
                      className="py-1 flex-1 border-2 border-white flex justify-center"
                      style={{
                        background: workplace.editable ? '#2B7FFF' : 'white',
                        color: workplace.editable ? 'white' : 'black',
                      }}
                    >
                      Запись
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </>
  )
}

export default UserSetting
