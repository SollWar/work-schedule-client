/* eslint-disable @next/next/no-img-element */
import { useWorkplaceData } from '@/src/hooks/useWorkplaceData'
import { useEffect, useState } from 'react'
import ModalInput from '../../components/Modals/ModalInput'
import ModalColorPicker from '../../components/Modals/ModalColorPicker'
import { useRouter } from 'next/navigation'
import { getContrastTextColor } from '@/src/utils/colorsUtils'
import { useUpdateWorkplaceData } from '../hooks/useUpdateWorkplaceData'
import AcceptButton from '../../components/AcceptButton'
import { useToastStore } from '@/src/stores/toastStore'

interface WorkplaceSettingProps {
  workplaceId: string
}

const WorkplaceSetting = ({ workplaceId }: WorkplaceSettingProps) => {
  const router = useRouter()
  const { toast } = useToastStore()
  const [componentState, setComponentState] = useState({
    name: '',
    color: '#0070F3',
    loading: false,
    modals: {
      name: false,
      color: false,
    },
    input: {
      name: '',
    },
  })

  const [tapTo, setTapTo] = useState({
    del: 0,
  })

  const { workplace, getWorkplaceData } = useWorkplaceData()
  const { updateName, updateColor, createWorkplace, deleteWorkplace } =
    useUpdateWorkplaceData()

  useEffect(() => {
    if (workplaceId !== 'new') {
      getWorkplaceData(workplaceId)
    }
  }, [])

  useEffect(() => {
    if (workplace) {
      setComponentState((prev) => ({
        ...prev,
        name: workplace.name,
        color: workplace.color,
        input: {
          ...prev.input,
          name: workplace.name,
        },
      }))
    }
  }, [workplace])

  const handleInputChange = (type: 'name' | 'color', value: string) => {
    console.log(type, value)
    setComponentState((prev) => ({
      ...prev,
      input: {
        ...prev.input,
        [type]: value,
      },
    }))
  }

  const handleModalVisibility = (
    type: 'name' | 'color',
    visibility: boolean
  ) => {
    setComponentState((prev) => ({
      ...prev,
      modals: {
        ...prev.modals,
        [type]: visibility,
      },
    }))
  }

  const handleWorkplaceProp = async (type: 'color' | 'name', value: string) => {
    setComponentState((prev) => ({
      ...prev,
      loading: true,
      [type]: value,
    }))
    if (workplace) {
      switch (type) {
        case 'color': {
          await updateColor(value, workplace.id)
          await getWorkplaceData(workplace.id)
          toast('Цвет обновлен')
          break
        }
        case 'name': {
          await updateName(value, workplace.id)
          await getWorkplaceData(workplace.id)
          toast('Название обновлено')
          break
        }
      }
    }
    setComponentState((prev) => ({
      ...prev,
      loading: false,
      modals: {
        ...prev.modals,
        [type]: false,
      },
    }))
  }

  const handleDeleteWorkplace = async (workplaceId: string) => {
    if (tapTo.del + 1 === 2) {
      await deleteWorkplace(workplaceId)
      toast(workplace?.name + ' удален')
      router.back()
    } else {
      toast('Нажмите еще раз для удаления')
      setTapTo((prev) => ({
        ...prev,
        del: tapTo.del++,
      }))
      setTimeout(() => {
        setTapTo((prev) => ({
          ...prev,
          del: 0,
        }))
      }, 2000)
    }
  }

  const handleCreateWorplace = async (name: string, color: string) => {
    if (name !== '' && color !== '') {
      await createWorkplace(name, color)
      toast(name + ' создан')
      router.back()
    }
  }

  return (
    <>
      <ModalInput
        onClose={() => {
          handleModalVisibility('name', false)
        }}
        closeButton={false}
        isOpen={componentState.modals.name}
      >
        <div className="mb-2">Введите имя</div>
        <div className="flex items-center justify-center mb-4">
          <input
            type="text"
            id="name"
            value={componentState.input.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            autoFocus={true}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleWorkplaceProp('name', componentState.input.name)
              }
            }}
            className="py-2 px-4 w-full border-1 border-[#2B7FFF] rounded-[6px]"
          ></input>
        </div>
        <AcceptButton
          acceptClick={() => {
            handleWorkplaceProp('name', componentState.input.name)
          }}
          cancelClick={() => {
            handleInputChange('name', componentState.name)
            handleModalVisibility('name', false)
          }}
          topStyle={'grid grid-cols-2 gap-2 mt-1'}
          height={'44px'}
          disabled={componentState.loading}
        />
      </ModalInput>
      <ModalInput
        onClose={() => {
          handleModalVisibility('color', false)
        }}
        closeButton={false}
        isOpen={componentState.modals.color}
      >
        <ModalColorPicker
          onClose={() => {
            handleModalVisibility('color', false)
          }}
          userName={componentState.name}
          initColor={componentState.color}
          selectColor={(color) => handleWorkplaceProp('color', color)}
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
        {workplaceId !== 'new' && (
          <button
            onClick={() => {
              handleDeleteWorkplace(workplaceId)
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
            handleModalVisibility('name', true)
          }}
          className="mx-2 mt-2 py-3 px-2 flex flex-row items-center justify-between  bg-[#2B7FFF] rounded-[6px]"
        >
          <div className=" ">Отображаемое имя</div>
          <div className="flex flex-row h-full items-center text-white">
            <div className="me-2 flex items-center justify-center">
              {componentState.name}
            </div>
            <div className=" ">{' >'}</div>
          </div>
        </div>
        <div
          onClick={() => handleModalVisibility('color', true)}
          className="mx-2 mt-2 mb-1 px-2 h-[48px] flex flex-row items-center justify-between bg-[#2B7FFF] rounded-[6px]"
        >
          <div className=" ">Цвет в расписании</div>
          <div className="flex flex-row h-full items-center">
            <div
              style={{
                background: componentState.color,
                color: getContrastTextColor(componentState.color),
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
          acceptClick={() =>
            handleCreateWorplace(componentState.name, componentState.color)
          }
          cancelClick={router.back}
          topStyle={'grid grid-cols-2 gap-2 mt-1 mx-2'}
          height={'44px'}
          disabled={componentState.loading}
        />
      ) : (
        ''
      )}
    </>
  )
}

export default WorkplaceSetting
