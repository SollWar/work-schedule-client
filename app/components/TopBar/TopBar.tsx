'use client'
import { useRouter } from 'next/navigation'
import { DateDropDown } from './DateDropDown'
import { PlaceDropDown } from './PlaceDropDown'
import { useDateStore } from '@/app/stores/useDateStore'
import Image from 'next/image'
import { useThemeStore } from '@/app/stores/useThemeStore'

export const TopBar = () => {
  const router = useRouter()
  const { themeConst } = useThemeStore()
  const { currentYear } = useDateStore()

  return (
    <div className="h-14 bg-white flex justify-between my-1 p-1">
      <div className="flex flex-row items-center">
        <button
          className="px-4 h-full flex items-center rounded-[6px]"
          style={{
            background: themeConst.button,
          }}
          onClick={() => {
            router.push('/settings')
          }}
        >
          <Image src={'/setting.svg'} alt="Настройки" width={24} height={24} />
        </button>
        <PlaceDropDown />
      </div>
      <div className=" flex flex-row items-center">
        <DateDropDown
          type={'year'}
          items={[currentYear - 1, currentYear, currentYear + 1]}
        />
        <DateDropDown
          type={'month'}
          items={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
        />
      </div>
    </div>
  )
}
