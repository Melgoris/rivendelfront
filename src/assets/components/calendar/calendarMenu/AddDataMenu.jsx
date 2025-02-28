import React, {useState} from 'react'
import styles from './style.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {IoMdClose} from 'react-icons/io'
import {raidHalperData} from './DataHelper'
import {addCalendarEvent} from '../../../../redux/slices/calendar'
import RaidDifList from './RaidDifList'
import Draggable from 'react-draggable'

const AddDataMenu = ({closeFunc}) => {
  const dispatch = useDispatch()
  const playerID = useSelector(state => state.auth.data._id)
  const raidDifMass = ['Heroic', 'Mythic', 'Normal']
  const [raidDif, setRaidDif] = useState('')
  const [dataTitle, setDataTitle] = useState('')
  const [dataDescript, setDataDescript] = useState('')
  const [dataStart, setDataStart] = useState('')
  const [raidCount, setRaidCount] = useState('')
  const [daysCount, setDaysCount] = useState('')
  const [hoursCount, seHoursCount] = useState('')
  const [minuteCount, setMinuteCount] = useState('')

  const setCalendarEvents = async () => {
    const data = raidHalperData(
      dataStart,
      raidCount,
      daysCount,
      hoursCount,
      minuteCount,
      dataTitle,
      dataDescript,
      raidDif,
    )

    await dispatch(addCalendarEvent(data))
  }

  return (
    <Draggable bounds='body'>
      <div className={styles.formContent}>
        <IoMdClose
          onClick={() => closeFunc(false)}
          className={styles.close_icon}
        />
        <div className={styles.formGroup}>
          <input
            type='text'
            className={styles.formField}
            placeholder='Время старта: '
            value={dataTitle}
            onChange={e => setDataTitle(e.target.value)}
            title='Название события. Ака - "Героик рейд"'
          />
          <label className={styles.formLabel}>Введи назвние события. </label>
        </div>
        <div className={styles.formGroup}>
          <input
            type='text'
            className={styles.formField}
            placeholder='описание '
            value={dataDescript}
            onChange={e => setDataDescript(e.target.value)}
            title='Описание события.'
          />
          <label className={styles.formLabel}>Введи описание собития. </label>
        </div>
        <div className={styles.formGroup}>
          <input
            type='text'
            className={styles.formField}
            placeholder='Время старта: '
            value={dataStart}
            onChange={e => setDataStart(e.target.value)}
            title='Кликай по календарю, где нужное число и время, чтобы скопировать начальные данные и вставить сюда.'
          />
          <label className={styles.formLabel}>
            Старт. Формат - 2025-01-23 23:00{' '}
          </label>
        </div>
        <RaidDifList
          raidDifMass={raidDifMass}
          raidDif={raidDif}
          setRaidDif={setRaidDif}
        />

        <div className={styles.formGroupInline}>
          <label className={styles.formLabel}>Введите количество дней:</label>
          <input
            type='text'
            className={styles.formField}
            placeholder='Дни:'
            value={daysCount}
            onChange={e => setDaysCount(e.target.value)}
            title='Ну типа, количество дней на которые ты хочешь добавить расписание.'
          />
        </div>
        <div className={styles.formGroupInline}>
          <label className={styles.formLabel}>Введите количество рейдов:</label>
          <input
            type='Number'
            className={styles.formField}
            placeholder='Рейды:'
            value={raidCount}
            onChange={e => setRaidCount(e.target.value)}
            title='Введи количество рейдов на один день.'
          />
        </div>
        <div className={styles.formGroupInline}>
          <label className={styles.formLabel}>Время между рейдами:</label>
          <input
            type='Number'
            className={styles.formField}
            placeholder='Время:'
            value={hoursCount}
            onChange={e => seHoursCount(e.target.value)}
            title='Периодичность. Ну, рейды по полтора часа или по два или, в общем сколько часов между рейдами.'
          />
          <input
            type='Number'
            className={styles.formField}
            placeholder='Время:'
            value={minuteCount}
            onChange={e => setMinuteCount(e.target.value)}
            title='Периодичность. Ну, рейды по полтора часа или по два или, в общем сколько часов между рейдами.'
          />
        </div>

        <button onClick={setCalendarEvents} className={styles.button}>
          GO
        </button>
      </div>
    </Draggable>
  )
}

export default AddDataMenu
