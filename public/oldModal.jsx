import React, {useState, useEffect, useRef} from 'react'
import ReactModal from 'react-modal'
import {
  useCharContext,
  getCharacters,
  getSetAirData,
} from '../../axiosData/charactersInfo'
import styleModule from './modal.module.css'
import {rosterNicks} from '../../charsDb/chars'
import closeSvg from './img/remove_icon.svg'
import dropDownSvg from './img/listing_icon.svg'

const ModalWindow = () => {
  const {isOpenModal, setIsOpenModal} = useCharContext()
  const [name, setName] = useState('puff')
  const {addInfo, setaddInfo} = useCharContext('')
  const [char, setChar] = useState('')
  const [sortOpen, setSortOpen] = useState(false)
  const [activeList, setActiveList] = useState(0)
  const [server, setServer] = useState('Illidan')
  const {filteredData, setFilteredData} = useCharContext()
  const scrollTooName = useRef()

  const openModal = () => {
    setIsOpenModal(true)
    document.body.classList.add('modal-open')
  }

  const closeModal = () => {
    setIsOpenModal(false)
    document.body.classList.remove('modal-open')
  }

  const fetchData = async () => {
    const checkName = await getSetAirData('GET', name).catch(e => {
      setaddInfo(
        <>
          <h2>Error: </h2>
          Ник не правильный.
        </>,
      )
    })
    const dff = checkName.records
      .map(e => {
        return e.fields['name']
      })
      .includes(char)
    if (!dff) {
      const airBase = await getCharacters(server, char).catch(e => {
        setaddInfo(
          <>
            <h2>Error: </h2>
            {e}
          </>,
        )
        throw Error(e)
      })
      const filteredDB = {
        name: airBase['name'],
        race: airBase['race'],
        class: airBase['class'],
        active_spec_name: airBase['active_spec_name'],
        active_spec_role: airBase['active_spec_role'],
        faction: airBase['faction'],
        last_crawled_at: airBase['last_crawled_at'],
        profile_banner: airBase['profile_banner'],
        profile_url: airBase['profile_url'],
        realm: airBase['realm'],
        region: airBase['region'],
        thumbnail_url: airBase['thumbnail_url'],
        // gear: {items: airBase['gear']['items']},
      }
      setFilteredData(filteredDB)
      // setChar('')
      // setServer('')
    } else {
      setaddInfo(
        <>
          <h2>Error: </h2>
          Такое имя уже есть в базе
        </>,
      )
    }
  }
  useEffect(() => {
    if (filteredData) {
      getSetAirData('POST', name, filteredData)
      setaddInfo('Персонаж добавлен в базу.')
      setChar('')
      setServer('')
      setFilteredData(false)
    }
  }, [filteredData])
  console.log('Шо це', name)
  const sortRosterNick = (i, name) => {
    setSortOpen(false)
    setActiveList(i)
    setName(name)
  }
  useEffect(() => {
    if (name === '') {
      scrollTooName.current = null
      setActiveList(null)
    }

    if (sortOpen && name.length > 0) {
      scrollTooName.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      })
    } else return
  }, [sortOpen])
  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <ReactModal
        className={styleModule.login_box}
        overlayClassName={styleModule.Overlay}
        isOpen={isOpenModal}
        onRequestClose={closeModal}
      >
        <h2>Добавить</h2>
        <form>
          <div className={styleModule.user_box}>
            <input
              onClick={() => setSortOpen(prev => !prev)}
              placeholder='Ваш никнейм'
              type='text'
              value={name}
              onChange={e => setName(e.target.value)}
            />
            {/* СОРТИРОВКА */}
            {!sortOpen && (
              <img
                onClick={() => setSortOpen(prev => !prev)}
                src={dropDownSvg}
                className={styleModule.icon_list}
              />
            )}

            {sortOpen && (
              <div className={styleModule.sort_popup}>
                <ul>
                  {rosterNicks.map((e, i) => (
                    <li
                      key={i}
                      className={
                        activeList === i ? `${styleModule.active}` : ''
                      }
                      ref={activeList === i ? scrollTooName : null}
                      onClick={() => sortRosterNick(i, e.player)}
                    >
                      {e.player}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {/* СОРТИРОВКА */}
            {name && (
              <img
                onClick={() => setName('')}
                className={styleModule.icon}
                src={closeSvg}
                alt='Close'
              />
            )}
            <label>Ваш ник</label>
          </div>

          <div className={styleModule.user_box}>
            <input
              placeholder='Добавить нового'
              type='text'
              value={char}
              onChange={e => setChar(e.target.value)}
            />

            {char && (
              <img
                onClick={() => setChar('')}
                className={styleModule.icon}
                src={closeSvg}
                alt='Close'
              />
            )}

            <label>Имя персонажа</label>
          </div>
          <div className={styleModule.user_box}>
            <input
              placeholder='Введите сервер...'
              type='text'
              value={server}
              onChange={e => setServer(e.target.value)}
            />
            {server && (
              <img
                onClick={() => setServer('')}
                className={styleModule.icon}
                src={closeSvg}
                alt='Close'
              />
            )}
            <label>Сервер </label>
          </div>

          <div className={styleModule.info}>{addInfo}</div>
          <button onClick={fetchData}>Поехали</button>
          <button onClick={closeModal}>Закрыть</button>
        </form>
      </ReactModal>
    </div>
  )
}

export default ModalWindow
