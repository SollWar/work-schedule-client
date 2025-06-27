'use client'
import { useDateDropDown } from '@/src/hooks/useDateDropDown'
import { MONTH } from '@/src/utils/dateUtils'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

interface DateDropDownProps {
  type: 'year' | 'month'
  items: number[]
}

export const DateDropDown = ({ type, items }: DateDropDownProps) => {
  const { year, month, selectDate } = useDateDropDown(type)

  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger className="bg-[#2B7FFF] text-white px-4 h-full flex items-center rounded-[6px] ms-1 focus:outline-none active:outline-none">
        {type === 'year' ? year : MONTH[month - 1]}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="m-1 bg-white rounded-[6px] border-1">
          {items.map((val) => (
            <DropdownMenu.Item
              onSelect={() => {
                selectDate(val)
              }}
              className="px-4 py-2 cursor-default"
              key={val}
            >
              {type === 'year' ? val : MONTH[val - 1]}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
