import React, {useEffect, useState} from 'react'
import style from './menuList.module.css'
import {GrUpdate} from 'react-icons/gr'
import LoadData from '../loading/LoadData'
import {useSelector} from 'react-redux'

const MenuList = ({update, loadData, text, isUpdating}) => {
  const [loadSwith, setLoadSwitch] = useState(false)
  const cardStatus = useSelector(state => state.cards.cards.status)

  useEffect(() => {
    if (cardStatus === 'loading' && isUpdating) {
      setLoadSwitch(true)
    } else if (cardStatus === 'loaded') {
      setLoadSwitch(false)
    }
  }, [cardStatus])

  return (
    <>
      <div className={style.button}>
        {loadSwith ? loadData : ''}
        <div className={style.hex}>
          <div className={style.hex_content}>
            <span className={style.icon}>{loadSwith ? '' : update}</span>

            <span className={style.text}>{text || ''}</span>
          </div>
          <div></div>
          <div></div>
        </div>

        <div className={style.hex}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  )
}

export default MenuList
