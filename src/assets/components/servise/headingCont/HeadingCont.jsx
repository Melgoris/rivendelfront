import React, {useState, useEffect} from 'react'
import headingStyle from './heading.module.css'
import {useCharContext} from '../../../axiosData/charactersInfo'
import RAID_BUFFS from '../../../gearModal/raidBuffs/raidBuffs'
import Raid_buffs from '../charsList/charTabs/Raid_buffs'
import SortChars from './SortChars'
import {useDispatch} from 'react-redux'
import {filterRangs, resetFilter} from '../../../../redux/slices/cards'

const HeadingCont = () => {
  const dispatch = useDispatch()
  const [activeList, setActiveList] = useState(0)
  const [name, setName] = useState('')

  const charsButtons = [
    {title: 'Все', rang: ''},
    {title: 'Мейн', rang: 'Мейн'},
    {title: 'Тв-1', rang: 'Твинк-1'},
    {title: 'Тв-2', rang: 'Твинк-2'},
    {title: 'Тв-3', rang: 'Твинк-3'},
  ]
  const sortAllCharData = async rang => {
    if (rang === '') {
      await dispatch(resetFilter())
      setName('')
      return
    }
    await dispatch(resetFilter())
    await dispatch(filterRangs(rang))
    setName('')
  }

  return (
    <div className={headingStyle.heading_container}>
      <span
        className={`${headingStyle.heading_text1} ${headingStyle.Section_Text}`}
      >
        {charsButtons.map((e, i) => {
          return (
            <button
              onClick={() => sortAllCharData(e.rang)}
              key={e.title}
              className={headingStyle.btn}
            >
              {e.title}
            </button>
          )
        })}

        <SortChars
          buffMassive={RAID_BUFFS}
          icons={Raid_buffs}
          activeList={activeList}
          setActiveList={setActiveList}
          name={name}
          setName={setName}
        />
      </span>
    </div>
  )
}

export default HeadingCont
