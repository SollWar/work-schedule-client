import { useRequest } from '@/src/hooks/useRequest'
import { useToastStore } from '@/src/stores/toastStore'
import clsx from 'clsx'
import { useEffect, useState } from 'react'

const RequestPage = () => {
  const { toast } = useToastStore()
  const { createRequest } = useRequest()
  const [telegramId, setTelegramId] = useState('')
  const [requestAccess, setRequestAccess] = useState<boolean>()
  const [nameInput, setNameInput] = useState('')
  const [workplaceInput, setWorkplaceInput] = useState('')

  useEffect(() => {
    const importWebApp = async () => {
      const { default: WebApp } = await import('@twa-dev/sdk')

      WebApp.ready()
      WebApp.expand()
      const params = new URLSearchParams(WebApp.initData)
      const userString = params.get('user')
      const user = JSON.parse(decodeURIComponent(userString as string))
      const telegramID: string = user.id

      setTelegramId(telegramID)
    }

    if (typeof window !== 'undefined') {
      importWebApp()
    }
  }, [])

  const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameInput(e.target.value)
  }
  const handleWorkplaceInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setWorkplaceInput(e.target.value)
  }

  const sendRequestAccess = async () => {
    const response = await createRequest(telegramId, nameInput, workplaceInput)
    if (response) {
      toast('Запрос отправлен')
    } else {
      toast('TelegramID уже используется, обратитесь к администратору')
    }
  }

  if (requestAccess === undefined) {
    return (
      <div className="flex flex-col text-xl justify-center">
        <div>Нет доступа, запросить?</div>
        <div className="grid grid-cols-2 gap-4 mt-10 cursor-pointer">
          <button
            onClick={() => {
              setRequestAccess(false)
            }}
            // disabled={disabled}
            className={clsx(
              'flex items-center justify-center rounded-[6px] border-1',
              `h-[48px]`
            )}
          >
            Нет
          </button>
          <button
            onClick={() => {
              setRequestAccess(true)
            }}
            className={clsx(
              'flex items-center justify-center rounded-[6px] text-white bg-[#2B7FFF] cursor-pointer',
              `h-[48px]`
            )}
          >
            Да
          </button>
        </div>
      </div>
    )
  } else if (requestAccess) {
    return (
      <div className="flex flex-col">
        <div className="mb-2">Имя:</div>
        <div className="flex items-center justify-center mb-2">
          <input
            type="text"
            value={nameInput}
            onChange={handleNameInputChange}
            autoFocus={true}
            className="py-2 px-4 w-full border-1 border-[#2B7FFF] rounded-[6px]"
          ></input>
        </div>
        <div className="mb-2">Место работы:</div>
        <div className="flex items-center justify-center mb-2">
          <input
            type="text"
            value={workplaceInput}
            onChange={handleWorkplaceInputChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                sendRequestAccess()
              }
            }}
            className="py-2 px-4 w-full border-1 border-[#2B7FFF] rounded-[6px]"
          ></input>
        </div>
        <button
          onClick={() => {
            sendRequestAccess()
          }}
          className={clsx(
            'flex items-center justify-center rounded-[6px] mt-4 text-white cursor-pointer',
            `h-[48px]`,
            nameInput === '' || workplaceInput === ''
              ? 'bg-[gray]'
              : 'bg-[#2B7FFF]'
          )}
          disabled={nameInput === '' || workplaceInput === ''}
        >
          Отправить запрос
        </button>
      </div>
    )
  } else {
    return (
      <div className="flex flex-col text-xl w-40">
        <div className="text-center">Ок</div>
        <button
          onClick={() => {
            setRequestAccess(undefined)
          }}
          className={clsx(
            'mt-10',
            'flex items-center justify-center rounded-[6px] text-white bg-[#2B7FFF] cursor-pointer',
            `h-[48px]`
          )}
        >
          Назад
        </button>
      </div>
    )
  }
}

export default RequestPage
