import React, {useState} from 'react'
import style from './style.module.css'
import LoadData from '../../servise/altCard/miniCard/profileChars/loading/LoadData'
import {useDispatch, useSelector} from 'react-redux'
import {addCards} from '../../../../redux/slices/cards'

const InputAddChar = () => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [server, setServer] = useState('')
  const userID = useSelector(state => state.auth.data?._id)
  const {addStatus, error} = useSelector(state => state.cards.cards)
  console.log()
  const addCharacter = async () => {
    if (userID && server && name) {
      const result = await dispatch(addCards({server, name, userID}))

      if (addCards.fulfilled.match(result)) {
        console.log('Перс успешно добавлен:', result.payload)
        setServer('')
        setName('')
      } else if (addCards.rejected.match(result)) {
        console.error('Ошибка добавления:', result.payload)
        return
      }
    } else {
      console.error('Заполни поля')
      return
    }
  }

  return (
    <div className={style.form_content}>
      <div className={`${style.form__group} ${style.field}`}>
        <input
          type='text'
          className={style.form__field}
          placeholder='Никнейм'
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <label className={style.form__label}>Никнейм</label>
      </div>
      <div className={`${style.form__group} ${style.field}`}>
        <input
          type='text'
          className={style.form__field}
          placeholder='Сервер'
          value={server}
          onChange={e => setServer(e.target.value)}
        />
        <label className={style.form__label}>Сервер</label>
      </div>
      {addStatus === 'loading' ? (
        <div className={style.load_data}>
          <LoadData />
        </div>
      ) : (
        <button onClick={addCharacter} className={style.button}>
          GO
        </button>
      )}
    </div>
  )
}

export default InputAddChar
