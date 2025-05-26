import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { ReactNode } from 'react'
import { CalendarEntities } from './Calendar'
import { getContrastTextColor } from '@/app/utils/colorsUtils'

interface CalendarDropDownProps {
  items: CalendarEntities[]
  children: ReactNode
}

export const CalendarDropDown = ({
  items,
  children,
}: CalendarDropDownProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="w-full h-full flex justify-center items-center text-2xl focus:outline-none active:outline-none">
        {children}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="p-1 bg-white rounded-[6px] border-1">
          {items.map((val, ind) => (
            <DropdownMenu.Item
              style={{
                background: val.color,
                color: getContrastTextColor(val.color),
              }}
              className="text-xl p-2.5 px-5 rounded-[6px] mb-0.5"
              key={ind}
            >
              <button>{val.name}</button>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
