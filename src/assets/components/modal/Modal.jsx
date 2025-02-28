import React, {useState, useEffect, useRef} from 'react'
import ReactModal from 'react-modal'
import {
  useCharContext,
  getCharacters,
  getSetAirData,
} from '../../axiosData/charactersInfo'
import axios from '../../axiosData/mongoDb.js'
import {useSelector} from 'react-redux'
import styleModule from './modal.module.css'
import {rosterNicks} from '../../charsDb/chars'
import closeSvg from './img/remove_icon.svg'
import dropDownSvg from './img/listing_icon.svg'

const ModalWindow = () => {
  const userCards = useSelector(state => state.auth.data)
  const {cards} = useSelector(state => state.cards)

  const {isOpenModal, setIsOpenModal} = useCharContext()
  const [name, setName] = useState({userName: 'puff', userId: ''})
  const {addInfo, setaddInfo} = useCharContext('')
  const [char, setChar] = useState('')
  const [sortOpen, setSortOpen] = useState(false)
  const [activeList, setActiveList] = useState(0)
  const [server, setServer] = useState('Illidan')
  const {filteredData, setFilteredData} = useCharContext()
  const scrollTooName = useRef()

  useEffect(() => {
    if (userCards?.player) {
      setName({userName: userCards.player, userId: userCards._id})
    }
    // console.log('userCards', userCards)
    // console.log('name', name['userName'], name['userId'])
  }, [userCards])

  const openModal = () => {
    setIsOpenModal(true)
    document.body.classList.add('modal-open')
  }

  const closeModal = () => {
    setIsOpenModal(false)
    document.body.classList.remove('modal-open')
  }

  const fetchData = async (userId, name, server, userName) => {
    const checkName = await axios
      .get('/cards', {
        params: {name, userId, server},
      })
      .catch(e => {
        setaddInfo(
          <>
            <h2>Error: </h2>
            Ник не правильный.
          </>,
        )
      })

    if (checkName.data.length > 0) {
      setaddInfo(
        <>
          <h2>Error: </h2>
          Такое имя уже есть в базе
        </>,
      )
    } else {
      setaddInfo('')
      await getCharacters(server, char, 'gear')
        .then(e => setFilteredData(e))
        .catch(e => {
          setaddInfo(
            <>
              <h2>Error: </h2>
              {e}
            </>,
          )
          throw Error(e)
        })
    }
  }

  useEffect(() => {
    if (filteredData) {
      axios.post('/cards/add', filteredData)
      setaddInfo('Персонаж добавлен в базу.')
      setChar('')
      setFilteredData(false)
    }
  }, [filteredData])

  const sortRosterNick = (i, name) => {
    setSortOpen(false)
    setActiveList(i)
    setName(name)
  }
  useEffect(() => {
    if (name['userName'] === '') {
      scrollTooName.current = null
      setActiveList(null)
    }

    if (sortOpen && name['userName'].length > 0) {
      scrollTooName.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      })
    } else return
  }, [sortOpen])
  return (
    <div>
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
              value={name['userName']}
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
            {name['userName'] && (
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
          <button
            type='button'
            onClick={() =>
              fetchData(name['userId'], char, server, name['userName'])
            }
          >
            Поехали
          </button>
          <button type='button' onClick={closeModal}>
            Закрыть
          </button>
        </form>
      </ReactModal>
    </div>
  )
}

export default ModalWindow
