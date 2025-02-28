import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getCalendarEvent} from '../../../redux/slices/calendar'
import {format} from 'date-fns'
import {useCalendarApp, ScheduleXCalendar} from '@schedule-x/react'
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from '@schedule-x/calendar'
import {createCalendarControlsPlugin} from '@schedule-x/calendar-controls'
import {createCurrentTimePlugin} from '@schedule-x/current-time'
import {createEventsServicePlugin} from '@schedule-x/events-service'
import './calendar.css'
import '@schedule-x/theme-default/dist/index.css'
import {createDragAndDropPlugin} from '@schedule-x/drag-and-drop'
import {createEventModalPlugin} from '@schedule-x/event-modal'
import {
  roundTimeHalper,
  raidHalperData,
  themeData,
} from './calendarMenu/DataHelper'
import {
  deleteCalendarEvent,
  addCalendarEvent,
} from '../../../redux/slices/calendar'
const calendarControls = createCalendarControlsPlugin()

function CalendarApp({currentTime}) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCalendarEvent())
  }, [dispatch])
  const {events, status, backgroundEvents} = useSelector(
    state => state.calendar.calendar,
  )

  const formattedEvents = events.map(e => {
    const isPast = new Date(e.end) < new Date()

    return {
      id: e._id,
      title: e.title,
      description: e.description,
      start: format(new Date(e.start), 'yyyy-MM-dd HH:mm'),
      end: format(new Date(e.end), 'yyyy-MM-dd HH:mm'),
      calendarId: e.calendarId,
      _options: {
        additionalClasses: isPast ? ['past-event'] : [],
      },
    }
  })
  const formattedBackgroundEvents = backgroundEvents.map(e => {
    return {
      id: e._id,
      title: e.title,
      start: format(new Date(e.start), 'yyyy-MM-dd'),
      end: format(new Date(e.end), 'yyyy-MM-dd'),
      calendarId: e.calendarId,
      style: e.style,
      eventType: e.eventType,
    }
  })

  const eventsService = useState(() => createEventsServicePlugin())[0]

  const calendar = useCalendarApp({
    views: [
      createViewDay(),
      createViewWeek(),
      createViewMonthGrid(),
      createViewMonthAgenda(),
    ],
    locale: 'ru-RU',

    calendars: themeData,

    events: formattedEvents,
    backgroundEvents: formattedBackgroundEvents,

    selectedDate: currentTime,

    plugins: [
      eventsService,
      createDragAndDropPlugin(),
      createEventModalPlugin(),
      calendarControls,
      createCurrentTimePlugin(),
    ],
    defaultView: 'week',
    callbacks: {
      onClickDateTime: dateTime => {
        navigator.clipboard.writeText(dateTime).catch(err => {
          console.error('Ошибкакопирования: ', err)
        })
      },
      onDoubleClickEvent(calendarEvent) {
        dispatch(deleteCalendarEvent({id: calendarEvent.id}))
        console.log('onDoubleClickEvent', calendarEvent)
      },
      onDoubleClickDate(date) {
        const existingEvents =
          calendar.eventsService.$app.calendarEvents.backgroundEvents.v || []
        const isExist = existingEvents.find(elem => elem.start === date)

        const newBackEvent = {
          title: 'Выходной',
          description: 'Отдыхаем',
          start: date,
          end: date,
          eventType: 'background',
          raidDif: 'none',
          calendarId: '',
          _options: '',
          style: {
            backgroundImage:
              'repeating-linear-gradient(45deg, #ccc, #ccc 5px, transparent 5px, transparent 10px)',
            opacity: 0.5,
          },
        }

        if (!isExist) {
          calendar.eventsService.setBackgroundEvents([
            ...existingEvents,
            newBackEvent,
          ])
          dispatch(addCalendarEvent([newBackEvent]))
        } else {
          const deletedEvent = existingEvents.filter(elem => elem.start != date)
          calendar.eventsService.setBackgroundEvents(deletedEvent)

          dispatch(
            deleteCalendarEvent({id: isExist.id, eventType: 'background'}),
          )
        }
      },
    },
  })

  useEffect(() => {
    if (formattedEvents) {
      calendar.events.set(formattedEvents)
    }
    if (formattedBackgroundEvents) {
      calendar.eventsService.setBackgroundEvents(formattedBackgroundEvents)
    }
  }, [formattedEvents, formattedBackgroundEvents])

  return (
    <div
    // onContextMenu={e => e.preventDefault()}
    >
      <ScheduleXCalendar calendarApp={calendar} />
    </div>
  )
}

export default CalendarApp
