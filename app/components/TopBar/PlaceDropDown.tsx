'use client'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Worker } from '../../types/Worker'
import { Workplace } from '../../types/Workplace'
import { useEffect, useRef, useState } from 'react'
import { useMainStore } from '@/app/stores/useMainStore'
import { useScheduleStore } from '@/app/stores/useScheduleStore'
import { useDateStore } from '@/app/stores/useDateStore'

export const PlaceDropDown = () => {
  const { mainData } = useMainStore()
  const { getSchedule, type, scheduleList } = useScheduleStore()
  const { year, month } = useDateStore()
  const [selected, setSelected] = useState<Worker | Workplace>(
    mainData!.availableWorkers[0]
  )
  const initialValues = useRef({ type, mainData, year, month })

  const selectWork = (type: 'worker' | 'workplace', id: string) => {
    getSchedule(type, id, year, month)
  }

  useEffect(() => {
    getSchedule(
      initialValues.current.type,
      initialValues.current.mainData!.user.id,
      initialValues.current.year,
      initialValues.current.month
    )
  }, [getSchedule])

  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger className="bg-[#2B7FFF] text-white px-4 h-full flex items-center rounded-[6px] ms-1 focus:outline-none active:outline-none">
        {selected.name}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="mt-1  bg-white rounded-[6px] border-1">
          <div className="ps-1.5 mt-0.5 text-[0.8rem] text-gray-500">
            Работники
          </div>
          {mainData?.availableWorkers.map((val) => (
            <DropdownMenu.Item
              onClick={() => {
                setSelected(val)
                selectWork('worker', val.id)
              }}
              className="px-4 py-2 cursor-pointer"
              key={val.id + val.name}
            >
              {val.name}
            </DropdownMenu.Item>
          ))}
          <div className="ps-1.5 text-[0.8rem] text-gray-500">Магазины </div>
          {mainData?.availableWorkplaces.map((val) => (
            <DropdownMenu.Item
              onClick={() => {
                setSelected(val)
                selectWork('workplace', val.id)
              }}
              className="px-4 py-2 cursor-pointer"
              key={val.id + val.name}
            >
              {val.name}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
