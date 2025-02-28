import React, {useState, useRef, useEffect} from 'react'
import {RiArrowDropDownLine} from 'react-icons/ri'
import style from './checkbox.module.css'
import {TfiSave} from 'react-icons/tfi'
import {useDispatch} from 'react-redux'
import {charRangUpdate} from '../../../../../../../redux/slices/cards'

const CheckboxList = ({
  items,
  placeholder,
  charID,
  fieldName,
  name,
  server,
  parcedStatus,
}) => {
  const dispatch = useDispatch()
  const checkBRef = useRef()
  const [sortOpen, setSortOpen] = useState(false)
  const [isChecked, setIsChecked] = useState(false)
  const [listData, setListData] = useState({status: '', index: null})

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

  const chooseRang = (e, i) => {
    setListData({status: e, index: i})
    setSortOpen(false)
  }
  const updateRang = async () => {
    try {
      if (charID) {
        const fieldValue = listData.status === 'чистый' || false
        await dispatch(
          charRangUpdate({
            id: charID,
            [fieldName]: fieldName === 'saved' ? fieldValue : listData.status,
            // name: name,
            // realm: server,
          }),
        )
      }
    } catch (error) {
      console.log('ошибка: ', error)
    }
  }

  return (
    <>
      <div ref={checkBRef} className={style.item_block}>
        <input
          onClick={() => setSortOpen(prev => !prev)}
          placeholder={parcedStatus || placeholder}
          // type='text'
          value={listData?.status}
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
              {items.map((e, i) => (
                <li key={i} onClick={() => chooseRang(e, i)}>
                  {e}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className={style.save_button}>
        <TfiSave onClick={updateRang} />
      </div>
    </>
  )
}

export default CheckboxList
