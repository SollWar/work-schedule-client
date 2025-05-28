import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { ReactNode, useState } from 'react'
import { CalendarEntities } from './Calendar'
import { getContrastTextColor } from '@/app/utils/colorsUtils'

interface CalendarDropDownProps {
  day: number
  items: CalendarEntities[]
  children: ReactNode
  onSelectChange: (day: number, value: string) => void
}

export const CalendarDropDown = ({
  day,
  items,
  children,
  onSelectChange,
}: CalendarDropDownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <DropdownMenu.Root
      onOpenChange={(open) => {
        setIsOpen(open)
      }}
      modal={false}
    >
      <DropdownMenu.Trigger
        style={{
          border: isOpen ? '2px red dashed' : '',
        }}
        className="rounded-[6px] w-full h-full flex justify-center items-center text-2xl focus:outline-none active:outline-none"
      >
        {children}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="p-1 mx-1 bg-white rounded-[6px] border-1">
          {items.map((val, ind) => (
            <DropdownMenu.Item
              style={{
                background: val.color,
                color: getContrastTextColor(val.color),
              }}
              className="text-xl p-2.5 px-5 rounded-[6px] mb-0.5"
              key={ind}
              onClick={() => {
                setTimeout(() => onSelectChange(day, val.id), 0)
              }}
            >
              {val.name}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
