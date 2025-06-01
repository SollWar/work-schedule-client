'use client'
import { useRouter } from 'next/navigation'
import { DateDropDown } from './DateDropDown'
import { PlaceDropDown } from './PlaceDropDown'

export const TopBar = () => {
  const router = useRouter()

  return (
    <div className="h-14 bg-white flex justify-between my-1 p-1">
      <div className="flex flex-row items-center">
        <button
          className="bg-amber-400 px-4 h-full flex items-center rounded-[6px]"
          onClick={() => {
            router.push('/settings')
          }}
        >
          H
        </button>
        <PlaceDropDown />
      </div>
      <div className=" flex flex-row items-center">
        <DateDropDown type={'year'} items={[2025, 2026]} />
        <DateDropDown type={'month'} items={[3, 4, 5, 6, 7]} />
      </div>
    </div>
  )
}
