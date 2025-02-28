import React, {useState, useRef, useEffect} from 'react'
import {RiArrowDropDownLine} from 'react-icons/ri'
import style from './style.module.css'

const RaidDifList = ({raidDifMass, raidDif, setRaidDif}) => {
  const [sortOpen, setSortOpen] = useState(false)
  const checkBRef = useRef()
  const onClickHandl = (e, i) => {
    setRaidDif(e)
    setSortOpen(false)
  }
  const handleClickOutside = event => {
    if (checkBRef.current && !checkBRef.current.contains(event.target)) {
      setSortOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div ref={checkBRef} className={style.item_block}>
      <input
        onClick={() => setSortOpen(prev => !prev)}
        placeholder={''}
        // type='text'
        value={raidDif}
        readOnly
        // onChange={e => setListData(e.target.value)}
      />
      {!sortOpen && (
        <RiArrowDropDownLine
          className={style.icon_list}
          onClick={() => setSortOpen(prev => !prev)}
        />
      )}

      {sortOpen && (
        <div className={style.sort_popup}>
          <ul>
            {raidDifMass.map((e, i) => (
              <li key={i} onClick={() => onClickHandl(e, i)}>
                {e}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default RaidDifList
