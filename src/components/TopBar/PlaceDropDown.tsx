'use client'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Worker } from '../../types/Worker'
import { Workplace } from '../../types/Workplace'
import { useEffect, useState } from 'react'
import { useMainStore } from '@/src/stores/mainStore'
import { useScheduleStore } from '@/src/stores/scheduleStore'
import { useDateStore } from '@/src/stores/dateStore'
import { ScheduleType } from '@/src/types/Schedule'

export const PlaceDropDown = () => {
  const { mainData, initData } = useMainStore()
  const { getSchedule, getAdminSchedule, type, currentSelected } =
    useScheduleStore()
  const { year, month, currentMonth, currentYear } = useDateStore()
  const [selected, setSelected] = useState<Worker | Workplace>()
  const adminSelected: Worker = {
    id: 'admin',
    name: 'Все',
    color: '',
    access_id: 0,
  }

  const selectWork = (type: ScheduleType, id: string) => {
    getSchedule(type, id, year, month)
  }

  useEffect(() => {
    if (currentSelected) {
      setSelected(currentSelected)
    }
  }, [currentSelected])

  useEffect(() => {
    if (mainData) {
      if (!currentSelected) {
        if (mainData.user.access_id !== 1) {
          const curInitData = initData()
          setSelected(curInitData.selected)
          getSchedule(curInitData.type, curInitData.selected.id, year, month)
        } else {
          setSelected(adminSelected)
          getAdminSchedule(
            mainData.availableWorkplaces,
            currentYear,
            currentMonth
          )
        }
      } else if (currentSelected) {
        setSelected(currentSelected)
        if (currentSelected.id === 'admin') {
          getAdminSchedule(
            mainData.availableWorkplaces,
            currentYear,
            currentMonth
          )
        } else {
          getSchedule(type, currentSelected.id, year, month)
        }
      }
    }
  }, [])

  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger className="bg-[#2B7FFF] text-white px-4 h-full flex items-center rounded-[6px] ms-1 focus:outline-none active:outline-none cursor-pointer">
        {selected?.name}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="mt-1  bg-white rounded-[6px] border-1">
          {mainData?.user.access_id === 1 && (
            <DropdownMenu.Item
              onClick={() => {
                setSelected(adminSelected)
                getAdminSchedule(
                  mainData.availableWorkplaces,
                  currentYear,
                  currentMonth
                )
              }}
              className="px-4 py-2 cursor-pointer"
              key={adminSelected.id}
            >
              {adminSelected.name}
            </DropdownMenu.Item>
          )}
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
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
