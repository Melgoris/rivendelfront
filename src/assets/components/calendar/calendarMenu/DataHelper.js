import {format, addDays} from 'date-fns'

export const raidHalperData = (
  dataStart,
  raidCount,
  daysCount,
  getHour,
  getMinute,
  dataTitle,
  dataDescript,
  raidDifs,
) => {
  if (dataStart) {
    const newEvents = []
    let currentStartDate = new Date(dataStart)
    for (let i = 0; i < (raidCount || 1); i++) {
      const endDate = new Date(currentStartDate)
      endDate.setHours(
        currentStartDate.getHours() + Number(getHour),
        currentStartDate.getMinutes() + Number(getMinute),
      )

      const formattedStart = format(currentStartDate, 'yyyy-MM-dd HH:mm')
      const formattedEnd = format(endDate, 'yyyy-MM-dd HH:mm')

      newEvents.push({
        description: dataDescript,
        start: formattedStart,
        end: formattedEnd,
        calendarId: raidDifs.toLowerCase(),
        raidDif: raidDifs,
        title: `${
          dataTitle ? dataTitle + ' ' + (i + 1) : 'Рейд' + ' - ' + (i + 1)
        }`,
      })

      currentStartDate = new Date(endDate)
    }

    const firstDayEvents = [...newEvents]
    for (let day = 1; day < (Number(daysCount) || 1); day++) {
      firstDayEvents.forEach(event => {
        const newStart = addDays(new Date(event.start), day)
        const newEnd = addDays(new Date(event.end), day)

        newEvents.push({
          title: event.title,
          start: format(newStart, 'yyyy-MM-dd HH:mm'),
          end: format(newEnd, 'yyyy-MM-dd HH:mm'),
          raidDif: event.raidDif,
          calendarId: event.calendarId,
          description: event.description,
        })
      })
    }

    console.log('Массив рейдов:', newEvents)
    return newEvents
  }

  return []
}

export const roundTimeHalper = dateTimeString => {
  const date = new Date(dateTimeString)
  const minutes = date.getMinutes()

  if (minutes < 30) {
    date.setMinutes(0)
  } else if (minutes >= 30) {
    date.setMinutes(0)
    date.setHours(date.getHours() + 1)
  } else {
    return date
  }

  date.setSeconds(0)
  date.setMilliseconds(0)
  console.log('sha', date)
  return date.toISOString().slice(0, 16).replace('T', ' ')
}

export const currentTime = format(new Date(), 'yyyy-MM-dd')

export const themeData = {
  heroic: {
    colorName: 'heroic',
    lightColors: {
      main: '#1c7df9',
      container: '#d2e7ff',
      onContainer: '#002859',
    },
  },
  unsaved: {
    colorName: 'unsaved',
    lightColors: {
      main: '#2E8B57',
      container: '#90EE90',
      onContainer: '#002859',
    },
  },
  fp: {
    colorName: 'fp',
    lightColors: {
      main: '#FFD700',
      container: '#F0E68C',
      onContainer: '#002859',
    },
  },
  atp: {
    colorName: 'atp',
    lightColors: {
      main: '#FF6347',
      container: '#FFDAB9',
      onContainer: '#002859',
    },
  },
  mythic: {
    colorName: 'mythic',
    lightColors: {
      main: '#FF7F50',
      container: '#ffc7b3',
      onContainer: '#002859',
    },
  },

  normal: {
    colorName: 'normal',
    lightColors: {
      main: '#ffcc00',
      container: '#fff0b3',
      onContainer: '#002859',
    },
  },
}
//  с гугл таблицы форматируем строку времени которую уже отформатировали раньше.
export const formatDateTime = (dateStr, timeStr) => {
  const dateParts = dateStr.match(
    /(?<dayName>\w+) (?<day>\d{2})[a-z]{2} (?<month>\w+)/,
  )
  if (!dateParts || !dateParts.groups) return null
  const {dayName, day, month} = dateParts.groups
  const monthMap = {
    January: '01',
    February: '02',
    March: '03',
    April: '04',
    May: '05',
    June: '06',
    July: '07',
    August: '08',
    September: '09',
    October: '10',
    November: '11',
    December: '12',
  }

  const formattedDate = {
    day: dayName,
    date: `${new Date().getFullYear()}-${monthMap[month] || '01'}-${String(
      parseInt(day, 10) + 1,
    ).padStart(2, '0')}`,
    time: timeStr,
    timeAfter: addOneHour(timeStr) || undefined, // Новое поле
  }
  return formattedDate
}

//  на +1 час
const addOneHour = timeStr => {
  if (typeof timeStr !== 'string' || !timeStr.includes(':')) {
    console.error('Некорректный формат времени:', timeStr)
    return null
  }
  const [hours, minutes] = timeStr?.split(':').map(Number)
  const newHours = (hours + 1) % 24 // Чтобы не выходить за 24 часа
  return `${String(newHours).padStart(2, '0')}:${String(minutes).padStart(
    2,
    '0',
  )}`
}

export const befPostModifParseEvents = formatedMassive => {
  if (!Array.isArray(formatedMassive)) {
    console.error('Пришла хуйня с таблиц, пофикси:', formatedMassive)
    return []
  }
  try {
    return formatedMassive.map(fullDay => {
      if (!Array.isArray(fullDay)) {
        console.error('Шакалит какой-то массив дней:', fullDay)
        return []
      }
      return fullDay.map(oneEvent => {
        return {
          title: oneEvent.raidlvl,
          start: `${oneEvent.date} ${oneEvent.time}`,
          end: `${oneEvent.date} ${oneEvent.timeAfter}`,
          calendarId:
            oneEvent.raidlvl?.trim().split(/\s+/)[0].toLowerCase() || 'work',
          raidDif: oneEvent.raidlvl || 'heroic',
        }
      })
    })
  } catch (error) {
    console.error('Проблемы модификации даннх в спарсенном массиве', error)
  }
}

export const testData = [
  [
    ['Tuesday 04th February'],
    ['UNSAVED HEROIC', '06:00 PM EST', '02:00', 'Xpom'],
    ['HEROIC', '07:30 PM EST', '03:30', 'Xpom'],
    ['HEROIC', '09:00 PM EST', '05:00', 'Xpom'],
    ['HEROIC', '10:30 PM EST', '06:30', 'Xpom'],
  ],
  [
    ['Wednesday 05th February'],
    ['HEROIC', '07:30 PM EST', '03:30', 'Xpom'],
    ['HEROIC', '09:00 PM EST', '05:00', 'Xpom'],
    ['HEROIC', '10:30 PM EST', '06:30', 'Xpom'],
    ['HEROIC', '11:59 PM EST', '08:00', 'Xpom'],
  ],
  [
    ['Thursday 06th February'],
    ['UNSAVED HEROIC', '07:30 PM EST', '03:30', 'Xpom'],
    ['HEROIC', '09:00 PM EST', '05:00', 'Xpom'],
    ['FP 26', '10:30 PM EST', '06:30', 'Xpom'],
    ['UNSAVED HEROIC', '11:59 PM EST', '08:00', 'Xpom'],
  ],
  [
    ['Friday 07th February'],
    ['UNSAVED HEROIC', '07:30 PM EST', '03:30', 'Xpom'],
    ['HEROIC', '09:00 PM EST', '05:00', 'Xpom'],
    ['HEROIC', '10:30 PM EST', '06:30', 'Xpom'],
    ['UNSAVED HEROIC', '11:59 PM EST', '08:00', 'Xpom'],
  ],
  [
    ['Saturday 08th February'],
    ['UNSAVED HEROIC', '07:30 PM EST', '03:30', 'Xpom'],
    ['HEROIC', '09:00 PM EST', '05:00', 'Xpom'],
    ['HEROIC', '10:15 PM EST', '06:15', 'Xpom'],
    ['HEROIC', '11:30 PM EST', '07:30', 'Xpom'],
  ],
  [
    ['Sunday 09th February'],
    ['UNSAVED HEROIC', '07:30 PM EST', '03:30', 'Xpom'],
    ['HEROIC', '09:00 PM EST', '05:00', 'Xpom'],
    ['HEROIC', '10:30 PM EST', '06:30', 'Xpom'],
    ['HEROIC', '11:59 PM EST', '08:00', 'Xpom'],
  ],
  [
    ['Monday 10th February'],
    ['Mythic ATP 4/8', '07:30 PM EST', '03:30', 'Xpom'],
    ['Mythic ATP/FP 4/8', '08:30 PM EST', '04:30', 'Xpom'],
    ['HEROIC', '10:00 PM EST', '06:00', 'Xpom'],
    ['HEROIC', '11:30 PM EST', '07:30', 'Xpom'],
  ],
  [
    ['Tuesday 11th February'],
    ['Saturday 08th February          05:00 PM EST'],
    ['Saturday 08th February             08:00 PM EST'],
    ['Saturday 08th February     10:00 PM EST'],
    ['Saturday 09th February         05:00 PM EST'],
  ],
]

export const autoUpdateData = [
  [
    {
      title: 'UNSAVED HEROIC',
      start: '2025-02-05 02:00',
      end: '2025-02-05 03:00',
      calendarId: 'unsaved',
      raidDif: 'UNSAVED HEROIC',
    },
    {
      title: 'HEROIC',
      start: '2025-02-05 04:30',
      end: '2025-02-05 05:30',
      calendarId: 'heroic',
      raidDif: 'HEROIC',
    },
    {
      title: 'HEROIC',
      start: '2025-02-05 06:00',
      end: '2025-02-05 07:00',
      calendarId: 'heroic',
      raidDif: 'HEROIC',
    },
    {
      title: 'HEROIC',
      start: '2025-02-05 08:30',
      end: '2025-02-05 08:30',
      calendarId: 'heroic',
      raidDif: 'HEROIC',
    },
  ],
  [
    {
      title: 'HEROIC',
      start: '2025-02-06 03:30',
      end: '2025-02-06 04:30',
      calendarId: 'heroic',
      raidDif: 'HEROIC',
    },
    {
      title: 'HEROIC',
      start: '2025-02-06 05:00',
      end: '2025-02-06 06:00',
      calendarId: 'heroic',
      raidDif: 'HEROIC',
    },
    {
      title: 'HEROIC',
      start: '2025-02-06 06:30',
      end: '2025-02-06 07:30',
      calendarId: 'heroic',
      raidDif: 'HEROIC',
    },
    {
      title: 'HEROIC',
      start: '2025-02-06 08:00',
      end: '2025-02-06 09:00',
      calendarId: 'heroic',
      raidDif: 'HEROIC',
    },
  ],
  [
    {
      title: 'UNSAVED HEROIC',
      start: '2025-02-07 03:30',
      end: '2025-02-07 04:30',
      calendarId: 'unsaved',
      raidDif: 'UNSAVED HEROIC',
    },
    {
      title: 'HEROIC',
      start: '2025-02-07 05:00',
      end: '2025-02-07 06:00',
      calendarId: 'heroic',
      raidDif: 'HEROIC',
    },
    {
      title: 'FP 26',
      start: '2025-02-07 06:30',
      end: '2025-02-07 07:30',
      calendarId: 'fp',
      raidDif: 'FP 26',
    },
    {
      title: 'UNSAVED HEROIC',
      start: '2025-02-07 08:00',
      end: '2025-02-07 09:00',
      calendarId: 'unsaved',
      raidDif: 'UNSAVED HEROIC',
    },
  ],
  [
    {
      title: 'UNSAVED HEROIC',
      start: '2025-02-08 03:30',
      end: '2025-02-08 04:30',
      calendarId: 'unsaved',
      raidDif: 'UNSAVED HEROIC',
    },
    {
      title: 'HEROIC',
      start: '2025-02-08 05:00',
      end: '2025-02-08 06:00',
      calendarId: 'heroic',
      raidDif: 'HEROIC',
    },
    {
      title: 'HEROIC',
      start: '2025-02-08 06:30',
      end: '2025-02-08 07:30',
      calendarId: 'heroic',
      raidDif: 'HEROIC',
    },
    {
      title: 'UNSAVED HEROIC',
      start: '2025-02-08 08:00',
      end: '2025-02-08 09:00',
      calendarId: 'unsaved',
      raidDif: 'UNSAVED HEROIC',
    },
  ],
  [
    {
      title: 'UNSAVED HEROIC',
      start: '2025-02-09 03:30',
      end: '2025-02-09 04:30',
      calendarId: 'unsaved',
      raidDif: 'UNSAVED HEROIC',
    },
    {
      title: 'HEROIC',
      start: '2025-02-09 05:00',
      end: '2025-02-09 06:00',
      calendarId: 'heroic',
      raidDif: 'HEROIC',
    },
    {
      title: 'HEROIC',
      start: '2025-02-09 06:15',
      end: '2025-02-09 07:15',
      calendarId: 'heroic',
      raidDif: 'HEROIC',
    },
    {
      title: 'HEROIC',
      start: '2025-02-09 07:30',
      end: '2025-02-09 08:30',
      calendarId: 'heroic',
      raidDif: 'HEROIC',
    },
  ],
  [
    {
      title: 'UNSAVED HEROIC',
      start: '2025-02-10 03:30',
      end: '2025-02-10 04:30',
      calendarId: 'unsaved',
      raidDif: 'UNSAVED HEROIC',
    },
    {
      title: 'HEROIC',
      start: '2025-02-10 05:00',
      end: '2025-02-10 06:00',
      calendarId: 'heroic',
      raidDif: 'HEROIC',
    },
    {
      title: 'HEROIC',
      start: '2025-02-10 06:30',
      end: '2025-02-10 07:30',
      calendarId: 'heroic',
      raidDif: 'HEROIC',
    },
    {
      title: 'HEROIC',
      start: '2025-02-10 08:00',
      end: '2025-02-10 09:00',
      calendarId: 'heroic',
      raidDif: 'HEROIC',
    },
  ],
  [
    {
      title: 'Mythic ATP 4/8',
      start: '2025-02-11 03:30',
      end: '2025-02-11 04:30',
      calendarId: 'mythic',
      raidDif: 'Mythic ATP 4/8',
    },
    {
      title: 'Mythic ATP/FP 4/8',
      start: '2025-02-11 04:30',
      end: '2025-02-11 05:30',
      calendarId: 'mythic',
      raidDif: 'Mythic ATP/FP 4/8',
    },
    {
      title: 'HEROIC',
      start: '2025-02-11 06:00',
      end: '2025-02-11 07:00',
      calendarId: 'heroic',
      raidDif: 'HEROIC',
    },
    {
      title: 'HEROIC',
      start: '2025-02-11 07:30',
      end: '2025-02-11 08:30',
      calendarId: 'heroic',
      raidDif: 'HEROIC',
    },
  ],
]
