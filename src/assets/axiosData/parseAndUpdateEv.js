import {
  formatDateTime,
  befPostModifParseEvents,
} from '../components/calendar/calendarMenu/DataHelper'
import axios from './mongoDb'
import {syncCalendarEvents} from '../../redux/slices/calendar'

//тут запрос на гуглдоки и парсинг штук -->
export const fetchDataFromGoogleT = async dispatch => {
  const settingsResponse = await axios.get('/api/google-sheet-url')
  const url = settingsResponse.data.url
  console.log('url', url)
  if (!url) throw new Error('URL Google Sheets не найден')
  // const url =
  //   'https://script.google.com/macros/s/AKfycbyqhwKxeYozc7-vSh5KHd67VKme_hZflVeHDJBAmMOG-ugHsPexrq2QrLqIg4H8vTvNPg/exec'

  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error(`Ошибка HTTP: ${response.status}`)

    const data = await response.json()
    const date = new Date()
    const monthName = date.toLocaleString('en-US', {month: 'long'})

    const formatTime = value => {
      if (typeof value === 'string' && value.includes('T')) {
        const date = new Date(value)

        return date.toLocaleTimeString('ru-RU', {
          hour: '2-digit',
          minute: '2-digit',
          timeZone: 'Europe/Moscow',
        })
      }
      return value
    }

    const upData = data.map(mass =>
      mass.reduce((result, row) => {
        row.forEach((cell, index) => {
          if (typeof cell === 'string') {
            if (cell === 'Xpom' && index >= 3) {
              result.push([
                row[index - 3],
                row[index - 2],
                row[index - 1],
                cell,
              ])
            }
            if (cell.includes(monthName)) {
              result.push([cell])
            }
          }
        })
        return result
      }, []),
    )

    const newFormatedMass = formatedMassive(upData)
    dispatch(syncCalendarEvents(newFormatedMass))
  } catch (error) {
    console.error('Ошибка загрузки данных:', error)
    return null
  }
}
//тут запрос на гуглдоки и парсинг штук <--
//отправляю на перепроверку на бекенд -->
// export const syncCalendarEvents = async events => {
//   console.log('events', events)
//   try {
//     const response = await axios.post('/api/sync-events', {events})
//     return response.data
//   } catch (error) {
//     console.error('Ошибка синхронизации:', error)
//   }
// }
//отправляю на перепроверку на бекенд<--
//вспомагалка преобразует в нужные данные евенты
const formatedMassive = upData => {
  const massData = upData
    .map(([data, ...dayEvents]) => {
      // if (!dayEvents[0].some(el => el === 'Xpom')) return null
      return dayEvents.map(dayEvent => {
        const dataEvent = formatDateTime(data.toString(), dayEvent[2])
        return {raidlvl: dayEvent[0], ...dataEvent}
      })
    })
    .filter(item =>
      Array.isArray(item)
        ? item.length > 0
        : item !== undefined && item !== null,
    )

  const parsedEventsReady = befPostModifParseEvents(massData)
  // console.log('parsedEventsReady', parsedEventsReady)
  return parsedEventsReady
}

//вспомагалка преобразует в нужные данные евенты
