import React from 'react'
import style from './unsavedTabs.module.css'
import {useDispatch} from 'react-redux'
import {deleteColumnFromDb} from '../../../../../redux/slices/columns'

const ModalConfirm = ({modalOpen, text, columnId}) => {
  const dispatch = useDispatch()
  const deleteColumn = async () => {
    await dispatch(deleteColumnFromDb(columnId))
    modalOpen()
  }
  return (
    <div className={style.modal_conf}>
      <div className={style.modal_content}>
        <p>Вы уверены, что хотите {text}</p>
        <button onClick={() => deleteColumn()}>Да</button>
        <button onClick={() => modalOpen()}>Отмена</button>
      </div>
    </div>
  )
}

export default ModalConfirm
