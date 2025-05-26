import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

interface PlaceDropDownProps {
  selected: string
  workers: string[]
  workplaces: string[]
}

export const PlaceDropDown = ({
  selected,
  workers,
  workplaces,
}: PlaceDropDownProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="bg-amber-400 px-4 h-full flex items-center rounded-[6px] ms-1 focus:outline-none active:outline-none">
        {selected}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="mt-1  bg-white rounded-[6px] border-1">
          <div className="ps-1.5 mt-0.5 text-[0.8rem] text-gray-500">
            Работники
          </div>
          {workers.map((val, ind) => (
            <DropdownMenu.Item className="px-4 py-2" key={val}>
              <button>{val}</button>
            </DropdownMenu.Item>
          ))}
          <div className="ps-1.5 text-[0.8rem] text-gray-500">Магазины </div>
          {workplaces.map((val, ind) => (
            <DropdownMenu.Item className="px-4 py-2" key={val}>
              <button>{val}</button>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
