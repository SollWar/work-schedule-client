import { placeTopBarMoke } from '../moke/topBar'
import { DateDropDown } from './DateDropDown'
import { PlaceDropDown } from './PlaceDropDown'

export const TopBar = () => {
  return (
    <div className="h-14 bg-amber-100 flex justify-between my-1 p-1">
      <div className="flex flex-row items-center">
        <div className="bg-amber-400 px-4 h-full flex items-center rounded-[6px]">
          Н
        </div>
        <PlaceDropDown
          selected={placeTopBarMoke.selected}
          workers={placeTopBarMoke.workers}
          workplaces={placeTopBarMoke.workplaces}
        />
      </div>
      <div className=" flex flex-row items-center">
        <DateDropDown selected={2025} type={'year'} items={[2025, 2026]} />
        <DateDropDown selected={5} type={'month'} items={[3, 4, 5, 6, 7]} />
      </div>
    </div>
  )
}
