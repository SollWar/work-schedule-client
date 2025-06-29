import Image from 'next/image'
import { useWorkplaceData } from '@/src/hooks/useWorkplaceData'
import { useEffect, useState } from 'react'
import ModalInput from '../Dialog/ModalInput'
import ModalColorPicker from '../Dialog/ModalColorPicker'
import { useRouter } from 'next/navigation'
import { getContrastTextColor } from '@/src/utils/colorsUtils'
import { useUpdateWorkplaceData } from '../../hooks/useUpdateWorkplaceData'

interface WorkplaceSettingProps {
  workplaceId: string
}

const WorkplaceSetting = ({ workplaceId }: WorkplaceSettingProps) => {
  const { workplace, getWorkplaceData } = useWorkplaceData()
  const [nameModalOpen, setNameModalOpen] = useState(false)
  const [color, setColor] = useState('#0070F3')
  const [name, setName] = useState('Магазин')
  const [colorPickerModalOpen, setColorPickerModalOpen] = useState(false)
  const [nameInput, setNameInput] = useState('')
  const [loading, setLoading] = useState(false)
  const { updateName, updateColor, createWorkplace } = useUpdateWorkplaceData()
  const router = useRouter()

  useEffect(() => {
    if (workplaceId !== 'new') {
      getWorkplaceData(workplaceId)
    }
  }, [])

  useEffect(() => {
    if (workplace) {
      setNameInput(workplace.name)
      setName(workplace.name)
      setColor(workplace.color)
    } else {
      setNameInput('Магазин')
    }
  }, [workplace])

  const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value)
  }

  const handleColorUpdate = async (color: string) => {
    setColor(color)
    if (workplace) {
      setLoading(true)
      await updateColor(color, workplace.id)
      await getWorkplaceData(workplace.id)
      setLoading(true)
      setColorPickerModalOpen(false)
    } else {
      setColorPickerModalOpen(false)
    }
  }

  const handleNameUpdate = async (name: string) => {
    setName(name)
    if (workplace) {
      setLoading(true)
      await updateName(name, workplace.id)
      await getWorkplaceData(workplace.id)
      setNameModalOpen(false)
      setLoading(false)
    } else {
      setNameModalOpen(false)
    }
  }

  const createNewWorplace = async (name: string, color: string) => {
    if (name !== '' && color !== '') {
      await createWorkplace(name, color)
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
      <div className="h-12 bg-white flex justify-between my-1 p-1">
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
      <div className="ms-2">Магазин</div>
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
        </div>{' '}
      </div>
      {workplaceId === 'new' ? (
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
              createNewWorplace(name, color)
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
    </>
  )
}

export default WorkplaceSetting
