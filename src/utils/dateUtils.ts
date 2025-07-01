/// Количество дней в месяце
export function getDaysInMonth(year: number, month: number): number {
  // Месяцы в JavaScript начинаются с 0 (январь = 0)
  // Создаем дату следующего месяца и отнимаем 1 день
  return new Date(year, month, 0).getDate()
}

/// С какого дня недели начинается месяц
export function getFirstWeekdayOfMonth(year: number, month: number): number {
  const day = new Date(year, month - 1, 1).getDay()
  return day === 0 ? 7 : day // Воскресенье становится 7
}

export const formatPostgresDate = (dateString: string): string => {
  const date = new Date(dateString) // Преобразуем строку в Date

  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  })
    .format(date)
    .replace(',', '') // Убираем запятую для ru-RU
}

/// Генерация числа в диапозоне от min до max
export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const MONTH: string[] = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
]
