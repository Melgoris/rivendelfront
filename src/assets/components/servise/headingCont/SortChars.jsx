import React, {useEffect, useRef, useState} from 'react'
import styleModule from './SortChars.module.css'
import {SlClose} from 'react-icons/sl'
import {useCharContext} from '../../../axiosData/charactersInfo'
import {useDispatch, useSelector} from 'react-redux'
import {filterCards, resetFilter} from '../../../../redux/slices/cards'

const SortChars = ({buffMassive, activeList, setActiveList, name, setName}) => {
  const dispatch = useDispatch()
  const [sortOpen, setSortOpen] = useState(false)
  const scrollTooName = useRef()
  const closeMenu = useRef(null)
  useEffect(() => {
    const handleClickOutside = event => {
      if (closeMenu.current && !closeMenu.current.contains(event.target)) {
        setSortOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  const sortRosterNick = (i, name, classBuff) => {
    dispatch(resetFilter())
    dispatch(filterCards(classBuff))
    setName(name)
    setSortOpen(false)
  }
  const clearInput = () => {
    setName('')
    setActiveList(0)
    setSortOpen(false)
    dispatch(resetFilter())
  }
  return (
    <form>
      <div className={styleModule.user_box}>
        <input
          onClick={() => setSortOpen(prev => !prev)}
          placeholder='Искать баффы'
          type='text'
          value={name}
          onChange={e => setName(e.target.value)}
        />
        {/* СОРТИРОВКА */}
        {!sortOpen && (
          <img
            src={buffMassive[activeList].buff}
            className={styleModule.icon_list}
          />
        )}

        {sortOpen && (
          <div ref={closeMenu} className={styleModule.sort_popup}>
            <ul>
              {buffMassive.map((e, i) => (
                <li
                  key={i}
                  className={activeList === i ? `${styleModule.active}` : ''}
                  ref={activeList === i ? scrollTooName : null}
                  onClick={() => sortRosterNick(i, e.buffName, e.class)}
                >
                  <img src={e.buff} className={styleModule.icon} />
                  {e.buffName}
                </li>
              ))}
            </ul>
          </div>
        )}
        {/* СОРТИРОВКА */}
        {!sortOpen && (
          <SlClose
            className={styleModule.iconClose}
            onClick={() => clearInput()}
          />
        )}
      </div>
    </form>
  )
}

export default SortChars
