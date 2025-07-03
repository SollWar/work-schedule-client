import { useDateStore } from '@/src/stores/dateStore'
import { useScheduleStore } from '@/src/stores/scheduleStore'
import { getFiveElements } from '@/src/utils/arrayUtils'
import { getContrastTextColor } from '@/src/utils/colorsUtils'
import clsx from 'clsx'
import { AdminCalendarLLoader } from './AdminCalendarLoader/AdminCalendarLoader'
import { useMainStore } from '@/src/stores/mainStore'

const AdminCalendar = () => {
  const { adminSchedule, getSchedule, isLoading } = useScheduleStore()
  const { mainData } = useMainStore()
  const { currentDay, currentMonth, currentYear } = useDateStore()

  return (
    <>
      <div
        className={`transition-opacity duration-400 ease-in-out ${
          isLoading ? 'opacity-50 pointer-events-none' : 'opacity-100'
        }`}
      >
        {adminSchedule.length > 0 && (
          <div className="grid grid-cols-2 gap-2 text-xl">
            {adminSchedule.map((val) => (
              <div
                key={val.selected.id}
                className="flex flex-col items-center rounded-md bg-[#2B7FFF] text-white border-4 border-[#2B7FFF] cursor-pointer"
                onClick={() => {
                  getSchedule(
                    'workplace',
                    val.selected.id,
                    currentYear,
                    currentMonth
                  )
                }}
              >
                <div className="py-1">{val.selected.name}</div>
                {getFiveElements(val.scheduleList, currentDay - 1).map(
                  (day, index) => (
                    <div
                      key={'day_' + index}
                      className={clsx(
                        'flex flex-row w-full p-1 justify-between items-center'
                      )}
                      style={{
                        background: val.entities.find(
                          (entitie) => entitie.id === day?.val
                        )?.color,
                        color: getContrastTextColor(
                          val.entities.find(
                            (entitie) => entitie.id === day?.val
                          )?.color ?? '#2B7FFF'
                        ),
                        borderTopLeftRadius: index === 0 ? '6px' : '0px',
                        borderTopRightRadius: index === 0 ? '6px' : '0px',
                        borderBottomLeftRadius: index === 3 ? '6px' : '0px',
                        borderBottomRightRadius: index === 3 ? '6px' : '0px',
                        border: '1px white solid',
                      }}
                    >
                      <div className="ms-4">
                        {
                          val.entities.find(
                            (entitie) => entitie.id === day?.val
                          )?.name
                        }
                      </div>
                      <div
                        className="aspect-square h-9 flex items-center justify-center border-1 rounded-md"
                        style={{
                          background:
                            day?.index === currentDay - 1 ? '#2B7FFF' : '',
                          color: day?.index === currentDay - 1 ? 'white' : '',
                        }}
                      >
                        {day && day.index + 1}
                      </div>
                    </div>
                  )
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {isLoading && (
        <AdminCalendarLLoader
          workplaceCount={mainData?.availableWorkplaces.length ?? 4}
        />
      )}
    </>
  )
}

export default AdminCalendar
