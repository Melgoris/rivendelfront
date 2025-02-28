import React, {useState} from 'react'
import style from './style.module.css'
import {TbTransformFilled} from 'react-icons/tb'
import {FaCalendarDay} from 'react-icons/fa'
import {FaCalendarDays} from 'react-icons/fa6'
import {TbTimelineEvent} from 'react-icons/tb'
import {MdDelete} from 'react-icons/md'
import {
  raidHalperData,
  formatDateTime,
  testData,
  autoUpdateData,
  befPostModifParseEvents,
} from './DataHelper'
import AddDataMenu from './AddDataMenu'
import {useDispatch, useSelector} from 'react-redux'
import {addCalendarParceEvents} from '../../../../redux/slices/calendar'

const CalendarMenu = () => {
  const dispatch = useDispatch()
  const menuList = [
    {id: 1, name: 'рейд', ico: TbTimelineEvent},
    {id: 2, name: 'Парсер', ico: FaCalendarDay},
    {id: 3, name: 'На неделю', ico: FaCalendarDays},
    {id: 4, name: 'Удалить', ico: MdDelete},
  ]
  const [showAddEventMenu, setShowAddEventMenu] = useState(false)
  const [idMenuList, setIdMenuList] = useState(null)
  const addEventMenuFunc = (id, element) => {
    if (element.name === 'Удалить') {
      // syncCalendarEvents(autoUpdateData)
      console.log('dadatya')
    } else if (element.name === 'рейд') {
      setShowAddEventMenu(prev => !prev)
      setIdMenuList(id)
    } else if (element.name === 'Парсер') {
      const formatedMassive = testData
        .map(([data, ...dayEvents]) => {
          if (!dayEvents[0].includes('Xpom')) return
          return dayEvents.map(dayEvent => {
            const dataEvent = formatDateTime(data.toString(), dayEvent[2])
            return {raidlvl: dayEvent[0], ...dataEvent}
          })
        })
        .filter(item => item !== undefined)
      const parsedEventsReady = befPostModifParseEvents(formatedMassive)
      dispatch(addCalendarParceEvents(parsedEventsReady))
      console.log('parsedEventsReady', parsedEventsReady)
    }
  }

  return (
    <>
      {showAddEventMenu && <AddDataMenu closeFunc={setShowAddEventMenu} />}
      <nav className={style.navbar}>
        <ul className={`${style.navbar_items} ${style.flexbox_col}`}>
          <li className={`${style.navbar_logo} ${style.flexbox_left}`}>
            <a className={`${style.navbar_item_inner} ${style.flexbox}`}>
              <TbTransformFilled />
            </a>
            <span className={style.link_text}>Добавить:</span>
          </li>

          {menuList.map(element => (
            <li
              onClick={() => {
                addEventMenuFunc(element.id, element)
              }}
              key={element.id}
              className={`${style.navbar_item} ${style.flexbox_left}`}
            >
              <button className={`${style.navbar_item_inner} ${style.flexbox}`}>
                <div
                  className={`${style.navbar_item_inner_icon_wrapper} ${style.flexbox}`}
                >
                  {/* <ion-icon name={style.search_outline}></ion-icon> */}
                  <element.ico className={style.search_outline} />
                </div>
                <span className={style.link_text}>{element.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}

export default CalendarMenu
