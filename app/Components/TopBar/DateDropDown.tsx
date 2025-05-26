import { MONTH } from '@/app/utils/dateUtils'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

interface DateDropDownProps {
  type: 'year' | 'month'
  selected: number
  items: number[]
}

export const DateDropDown = ({ type, selected, items }: DateDropDownProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="bg-amber-400 px-4 h-full flex items-center rounded-[6px] ms-1 focus:outline-none active:outline-none">
        {type === 'year' ? selected : MONTH[selected - 1]}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="m-1 bg-white rounded-[6px] border-1">
          {items.map((val, ind) => (
            <DropdownMenu.Item className="px-4 py-2" key={val}>
              <button>{type === 'year' ? val : MONTH[val - 1]}</button>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
