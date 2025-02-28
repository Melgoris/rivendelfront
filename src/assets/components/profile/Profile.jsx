import React, {useEffect, useState, useRef} from 'react'
import style from './profile.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {motion, AnimatePresence} from 'framer-motion'
import {isAuthSelector} from '../../../redux/slices/auth'
import {toggle, logout} from '../../../redux/slices/auth'
import {IoSettingsSharp} from 'react-icons/io5'
import {DiGitCompare} from 'react-icons/di'
import {BiSolidChevronsLeft} from 'react-icons/bi'
import {CiLogout} from 'react-icons/ci'
import {Link} from 'react-router-dom'
import MainButton from '../button/MainButton'
import defaultAvatar from '/image/photo.png'
import Avatar from './Avatar'
import ProfileCard from '../servise/altCard/miniCard/profileChars/ProfileCard'
import MenuList from '../servise/altCard/miniCard/profileChars/menuList/MenuList'
import InputAddChar from './inputAddChar/InputAddChar'
import {Tabs, Tab, TabList, TabPanel} from './profileTabs/ProfileTabs'
import CalendarApp from '../calendar/Calendar'
import {getCalendarEvent} from '../../../redux/slices/calendar'
import CalendarMenu from '../calendar/calendarMenu/CalendarMenu'
import {currentTime} from '../calendar/calendarMenu/DataHelper'

const Profile = () => {
  const inputRef = useRef(null)
  const [avaToggle, setAvaToggle] = useState(false)
  const [ava, setAva] = React.useState(false)
  const [arrow, setArrow] = React.useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [textStatus, setTextStatus] = React.useState('')
  const {cards} = useSelector(state => state.cards)
  const isAuthSel = useSelector(isAuthSelector)
  const isToggle = useSelector(state => state.auth.isToggle)
  const userCards = useSelector(state => state.auth.data)
  const {status, error} = useSelector(state => state.cards.cards)

  const dispatch = useDispatch()
  const onClickLogout = () => {
    if (window.confirm('Выйти из аккаунта?')) {
      dispatch(logout())
      window.localStorage.removeItem('token')
    }
  }
  const activateInput = () => {
    setIsEditing(prev => !prev)
    setTimeout(() => inputRef?.current?.focus(), 0)
  }
  const handleBlur = () => {
    setIsEditing(false)
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      setIsEditing(false)
    }
  }
  const handleMouseEnter = () => {
    setAva(true)
  }

  const onDragLeave = () => {
    setAva(false)
  }

  return isAuthSel ? (
    <AnimatePresence>
      {isToggle && (
        <>
          <motion.div
            initial={{x: '100%'}}
            animate={{x: '0%'}}
            exit={{x: '100vw'}}
            transition={{type: 'spring', stiffness: 120, damping: 20}}
            className={style.profilecontent}
          >
            <div className={style.profilepic}>
              {avaToggle ? (
                <Avatar setAvaToggle={setAvaToggle} />
              ) : (
                <img
                  src={
                    userCards?.avatar
                      ? `data:${userCards.avatar}`
                      : defaultAvatar
                  }
                  alt=''
                />
              )}
            </div>
            <h1>{userCards?.player}</h1>
            <div
              onClick={() => setArrow(prev => !prev)}
              className={`${style.open_right_block} ${
                arrow ? style.open_helper : ''
              }`}
            >
              <BiSolidChevronsLeft className={`${style.open_right_block_}`} />
            </div>
            <div
              onMouseEnter={handleMouseEnter}
              onMouseLeave={onDragLeave}
              className={style.signature}
            >
              <input
                title={textStatus}
                ref={inputRef}
                value={textStatus}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                onChange={e => setTextStatus(e.target.value)}
                disabled={!isEditing}
                className={!isEditing ? style.disabledInput : ''}
                type='text'
                placeholder='Ваш статус'
              />
              <div className={style.icon}>
                {ava && <DiGitCompare onClick={activateInput} />}
              </div>
            </div>

            <div className={style.button_container}>
              <button id='PhotoCount' onClick={() => dispatch(toggle())}>
                Закрыть профиль
              </button>

              <button
                title='Сменить аву'
                id='Followers'
                onClick={() => setAvaToggle(true)}
              >
                Аватар
              </button>
              <div className={style.settingsWrapper}>
                <CiLogout
                  title='Выйти с акка'
                  onClick={onClickLogout}
                  className={style.settings}
                />
              </div>
            </div>
            <div className={style.zaglushka}></div>
          </motion.div>

          {arrow && (
            <motion.div
              initial={{x: '-100%'}}
              animate={{x: '0%'}}
              exit={{x: '-100vw'}}
              transition={{type: 'spring', stiffness: 120, damping: 20}}
              className={style.container}
            >
              <Tabs>
                <TabList>
                  <Tab index={1}>Персонажи</Tab>
                  <Tab index={0}>Календарь</Tab>
                </TabList>
                <TabPanel index={1}>
                  <div className={style.contentcontainer}>
                    <div className={style.add_title}>
                      {status === 'loading'
                        ? 'Добавление...'
                        : 'Добавить перса'}
                    </div>

                    <InputAddChar />
                    <div className={style.add_title}>Ваши персонажи</div>
                    {error && (
                      <div className={`${style.add_title} ${style.error}`}>
                        {error}
                      </div>
                    )}
                    <div className={style.stories}>
                      {cards.items
                        .filter(
                          usercard => usercard.player._id === userCards._id,
                        )
                        .map((card, i) => {
                          return (
                            <ProfileCard
                              char={card}
                              key={'profile' + card.name + i}
                            />
                          )
                        })}
                    </div>
                  </div>
                </TabPanel>
                <TabPanel index={0}>
                  <div className={style.calendar_container}>
                    <div>
                      <CalendarApp currentTime={currentTime} />
                    </div>
                    <div>{/* <CalendarMenu /> */}</div>
                  </div>
                </TabPanel>
              </Tabs>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  ) : (
    ''
  )
}

export default Profile
