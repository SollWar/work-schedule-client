'use client'
import { DateDropDown } from './DateDropDown'
import { PlaceDropDown } from './PlaceDropDown'
import SidebarMenu from './SidebarMenu'

export const TopBar = () => {
  return (
    <div className="h-14 bg-[#F0FEDD] flex justify-between my-1 p-1">
      <div className="flex flex-row items-center">
        <SidebarMenu />
        <PlaceDropDown />
      </div>
      <div className=" flex flex-row items-center">
        <DateDropDown type={'year'} items={[2025, 2026]} />
        <DateDropDown type={'month'} items={[3, 4, 5, 6, 7]} />
      </div>
    </div>
  )
}
