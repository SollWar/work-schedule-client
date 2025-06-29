'use client'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Worker } from '../../types/Worker'
import { Workplace } from '../../types/Workplace'
import { useEffect, useRef, useState } from 'react'
import { useMainStore } from '@/src/stores/useMainStore'
import { useScheduleStore } from '@/src/stores/useScheduleStore'
import { useDateStore } from '@/src/stores/useDateStore'

export const PlaceDropDown = () => {
  const { mainData } = useMainStore()
  const { getSchedule, type, schedule_id } = useScheduleStore()
  const { year, month } = useDateStore()
  const [selected, setSelected] = useState<Worker | Workplace>(mainData?.user!)
  const initialValues = useRef({ type, mainData, year, month })

  const selectWork = (type: 'worker' | 'workplace', id: string) => {
    getSchedule(type, id, year, month)
  }

  //TODO(После экрана настроек неверное отображение. Дима->М7->Настройки->Назад)
  useEffect(() => {
    getSchedule(
      'worker',
      initialValues.current.mainData?.user.id!,
      initialValues.current.year,
      initialValues.current.month
    )
  }, [])

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
