import { useWorkplaceData } from '@/src/hooks/useWorkplaceData'
import { useEffect, useState } from 'react'
import ModalInput from '../Dialog/ModalInput'
import ModalColorPicker from '../Dialog/ModalColorPicker'
import { useRouter } from 'next/navigation'
import { getContrastTextColor } from '@/src/utils/colorsUtils'
import { useUpdateWorkplaceData } from '../../hooks/useUpdateWorkplaceData'
import AcceptButton from '../AcceptButton'

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
  const { updateName, updateColor, createWorkplace, deleteWorkplace } =
    useUpdateWorkplaceData()
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

  const handleDeleteWorkplace = async (workplaceId: string) => {
    await deleteWorkplace(workplaceId)
    router.back()
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

        <button
          onClick={() => {
            handleDeleteWorkplace(workplaceId)
          }}
          className="bg-white px-4 h-full w-fit rounded-[6px] justify-self-end"
        >
          <img src="/trash.svg" alt="Удалить" width={24} height={24} />
        </button>
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
        <AcceptButton
          acceptClick={() => {
            createNewWorplace(name, color)
          }}
          cancelClick={router.back}
          topStyle={'grid grid-cols-2 gap-2 mt-1 mx-2'}
          height={'44px'}
          disabled={loading}
        />
      ) : (
        ''
      )}
    </>
  )
}

export default WorkplaceSetting
