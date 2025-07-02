import { useSchedule } from '@/src/hooks/useSchedule'
import { useDateStore } from '@/src/stores/useDateStore'
import { useScheduleStore } from '@/src/stores/useScheduleStore'
import { getFiveElements } from '@/src/utils/arrayUtils'
import { getContrastTextColor } from '@/src/utils/colorsUtils'
import clsx from 'clsx'
import { AdminCalendarLLoader } from './AdminCalendarLoader/AdminCalendarLoader'
import { useMainStore } from '@/src/stores/useMainStore'

const AdminCalendar = () => {
  const { adminSchedule, getSchedule } = useScheduleStore()
  const { mainData } = useMainStore()
  const { getScheduleState } = useSchedule()
  const { currentDay, currentMonth, currentYear } = useDateStore()

  return (
    <>
      {adminSchedule.length > 0 ? (
        <div className="grid grid-cols-2 gap-2 text-xl">
          {adminSchedule.map((val) => (
            <div
              key={val.selected.id}
              className={clsx('flex flex-col items-center rounded-md')}
              style={{
                background: '#2B7FFF',
                color: 'white',
                border: `4px #2B7FFF solid`,
              }}
              onClick={() => {
                getSchedule(
                  'workplace',
                  val.selected.id,
                  currentYear,
                  currentMonth,
                  getScheduleState
                )
              }}
            >
              <div className="py-2">{val.selected.name}</div>
              {getFiveElements(val.scheduleList, currentDay - 1).map(
                (day, index) => (
                  <div
                    key={'day_' + index}
                    className="grid grid-cols-2 w-full p-2"
                    style={{
                      background: val.entities.find(
                        (entitie) => entitie.id === day?.val
                      )?.color,
                      color: getContrastTextColor(
                        val.entities.find((entitie) => entitie.id === day?.val)
                          ?.color ?? '#2B7FFF'
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
                        val.entities.find((entitie) => entitie.id === day?.val)
                          ?.name
                      }
                    </div>
                    <div className="text-right me-4">
                      {day && day.index + 1}
                    </div>
                  </div>
                )
              )}
            </div>
          ))}
        </div>
      ) : (
        <AdminCalendarLLoader
          workplaceCount={mainData?.availableWorkplaces.length ?? 4}
        />
      )}
    </>
  )
}

export default AdminCalendar
