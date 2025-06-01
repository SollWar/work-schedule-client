'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useMainStore } from '../stores/useMainStore'
import { getContrastTextColor } from '../utils/colorsUtils'

const SettingsPage = () => {
  const { mainData } = useMainStore()
  const router = useRouter()
  return (
    <div>
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
        <div className="ms-2 mt-6 text-[18px] font-semibold text-black">
          Профиль
        </div>
        <div className="mx-2 mt-2 py-3 px-2 flex flex-row items-center justify-between  bg-[#2B7FFF] rounded-[6px]">
          <div className=" ">Отображаемое имя</div>
          <div className="flex flex-row h-full items-center text-gray-300">
            <div className="me-2 flex items-center justify-center">
              {mainData?.user.name ?? 'null'}
            </div>
            <div className=" ">{' >'}</div>
          </div>
        </div>
        <div className="mx-2 mt-2 px-2 h-[48px] flex flex-row items-center justify-between bg-[#2B7FFF] rounded-[6px]">
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
            <div className=" text-gray-300">{' >'}</div>
          </div>
        </div>
        <div className="mx-2 mt-2 py-3 px-2 flex flex-row items-center justify-between  bg-[#2B7FFF] rounded-[6px]">
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
            <div className="me-4 flex items-center justify-center">Обычный</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
