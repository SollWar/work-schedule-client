/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'
import { useUpdateWorkerData } from '../hooks/useUpdateWorkerData'
import ModalInput from '../../../components/Modals/ModalInput'
import ModalColorPicker from '../../../components/Modals/ModalColorPicker'
import { getContrastTextColor } from '@/src/utils/colorsUtils'
import { useRouter } from 'next/navigation'
import { useWorkerData } from '@/src/hooks/useWorkerData'
import { useMainStore } from '@/src/stores/mainStore'
import AcceptButton from '../../../components/AcceptButton'
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
  const [componentState, setComponentState] = useState({
    name: nameReq,
    color: '#0070F3',
    telegramId: telegramIdReq,
    loading: false,
    modals: {
      name: false,
      color: false,
      telegramId: false,
    },
    input: {
      name: nameReq,
      telegramId: telegramIdReq,
      acces: 0,
      color: '#0070F3',
    },
  })
  const [tapTo, setTapTo] = useState({
    del: 0,
    acces: 0,
  })

  const { deleteRequest } = useRequest()
  const { mainData } = useMainStore()
  const { updateColor, updateName, createWorker, deleteWorker, updateAccess } =
    useUpdateWorkerData()
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
    if (worker && workerTelegramId) {
      setComponentState((prev) => ({
        ...prev,
        name: worker.name,
        telegramId: workerTelegramId,
        color: worker.color,
        input: {
          ...prev.input,
          name: worker.name,
          telegramId: workerTelegramId,
        },
      }))
    } else {
      setComponentState((prev) => ({
        ...prev,
        input: {
          ...prev.input,
          name: '',
        },
      }))
    }
  }, [worker, workerTelegramId])

  const doModalVisibility = (
    type: 'name' | 'color' | 'telegramId',
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

  const doDeleteWorker = async (workerId: string) => {
    if (tapTo.del + 1 === 2) {
      await deleteWorker(workerId)
      toast(componentState.name + ' удален')
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

  const doWorkerUpdate = async (
    type: 'color' | 'name' | 'telegramId' | 'acces',
    value: string | number
  ) => {
    console.log(type, value)
    setComponentState((prev) => ({
      ...prev,
      loading: true,
      [type]: value,
    }))
    if (worker) {
      switch (type) {
        case 'color': {
          await updateColor(value as string, worker.id)
          await getWorkerData(worker.id)
          toast('Цвет обновлен')
          break
        }
        case 'name': {
          await updateName(value as string, worker.id)
          await getWorkerData(worker.id)
          toast('Имя обновлено')
          break
        }
        case 'acces': {
          if (tapTo.acces + 1 === 2) {
            await updateAccess(value as number, worker.id)
            await getWorkerData(worker.id)
            toast('Доступ обновлен')
          } else {
            toast('Нажмите еще раз что-бы изменить доступ')
            setTapTo((prev) => ({
              ...prev,
              acces: tapTo.acces++,
            }))
            setTimeout(() => {
              setTapTo((prev) => ({
                ...prev,
                acces: 0,
              }))
            }, 2000)
          }
          break
        }
        case 'telegramId': {
          setComponentState((prev) => ({
            ...prev,
            telegramId: value as string,
          }))
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

  const doInputChange = (type: 'name' | 'telegramId', value: string) => {
    setComponentState((prev) => ({
      ...prev,
      input: {
        ...prev.input,
        [type]: value,
      },
    }))
  }

  const doCreateWorker = async (
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
          doModalVisibility('name', false)
        }}
        closeButton={false}
        isOpen={componentState.modals.name}
      >
        <div className="mb-2">Введите имя</div>
        <div className="flex items-center justify-center mb-4">
          <input
            type="text"
            value={componentState.input.name}
            onChange={(e) => doInputChange('name', e.target.value)}
            autoFocus={true}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                doWorkerUpdate('name', componentState.input.name)
              }
            }}
            className="py-2 px-4 w-full border-1 border-[#2B7FFF] rounded-[6px]"
          ></input>
        </div>
        <AcceptButton
          acceptClick={() => {
            doWorkerUpdate('name', componentState.input.name)
          }}
          cancelClick={() => {
            doInputChange('name', componentState.name)
            doModalVisibility('name', false)
          }}
          topStyle={'grid grid-cols-2 gap-2 mt-1'}
          height={'44px'}
          disabled={componentState.loading}
        />
      </ModalInput>
      <ModalInput
        onClose={() => {
          doModalVisibility('telegramId', false)
        }}
        closeButton={false}
        isOpen={componentState.modals.telegramId}
      >
        <div className="mb-2">Введите TelegramID</div>
        <div className="flex items-center justify-center mb-2">
          <input
            type="text"
            value={componentState.input.telegramId}
            onChange={(e) => doInputChange('telegramId', e.target.value)}
            autoFocus={true}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                doWorkerUpdate('telegramId', componentState.input.telegramId)
              }
            }}
            className="py-2 px-4 w-full border-1 border-[#2B7FFF] rounded-[6px]"
          ></input>
        </div>
        <AcceptButton
          acceptClick={() => {
            doWorkerUpdate('telegramId', componentState.input.telegramId)
          }}
          cancelClick={() => {
            doInputChange('telegramId', componentState.telegramId)
            doModalVisibility('telegramId', false)
          }}
          disabled={componentState.loading}
          topStyle={'grid grid-cols-2 gap-2 mt-1 h-[44px]'}
          height="44px"
        />
      </ModalInput>
      <ModalInput
        onClose={() => {
          doModalVisibility('color', false)
        }}
        closeButton={false}
        isOpen={componentState.modals.color}
      >
        <ModalColorPicker
          onClose={() => {
            doModalVisibility('color', false)
          }}
          userName={componentState.name}
          initColor={componentState.color}
          selectColor={(color) => doWorkerUpdate('color', color)}
        />
      </ModalInput>
      <div className="h-12 bg-white grid grid-cols-3 items-center my-1 p-1">
        <button
          onClick={() => {
            router.back()
          }}
          className="bg-[#2B7FFF] px-4 h-full w-fit rounded-[6px] justify-self-start cursor-pointer"
        >
          <img src="/arrow_back.svg" alt="Назад" width={24} height={24} />
        </button>

        <div className="ms-4 text-xl w-fit font-semibold justify-self-center">
          Настройки
        </div>
        {(workerId !== 'new' || telegramIdReq !== '') &&
          mainData?.user.access_id === 1 &&
          mainData.user.id !== worker?.id && (
            <button
              onClick={() => {
                if (
                  telegramIdReq !== '' &&
                  nameReq !== '' &&
                  workerId === 'new'
                ) {
                  handleDeleteRequest()
                } else {
                  doDeleteWorker(workerId)
                }
              }}
              className="bg-white px-4 h-full w-fit rounded-[6px] justify-self-end cursor-pointer"
            >
              <img src="/trash.svg" alt="Удалить" width={24} height={24} />
            </button>
          )}
      </div>
      <div className="flex flex-col text-white">
        <div
          onClick={() => {
            doModalVisibility('name', true)
          }}
          className="mx-2 mt-1 px-2 h-[48px] flex flex-row items-center justify-between bg-[#2B7FFF] rounded-[6px] cursor-pointer"
        >
          <div className=" ">Отображаемое имя</div>
          <div className="flex flex-row h-full items-center text-white">
            {workerId === 'new' || workerDataLoaded ? (
              <div className="me-2 flex items-center justify-center">
                {componentState.name}
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
            doModalVisibility('color', true)
          }}
          className="mx-2 mt-1 px-2 h-[48px] flex flex-row items-center justify-between bg-[#2B7FFF] rounded-[6px] cursor-pointer"
        >
          <div className=" ">Цвет в расписании</div>
          <div className="flex flex-row h-full items-center">
            {workerId === 'new' || workerDataLoaded ? (
              <div
                style={{
                  background: componentState.color,
                  color: getContrastTextColor(componentState.color),
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
            if (workerId === 'new') {
              doModalVisibility('telegramId', true)
            }
          }}
          className="mx-2 mt-1 px-2 h-[48px] flex flex-row items-center justify-between rounded-[6px] cursor-pointer"
          style={{
            background: workerId === 'new' ? '#2B7FFF' : 'gray',
          }}
        >
          <div className=" ">TelegramID</div>
          <div className="flex flex-row h-full items-center text-white">
            {workerId === 'new' || workerDataLoaded ? (
              <div className="me-2 flex items-center justify-center">
                {componentState.telegramId}
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
              {workerDataLoaded || componentState.loading ? (
                <input
                  className="size-8"
                  type="checkbox"
                  checked={worker?.access_id === 1}
                  onChange={(e) => {
                    doWorkerUpdate('acces', e.target.checked ? 1 : 0)
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
                          className="py-1 flex-1 border-2 border-white flex justify-center cursor-pointer"
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
                          className="py-1 flex-1 border-2 border-white flex justify-center cursor-pointer"
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
                disabled={componentState.loading}
                topStyle="grid grid-cols-2 gap-2 mt-2 mx-2"
                height={'48px'}
              />
            )}
          </div>
        )}
        {workerId === 'new' ? (
          <AcceptButton
            acceptClick={() => {
              doCreateWorker(
                componentState.name,
                componentState.color,
                componentState.telegramId
              )
            }}
            cancelClick={router.back}
            disabled={componentState.loading}
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
